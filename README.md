# ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
This command should be used for local develpoment. The preview website will be reachable at http://localhost:3000
```
npm run serve
```

### Build the app and library
This command build both, the library and app version of this project. See **Build App** and **Build Library**
```
npm run build
```

### Build App
This command builds the files for the UI project to run as app. The files are exported to /dist.  
This files can directly be used as a web app and preview website.
```
npm run build:app
```

### Build Library
This command builds the necessary files to include the UI project as a library. The files are exported to /lib.  
This directory should also be pushed to git, to be available for download via npm.
```
npm run build:bundle
```

#### Rendered files (library)
The library can easily be included into existing projects.  
**ui.umd.js** this is the UMD version of our project. These are modules which are capable of working everywhere, be it in the client, on the server or elsewhere.  
**ui.umd.min.js** this is the minified version of the UMD version.  
**ui.common.js** this is a commonJS bundle for consuming via bundlers  
**ui.css** due to the compatibility with NUXT, we are not able to inject the style via javascript. So the style is being rendered to a single css file, that has to be imported/included, when using the UI tool.

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### IE 9+ support for custom properties
Add this to the project public/index.html to make the custom properties work in ie.
You must do it for every project which use this package.
```
  <!-- will only load by IE -->
    <script>window.MSInputMethodContext && document.documentMode && document.write('<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"><\x2fscript>');</script>
```

## Integration

### Vue
Register the UI Plugin in you main.ts  
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import UIPlugin from 'ui'

Vue.use(UIPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

In our UI tool, the styles are not injected via Javascript. So you have to load the style additionally.  
You can do this by adding loading the style in your App.vue  
```
<template>
    <router-view/>
</template>
<style src='ui/lib/ui.css'></style>
```

### Nuxt
See [README.md](nuxt/README.md) file in nuxt folder.

## Usage

For a detailed description of how to use the components, please check out our Kitchensink.
You can also check out Kitchensink.vue itself, to find some example coding implementations.

## Git

Due to the bundle process of our project, we use a special git worklfow.
Please see: [UI Git Workflow](https://ais.anexia-it.com/pages/viewpage.action?pageId=69967415).