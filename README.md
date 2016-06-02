# Glob Entry Webpack Pluguin

> A webpack plugin that adds entry chunks based on matched glob patterns.

## Installation

Simply use _npm_. Enter the following command under your project folder:

```
npm install glob-entry-webpack-plugin
```

## Usage

In your webpack configuration file (_webpack.config.js_):

```javascript

module.exports = {
  ...

	// setup plugins
	plugins: [
    ...    
	  new GlobEntryPlugin('modules'),
    ...
	],
  ...
}
```

## License

Copyright (c) 2016 Nelson Ricardo

MIT (http://opensource.org/licenses/mit-license.php)
