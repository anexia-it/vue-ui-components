### Nothing is rendered when using Internet Explorer

Our UI tool uses ES6 technologies. Modern browsers like Chrome, Firefox, ... are able to execute ES6 technologies. But IE is not able to execute it.
Basically, IE doesn't understand the code you are writing in your project (TypeScript, ES6+, ...). So in your project you would therefore use something like Babel to transpile your code to ES5 (so that IE can execute it). We assume that this is already enabled in your project.
But when including our UI tool, the code inside the UI tool won't be transpiled, because the node_modules folder is excluded from transpiling. Unfortunately, our AnxIcon logic uses ES6 that is not transpiled to ES5. This can cause a syntax error like this in IE:

```bash
SCRIPT1002: Syntaxfehler
d30e718.js (2,442345)
```

In this case, it can happen that your whole application won't work in IE, because some files of our UI tool are not transpiled to ES5. To avoid this, you have to tell your transpiler to transpile our project in the node_modules folder. Below are some explainations for some frequent frameworks.

**Example for Vue projects:**
```javascript
// vue.config.js

module.exports = {
  transpileDependencies: [
    '@anx/vue-ui-components'
  ]
}
```

You might also have to include the [ie11-custom-properties](https://www.npmjs.com/package/ie11-custom-properties) package to your project.

**Example for Vue projects:**
Simply add the following line of code to the ```<head>``` of your ```index.html``` file

```javascript
<script>window.MSInputMethodContext && document.documentMode && document.write('<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"><\x2fscript>');</script>
```

### Wrong API endpoint when using AbstractRestController in production

Our AbstractRestController fetches data via the API using the name of the model. E.g. if your model is called 'User', then the AbstractRestController will send a GET request to /api/user/ to fetch the users. In development this should usually work fine. But when you build the project for production, all of the code is minified. The minification causes classed to be renamed by default. This means that the 'User' class will be renamed to 'n' to save some additional characters. Due to this the AbstractRestController will then try to fetch data from '/api/n', but this endpoint does not exist. To prevent that from happening, you have to tell your minification plugin (in most cases terser) that it must not rename classes.  

**Example for Vue projects:**
```javascript
// vue.config.js

module.exports = {
  chainWebpack: config => {
    config.optimization
      .minimizer('terser')
      .tap(args => {
        const { terserOptions } = args[0]
        terserOptions.keep_classnames = true
        terserOptions.keep_fnames = true
        return args
      })
    }
}
```

**Example for Nuxt projects:**

```javascript
// nuxt.config.js

export default {
  build: {
    terser: {
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true
      }
    },
  }
}
```

### The components don't render correctly after integrating a new version of the *vue-ui-components* library

If you have just installed a new version of the library and your project compiles without any errors but nevertheless your components don't render correctly a solution might be to delete the ```node_modules/``` folder and execute a ```npm install``` after deletion. If you still get some errors, delete your ```node_modules/``` folder and your ```package-lock.json``` file and execute ```npm install``` again.