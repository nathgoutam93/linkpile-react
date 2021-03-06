# ð¨âð§How to Contribute

- Take a look at the existing [Issues](https://github.com/nathgoutam93/linkpile-react/issues) or [create a new issue](https://github.com/nathgoutam93/linkpile-react/issues/new/choose)!
- [Fork](https://github.com/nathgoutam93/linkpile-react/fork) the Repo and install the dependencies.
- create a new branch for any issue that you might willing to work on.
- make your valuable changes and finally, commit your work.
- Create a **[Pull Request](https://github.com/nathgoutam93/linkpile-react/compare)** (_PR_), which will be promptly reviewed and given suggestions for improvements if needed.
- Adding screenshots or screen captures to your Pull Request is a +1.

# ð¤·ââï¸HOW TO INSTALL

## Prerequisites

Before installation, please make sure you have already installed the following tools:

- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/download/)
- [java](https://java.com/download/ie_manual.jsp) (firebase emulators require Java)

## Installation

ð Start by making a [fork](https://github.com/nathgoutam93/linkpile-react/fork) of the repository.

ð Clone your new fork of the repository:

```bash
git clone https://github.com/<your-github-username>/linkpile-react
```

ð Navigate to the new project directory:

```bash
cd linkpile-react
```

ð install dependencies

```bash
npm install
```

ð start emulators with

```bash
npm run emulators
```

ð Run

```bash
npm start
```

## ð¤·ââï¸HOW TO MAKE A PULL REQUEST:

Follow the above Installation setup, then

ð Set upstream command:

```bash
git remote add upstream https://github.com/nathgoutam93/linkpile-react.git
```

ð Create a new branch:

```bash
git checkout -b YourBranchName
```

ð Sync your fork or your local repository with the origin repository:

- In your forked repository, click on "Fetch upstream"
- Click "Fetch and merge"

ð Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream

git merge upstream/main
```

ð [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

ð Make your changes to the source code.

ð Stage your changes and commit:

```bash
git add .
git commit -m "<your_commit_message>"
```

ð Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

ð Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

ðð **Congratulations!** You've made your first contribution to [**Linkpile**](https://github.com/nathgoutam93/linkpile-react/graphs/contributors)! ðð¼

## â  Facing problems while running Firebase emulators? â 

- Firstly, Check if you have Java Installed.
- If you have Java installed and still getting error!

### try this:

ð go to the firebase.json and edit the file as follows

```
"emulators": {
    "auth": {
      "port": 9099,
      "host": <your local Ip>
    },
    "firestore": {
      "port": 8188
      "host": <your local Ip>
    },
    "storage": {
      "port": 9199
      "host": <your local Ip>
    },
    "ui": {
      "enabled": true,
      "port": 4000
      "host": <your local Ip>
    }
  }
```

ð after this go to ./src/lib/firebase.js and edit the file as follows

```
if (hostname === "localhost") {
  connectAuthEmulator(auth, "http://<your local Ip>:9099");
  connectFirestoreEmulator(db, "localhost", 8188);
  connectStorageEmulator(storage, "localhost", 9199);
}
```
