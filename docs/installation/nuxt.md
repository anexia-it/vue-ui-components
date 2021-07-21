Our library can also be integrated into an existing *Nuxt* project. You just have to load the library as a *module* into your project. The module will then automatically install the *UI plugin* that contains all components and plugins.

```javascript
// nuxt.config.js

module.exports = {
    modules: [
        '@anx/vue-ui-components/nuxt'
    ],
    css: [
        '@anx/vue-ui-components/lib/anx.css'
    ]
}
```

**Note:** Don't forget the */nuxt* when importing the module.

**Note:** Since we explicitly don't want the style to be rendered via Javascript, the CSS file is external. You have to load the style once in your nuxt config file.
