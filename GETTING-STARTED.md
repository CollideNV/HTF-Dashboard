<h1 align="center">New React App</h1>

<br />

This is a blank README file that you can customize at your needs.\
Describe your project, how it works and how to contribute to it.

<br />

# 🚀 Available Scripts

In the project directory, you can run:

<br />

## ⚡️ start

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br />

## 🧪 test

```
yarn test
```

Launches the test runner in the interactive watch mode.

<br />

## 🦾 build

```
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

<br />

## 🧶 lint

```
yarn lint
```

Creates a `.eslintcache` file in which ESLint cache is stored. Running this command can dramatically improve ESLint's running time by ensuring that only changed files are linted.

<br />

## 🎯 format

```
yarn format
```

Checks if your files are formatted. This command will output a human-friendly message and a list of unformatted files, if any.

<br />

## ⚙️ generate

```
yarn generate:component <ComponentName>
```

or

```
yarn generate:page <PageName>
```

Generates a new component in `src/components` or a new Page in `src/pages` using the `generate-react-cli` library.

For more information about generate-react-cli, check out their [readme](https://www.npmjs.com/package/generate-react-cli).

<br />

# 🧬 Project structure

This is the structure of the files in the project:

```sh
    │
    ├── public                  # public files (favicon, .htaccess, manifest, ...)
    ├── src                     # source files
    │   ├── components
    │   ├── pages
    │   ├── resources           # images, constants and other static resources
    │   ├── store               # Redux store
    │   │   ├── actions         # store's actions
    │   │   └── reducers        # store's reducers
    │   ├── styles
    │   ├── types               # data interfaces
    │   ├── utility             # utilities functions and custom components
    │   ├── App.tsx
    │   ├── index.tsx
    │   ├── react-app-env.d.ts
    │   ├── RootComponent.tsx   # React component with all the routes
    │   ├── serviceWorker.ts
    │   └── setupTests.ts
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── package.json
    ├── README.md
    └── tsconfig.json
```

# 📖 Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#

<p align="center">Bootstrapped with Create React App.</p>
