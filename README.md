# ReactJS - Setup Localhost with Webpack & Babel

This guide will direct you in setting up a locally hosted ReactJS environment with Webpack and Babel for ES6 to ES2015 Javascript Transpiling.

**TIP**: I recommend using **Visual Studio Code** with it’s integrated Terminal as you follow along below.

## Create the initial project directory

Open a terminal and change your directory to the place where you will set up this project then type the following commands. For this example, we call our project “reactjs-basic”.
```
    > mkdir reactjs-basics
    > cd reactjs-basics
```
## Setup the workspace that ReactJS requires.

We shall to install and configure the following:

-   ReactJS
-   ReactJS-DOM
-   Babel
-   Webpack
-   NodeJS
-   NPM
-   Plus some other Node dependencies specified later on...
    
First, we set up a new project using NPM to manage our dependencies. From inside the reactjs-basics directory, type the following:
```
    > npm init
```
Then fill out the form which appears in the terminal. You can basically accept the defaults and/or apply your personal bio data.
```
    This utility will walk you through creating a package.json file.
    It only covers the most common items and tries to guess sensible defaults.
    
    package name: (reactjs-basics)
    version: (1.0.0)
    description: My React Project
    entry point: (index.js)
    test command:
    git repository:
    keywords: reactjs
    author: Your Name Here
    license: (ISC) MIT
    ...
    Type YES if you accept your settings.
```
**Install production dependencies** that we require in production and development.
```
    > npm install react react-dom --save
```
**Install development dependencies** that we require only for development only.

We needed to have a local web server to build our application as you cannot load the files directly into the browser. Webpack has one called **webpack-dev-server**.

And, we need to have a transpiler to convert ES6 to ES2015 Javascript code, so we used **Babel** with a few Babel presets.
```
    > npm install webpack webpack-dev-server babel-core babel-loader@7 babel-preset-es2015 babel-preset-react babel-preset-stage-2 --save-dev
```
**Note:** We install babel-loader@7 for compatability with WebPack version 4 which is current as of this writting.

You will now see these dependencies added to the **package.json** file as well as a new **node_modules** directory appear in the root of your project.
```
    Terminal Output:
    + webpack-dev-server@3.1.9
    + babel-preset-stage-2@6.24.1
    + babel-preset-es2015@6.24.1
    + webpack@4.20.2
    + babel-preset-react@6.24.1
    + babel-core@6.26.3
    + babel-loader@8.0.4
```
## Create Webpack and ReactJS Directory Structures

Create a directory where our source code will reside. The /src directory is where Webpack will look for ES6 files it must transpile back to ES5 (ES2015) Javascript code.

Create a folder called **app/** that will hold our ReactJS files and an **index.html** file inside the **/src/** directory.

From inside the root of your project, type:
```
    > mkdir src
    > cd src
    > mkdir app
    > touch index.html
```
Open the **index.html** file and add this basic markup.
```
    <!DOCTYPE html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ReactJS Project</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    </body>
    </html>
```

## Configure Webpack
From the root of your project create a Webpack configuration file.
```
    > touch webpack.config.js
   ``` 
Add the following configuration to the **webpack.config.js** file
```
    var webpack = require("webpack");  
    var path = require("path");  
    var DIST_DIR = path.resolve(__dirname, "dist")
    var SRC_DIR = path.resolve(__dirname, "src");  
      
    var config = {  
    	mode: 'development', /* options: "development", "production", "none" */
    	entry: SRC_DIR + "/app/index.js",  
    	output: {  
    		path: DIST_DIR + "/app",  
    		filename: "bundle.js",  
    		publicPath: "/app/"  
    	},  
    	module: {  
    		rules: [  
    			{  
    				test: /\.jsx?$/, /* transpile both .js and .jsx files */  
    				include: SRC_DIR,  
    				use: {  
    					loader: "babel-loader",  
    					query: {  
    						presets: ["react", "es2015", "stage-2"]  
    					}  
    				}  
    			}  
    		]  
    	}  
    };  
    module.exports = config;
```
For an in-depth understanding of Webpack visit the site here: [https://webpack.js.org/](https://webpack.js.org/)

## Setup ReactJS Javascript File

Create your index.js file inside of the **/src/app/** directory, like so:
```
    > touch index.js
```
Add the following line of code to **index.js** so we can test the process.

*We are NOT going to write any React code in this tutorial, we only need to validate that the Webpack and Babel process is working.*

**index.js**
```
    console.log("it works");
```
Add the following to the **index.html** file to load the above script.

**Index.html** - place just above the closing </body> tag.
```
    <script type="text/javascript" src="app/bundle.js"></script>
```
**Important:** The path shown above in the script tag is based on the settings found in the **webpack.config.js** which get applied after the ES6 transpiler process finishes.

## Setup Webpack to Run

Open the package.json file and remove the following line, we don’t need it for this tutorial.
```
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    },
```
and replace it with the following start, build, and build:prod script commands, like so:
```
    "scripts": {
    "start": "npm run build",
    "build": "webpack -d && cp src/index.html dist/index.html && webpack-dev-server --content-base src/ --inline --hot",
    "build:prod": "webpack -p && cp src/index.html dist/index.html"
    },
```
**Note:** The “--hot” attribute for hot-reloading may give you an issue. If so, remove it, but you will need to restart your webpack server everytime you make an update. Yuk!


## Start Webpack Server

From your terminal command line, type the following:
```
    > npm start
```
If all goes well, you should see some similar output in the terminal.
```
    Hash: ae81211fe455a0c368fe
    Version: webpack 4.20.2
    Time: 3035ms
    Built at: 10/08/2018 9:21:36 PM
    Asset Size Chunks Chunk Names
    bundle.js 4.19 KiB main [emitted] main
    Entrypoint main = bundle.js
    [./src/app/index.js] 40 bytes {main} [built]
    ℹ ｢wds｣: Project is running at http://localhost:8081/
    ℹ ｢wds｣: webpack output is served from /app/
    ℹ ｢wds｣: Content not from webpack is served from
    More ...
```
**Load the project into your browser** using the “Project is running at..” value form the terminal output as shown above. 

**Note:** The port number after http://localhost may change with each new npm start session.

## Stop The Webpack Server

From the terminal, type Control+Z (mac), or Control+Shift+Z (windows)

## Updated Repository

While the above tutorial mentioned that we are not going to write any ReactJS code to complete the initial environement setup, the actual files in this repository have been updated with basic ReactJS code to confirm the application is working completely. The updates are as follow:

**/src/index.html**
```
    <!DOCTYPE  html>
    <head>
    	<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible"  content="IE=edge">
    	<title>ReactJS Project</title>
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    	<div id="app"></div>
    	<script type="text/javascript" src="app/bundle.js"></script>
    </body>
    </html>
```
**/src/app/index.js**
```
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    function Welcome(props) {
	    return  <h1>Hello, {props.firstName  +  ' '  +  props.lastName}</h1>
    }
    
    function  Confirmation() {
	    return  <p>It's working if you are seeing this output from ReactJS.</p>
    }
    
    function  App() {
	    return (
		    <div>
		    <Welcome  firstName="Robert"  lastName="Smith"  />
		    <Confirmation  />
	    </div>
	    )
    }
    
    ReactDOM.render(
	    <App  />,
	    document.getElementById('app')
    );
```
