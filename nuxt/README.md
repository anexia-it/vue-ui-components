# Nuxt integration

The UI Tool can easily be imported as a module into an existing Nuxt project.

Install the UI Tool via NPM

``` 
npm i --save-dev git+ssh://git@code.anexia.com:am/shared/ui.git
```

Add the module to nuxt.config.js  

```
/*
** Nuxt.js modules
*/
modules: [
  'ui/nuxt'
]
```

Add the styles to nuxt.config.js

```
/*
** Global CSS
*/
css: [
  'ui/lib/ui.css'
],
```