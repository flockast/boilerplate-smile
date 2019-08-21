Boilerplate smile (babel, scss, webpack)
===========

> Plain webpack 4 boilerplate with Babel and SCSS

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go.

## Setup
Install dependencies<br>
`$ npm install` or `$ yarn`

## Development
Run the local webpack-dev-server with livereload and autocompile on localhost<br>
`$ npm run dev` or `$ yarn dev`

## Deployment
Build the current application<br>
`$ npm run build` or `$ yarn build`

## Configure
In <b>package.json</b>
```sh
  "smile": {
    "src": {
      "base": "./src",
      "styles": "styles/index.scss",
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
        "file": "pages/index.njk"
      },
      {
        "url": "about",
        "file": "pages/about.njk"
      }
    ],
    "publicPath": ""
  }
```
