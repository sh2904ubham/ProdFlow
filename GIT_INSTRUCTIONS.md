# Git & GitHub Setup

# Initialize repo and push to remote

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_REMOTE_URL>
git branch -M main
git push -u origin main
```

# Create a dev branch and push

```bash
git checkout -b dev
git push --set-upstream origin dev
```

Branching workflow
- main: production
- dev: integration
- feature/*: feature branches
- hotfix/*: urgent fixes

Create a PR from feature branch to dev, include CI green before merging.```