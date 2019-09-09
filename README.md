Boilerplate smile (babel, scss, webpack)
===========

> Plain webpack 4 boilerplate with Babel and SCSS

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go.

## Setup
```
yarn install
```

## Development
Compiles and hot-reloads for development<br>
```
yarn run serve
```

## Deployment
Compiles and minifies for production<br>
```
yarn run build
```

## Configure
<b>smile.config.js</b>
```sh
module.exports = {
  "src": {
    "base": "./src",
    "styles": "assets/styles/index.scss",
    "js": "js/index.js",
    "views": "views"
  },
  "build": {
    "base": "./dist",
    "styles": "bundle[hash].css",
    "js": "bundle[hash].js"
  },
  "copy": [
    {
      "from": "favicon.ico",
      "to": "[name].[ext]"
    }
  ],
  "routes": [
    {
      "url": "/",
      "file": "pages/home.njk"
    },
    {
      "url": "about",
      "file": "pages/about.njk"
    }
  ],
  "publicPath": ""
};
```
