# Getting Started with App

----

## About

This is a sample TypeScript react app that uses [AWS Cognito](https://aws.amazon.com/cognito/) for authentication with Context API & [AWS Amplify](https://aws.amazon.com/amplify/). It also incorporates some best practices. Some highlighting information about the project are followings:

1. [ESLint](https://eslint.org/) to statically analyze code and quickly find problems.
2. [Prettier](https://prettier.io/) to format code
3. [Husky](https://typicode.github.io/husky/) for creating Git hooks to enforce code ESLint & Prettier rules to be followed during git commit 

----

## Environment Setup

Before you start, make sure you have the following software installed on your computer:

#### [Homebrew:](https://brew.sh/)
Homebrew makes different sdk and dependency installation and managing their version very easy. Homebrew installs packages to their own directory and then symlinks their files into /opt/homebrew. Homebrew won’t install files outside its prefix.

To Install Follow the instruction steps explained here [Install HomeBrew](https://brew.sh/)


#### [Node.js v16:](https://nodejs.org/en/)
Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime
To Install run the following steps:
```
brew install node@16
```

#### [Yarn:](https://yarnpkg.com/)
Yarn, or Yet Another Resource Navigator, is a relatively new package manager developed by Facebook. It was developed to provide more advanced capabilities that NPM lacked at the time (such as version locking) while also making it safer, more reliable, and more efficient.
To Install run the following steps:
```
brew install yarn
```

#### [Git:](https://git-scm.com/)
Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
To Install run the following steps:
```
brew install git
```

----

## IDE/Editor Setup

### VSCode

For better development experience with [VSCode](https://code.visualstudio.com/) Please make sure that you have the following extensions installed
1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

The `settings.json` file inside `.vscode` contains important and necessary settings for vscode which enforces automatic code indentation and formatting on save

### JetBrains

For better development experience With JetBrains IDE go to `settings > Languages & Frameworks > JavaScripts > Code Quality Tools > Eslint` And make Sure  
   
 1. `Automatic ESLint configuration` is selected
 2. `Run eslint --fix on save` is checked

This will make sure code reformat and `eslint -fix` runs automatically on each save. NOTE: any change in `.eslintrc.json` or `.prettierrc` might require restarting the IDE  

----

## Code of Conduct

### Overview of Voter App
TBD

### Directory structure
TBD

### File naming/structure
TBD

### Git Branch
TBD (From Repo Management Guidelines)

### Restrictions

Do not modify the content of the following files & folder. This may result in unwanted errors and side effects. If you really feel the necessity of any modification contact maintainers of the repo 

```
.husky
.vscode
.eslintignore
.eslintrc.json
.prettierignore
.prettierrc
tsconfig.json
```


----

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

