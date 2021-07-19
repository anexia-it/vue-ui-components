Our library can also be integrated into an existing *Nuxt* project. You just have to load the library as a *module* into your project. The module will then automatically install the plugin.

```javascript
// nuxt.config.js

module.exports = {
    modules: [
        '@anx/vue-ui-components/nuxt'
    ],
    build: {
        transpile: ['@anx/vue-ui-components']
    }
}
```

**Note:** Don't forget the */nuxt* when importing the module.

**Note:** Since we don't build our library in advance, you also have to tell you compiler to transpile our project.
