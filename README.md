Boilerplate smile (babel, scss, webpack)
===========

> Plain webpack 4 boilerplate with Babel and SCSS

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go.

## Setup
Install dependencies<br>
`$ npm install` or `$ yarn`

## Development
Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)<br>
`$ npm run dev` or `$ yarn dev`

## Deployment
Build the current application<br>
`$ npm run build` or `$ yarn build`

## Configure
file <b>package.json</b> have config
```sh
  "config": {
    "src": {
      "base": "./src",
      "styles": "/styles/index.scss",
      "js": "/js/index.js",
      "img": "/img",
      "fonts": "/fonts"
    },
    "build": {
      "base": "dist",
      "styles": "static/bundle.[name].css",
      "js": "static/bundle.[name].js",
      "img": "static/img",
      "fonts": "static/fonts"
    },
    "pages": [
      {
        "/index.ejs": "index.html"
      }
    ],
    "publicPath": ""
  }
```
