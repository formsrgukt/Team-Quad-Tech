# Team Quad Tech - Git Collaboration Workflow

Welcome to the team! To ensure we don't accidentally overwrite each other's code while building this website, everyone must follow these step-by-step instructions.

---

## 1. First-Time Setup (Do this once)

Before you can start coding, you need to download the project to your laptop.

**Step 1:** Open your terminal or command prompt.
**Step 2:** Download the code from GitHub:
```bash
git clone https://github.com/formsrgukt/Team-Quad-Tech.git
```
**Step 3:** Navigate into the project folder:
```bash
cd Team-Quad-Tech
```
**Step 4:** Install all the required packages:
```bash
npm install
```
**Step 5:** Start the website locally to make sure it works:
```bash
npm run dev
```

---

## 2. Daily Coding Workflow (Do this every time you write code)

NEVER write code directly on the `main` branch. Always create a new branch for your feature.

**Step 1: Get the latest code from the team**
Always start by making sure your laptop has the most recent code.
```bash
git checkout main
git pull origin main
```

**Step 2: Create a new branch for your task**
Name it something related to what you are doing.
```bash
git checkout -b add-my-new-feature
```

**Step 3: Write your code!**
Open the project in VS Code, make your changes, save your files, and test them in your browser.

**Step 4: Save & Push your changes (The Easy 1-Step Way 🚀)**
We created an automated command that stages, commits, and pushes your changes all in one step:
```bash
npm run push
```
*(Or pass your commit message directly: `npm run push "Added hero section"` or `./push.sh "Added hero section"`)*

---

### Alternative: Manual Git Commands (If you prefer manual steps)
```bash
# 1. Add all changed files
git add .

# 2. Commit with explanation
git commit -m "Added a new button to the hero section"

# 3. Push to GitHub
git push -u origin add-my-new-feature
```

---

## 3. Merging Your Code (Pull Requests)

Now that your code is on GitHub, it needs to be merged into the `main` website.

**Step 1:** Go to https://github.com/formsrgukt/Team-Quad-Tech
**Step 2:** You will see a green button that says **"Compare & pull request"**. Click it!
**Step 3:** Leave a quick comment explaining what you built.
**Step 4:** Click **"Create pull request"**.
**Step 5:** Have another team member review your code. If it looks good, click **"Merge pull request"**.

Congratulations! Your code is now part of the main website. The rest of the team can now run `git pull origin main` to get your updates!
