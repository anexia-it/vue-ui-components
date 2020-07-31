# Nuxt integration

The UI Tool can easily be imported as a module into an existing Nuxt project.

Install the UI Tool via NPM

``` 
npm i git+ssh://git@code.anexia.com:am/shared/ui.git
```

Add the module to nuxt.config.js

```
modules: [
  'ui/nuxt'
]
```

Add the transpile option to the build property

```
build: {
  transpile: ['ui']
}
```

## TODO:
Can this module be loaded as a build-only module?
https://nuxtjs.org/guide/modules/#build-only-modules