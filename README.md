# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `Before deploy`

install gh-pages

### `npm i -D gh-pages`

## `Update package.json file`

add before "name":

    "homepage": "http://http://markpumpkin.github.io/react-todo-list"

add after "scripts - start":

    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",

## Commit to github

    git add .
    git commit -m "Deploy to github" && git push

## Deploy

    npm run build
    npm run deploy

## Visit application

    - go to "Settings" of project
    - click "Page" menu
    - "Visit site"
