import { execSync, spawnSync } from 'child_process';
import readline from 'readline';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function run(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe', ...options }).trim();
  } catch (err) {
    if (options.throwOnError) throw err;
    return null;
  }
}

function runInherit(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  return result.status === 0;
}

let autoYes = false;

function ask(questionText, defaultAnswer = '') {
  if (autoYes || !process.stdin.isTTY) {
    return Promise.resolve(defaultAnswer);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    let resolved = false;
    rl.question(questionText, (answer) => {
      if (!resolved) {
        resolved = true;
        rl.close();
        resolve(answer.trim() || defaultAnswer);
      }
    });
    rl.on('close', () => {
      if (!resolved) {
        resolved = true;
        resolve(defaultAnswer);
      }
    });
  });
}

async function main() {
  console.log(`\n${colors.cyan}${colors.bright}🚀 Team Quad Tech - Automated Git Push${colors.reset}\n`);

  // Parse command line arguments
  const rawArgs = process.argv.slice(2);
  const remainingArgs = [];

  for (const arg of rawArgs) {
    if (arg === '-y' || arg === '--yes') {
      autoYes = true;
    } else {
      remainingArgs.push(arg);
    }
  }

  // 1. Verify git is installed
  const gitVersion = run('git --version');
  if (!gitVersion) {
    console.error(`${colors.red}❌ Git is not installed or not found in PATH.${colors.reset}`);
    process.exit(1);
  }

  // 2. Verify git identity (user.name and user.email)
  let userName = run('git config user.name');
  let userEmail = run('git config user.email');

  if (!userName || !userEmail) {
    console.log(`${colors.yellow}⚠️  Git user identity is not configured on this machine.${colors.reset}`);
    const defaultName = process.env.USER || 'Team Member';
    const defaultEmail = `${process.env.USER || 'teammate'}@users.noreply.github.com`;

    if (!userName) {
      userName = await ask(`${colors.bright}Enter your Name for Git commits [${defaultName}]: ${colors.reset}`, defaultName);
      run(`git config --global user.name "${userName}"`);
    }
    if (!userEmail) {
      userEmail = await ask(`${colors.bright}Enter your Email for Git commits [${defaultEmail}]: ${colors.reset}`, defaultEmail);
      run(`git config --global user.email "${userEmail}"`);
    }
    console.log(`${colors.green}✓ Git identity set to: ${userName} <${userEmail}>${colors.reset}\n`);
  }

  // Enable credential storage helper so login is only asked once
  const credHelper = run('git config --global credential.helper');
  if (!credHelper) {
    run('git config --global credential.helper store');
  }

  // 3. Get current branch
  let currentBranch = run('git branch --show-current') || run('git rev-parse --abbrev-ref HEAD');
  if (!currentBranch || currentBranch === 'HEAD') {
    currentBranch = 'main';
  }
  console.log(`📌 Current branch: ${colors.magenta}${colors.bright}${currentBranch}${colors.reset}`);

  // 4. Branch check if on main
  if (currentBranch === 'main' && !autoYes) {
    console.log(`${colors.yellow}Notice: TEAM_WORKFLOW recommends working in a feature branch.${colors.reset}`);
    const branchChoice = await ask(
      `Do you want to create a new feature branch? (y/N) [default: stay on main]: `,
      'n'
    );
    if (branchChoice.toLowerCase() === 'y' || branchChoice.toLowerCase() === 'yes') {
      const newBranchName = await ask(`Enter new branch name (e.g. feat-navbar): `, '');
      if (newBranchName) {
        const sanitized = newBranchName.replace(/\s+/g, '-');
        const branchCreated = runInherit('git', ['checkout', '-b', sanitized]);
        if (branchCreated) {
          currentBranch = sanitized;
          console.log(`${colors.green}✓ Switched to branch: ${currentBranch}${colors.reset}`);
        }
      }
    }
  }

  // 5. Check git status
  const statusOutput = run('git status --porcelain');
  if (!statusOutput) {
    console.log(`\n${colors.green}✨ Working directory clean. No local uncommitted changes.${colors.reset}`);
    const ahead = run('git rev-list --count origin/' + currentBranch + '..' + currentBranch);
    if (ahead && parseInt(ahead, 10) > 0) {
      console.log(`${colors.cyan}Branch is ahead by ${ahead} commit(s). Ready to push.${colors.reset}`);
    } else {
      const shouldPushAnyway = await ask(`Push current branch to GitHub anyway? (y/N): `, 'n');
      if (shouldPushAnyway.toLowerCase() !== 'y' && !autoYes) {
        process.exit(0);
      }
    }
  } else {
    console.log(`\n${colors.cyan}📂 Changed files detected:${colors.reset}`);
    console.log(statusOutput);

    // 6. Stage changes
    console.log(`\n${colors.blue}Staging files (git add -A)...${colors.reset}`);
    runInherit('git', ['add', '-A']);

    // 7. Get commit message
    let commitMessage = remainingArgs.join(' ').trim();

    if (!commitMessage) {
      commitMessage = await ask(`\n${colors.bright}Enter commit message (or press enter for default): ${colors.reset}`, '');
    }

    if (!commitMessage) {
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
      commitMessage = `Update project files (${timestamp})`;
    }

    // 8. Commit changes
    console.log(`${colors.blue}Committing with message: "${commitMessage}"...${colors.reset}`);
    const commitSuccess = runInherit('git', ['commit', '-m', commitMessage]);
    if (!commitSuccess) {
      console.error(`${colors.red}❌ Git commit failed.${colors.reset}`);
      process.exit(1);
    }
    console.log(`${colors.green}✓ Changes committed successfully!${colors.reset}`);
  }

  // 9. Push to GitHub
  console.log(`\n${colors.blue}Pushing to GitHub (git push -u origin ${currentBranch})...${colors.reset}`);
  const pushSuccess = runInherit('git', ['push', '-u', 'origin', currentBranch]);

  if (pushSuccess) {
    console.log(`\n${colors.green}${colors.bright}🎉 SUCCESS! Your changes have been pushed to GitHub!${colors.reset}`);
    if (currentBranch !== 'main') {
      console.log(`\n🔗 Create Pull Request here:`);
      console.log(`${colors.cyan}https://github.com/formsrgukt/Team-Quad-Tech/compare/${currentBranch}?expand=1${colors.reset}\n`);
    } else {
      console.log(`\n🔗 View repository:`);
      console.log(`${colors.cyan}https://github.com/formsrgukt/Team-Quad-Tech${colors.reset}\n`);
    }
  } else {
    console.log(`\n${colors.yellow}⚠️ Push encountered an issue.${colors.reset}`);
    console.log(`\n💡 GitHub Authentication Tips:`);
    console.log(`1. GitHub requires a Personal Access Token (PAT) instead of your account password.`);
    console.log(`2. Generate a token at: https://github.com/settings/tokens (select 'repo' scope).`);
    console.log(`3. When prompted, enter your GitHub username and paste your token as the password.`);
    console.log(`4. Because credential.helper is active, Git will remember your credentials next time!\n`);
  }
}

main().catch((err) => {
  console.error(`${colors.red}Error:${colors.reset}`, err);
  process.exit(1);
});
