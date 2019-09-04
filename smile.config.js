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
