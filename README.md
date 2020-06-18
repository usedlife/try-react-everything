This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## 更改webpack.config

使用 react-app-rewired ，此工具可以在不 'eject' 也不创建额外 react-scripts 的情况下修改 create-react-app 内置的 webpack 配置，然后你将拥有 create-react-app 的一切特性，且可以根据你的需要去配置 webpack 的 plugins, loaders 等。

编辑根目录中 config-overrides.js 文件

## node-sass

> An unexpected error occurred: "https://registry.yarnpkg.com/node-sass: ETIMEDOUT".

由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。

解决方案就是使用其他源。

```bash
$ npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```
**or**
```bash
$ yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

$ yarn add node-sass
```


最后，如果有需要，可以将全局替换为淘宝源

```bash
$ yarn config set registry https://registry.npm.taobao.org -g
```
**or**
```bash
$ npm config set registry https://registry.npm.taobao.org
```