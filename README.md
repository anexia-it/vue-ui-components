<p align="center">
  <img src="./src/assets/icons/anexia.svg" width="150px">
</p>

# ANX UI-Tool
-----------

**Author:** :blue_heart: Anexia Marketing :green_heart:

- [Installation](#installation) :page_facing_up:
  - [Vue](#vue)
  - [Nuxt](#nuxt)
- [Usage](#usage) :white_check_mark:
- [Troubleshooting](#common-errors-and-troubleshooting) :interrobang:

-----------

## Installation

There are different ways to install the UI tool in your project. The way of installation depends on the project you want to include the UI tool in.

### Vue

First of, you have to install the UI tool via npm.

```
npm install git+ssh://git@code.anexia.com:am/shared/ui.git#master
```

Next, you have to load the UI plugin in your apps entry point. This is most likely your **main.ts** file.

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import UIPlugin from "ui/src";

Vue.config.productionTip = false;

Vue.use(UIPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

**Note:**
> When using Vue, you have to import 'ui/src'. When importing 'ui' you would import the bundled version of the ui tool. This can lead to failures and disadvantages when building your project (no tree-shaking)

This automatically globally register all anx components in your application. You don't have to register any components manually.

If you don't want to import all the components, you can also register the required components manually.  
Therefore, you can import the required components from the components folder in the UI tool. For example, you only want to use the _AnxAlert_ and _AnxButton_ component.

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Components } from "ui/src";

Vue.config.productionTip = false;

// Register the required componenets manually
Vue.component("AnxAlert", Components.AnxAlert);
Vue.component("AnxButton", Components.AnxButton);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

**Note:**
> If you want to use icons, you additionally have to import the AnxIconsPlugin. (When using ```Vue.use(UIPlugin)``` the icons plugin is automatically installed)

```javascript
import { AnxIconsPlugin } from "ui/src";

Vue.use(AnxIconsPlugin);
```

### Nuxt

See [README.md](nuxt/README.md) file in nuxt folder.

### Using bundled versions

If you want to import the bundled version of the ui tool, you can use
```javascript
import UIPlugin from 'ui';
```

**Note:**
> If you import the bundled version, the style is not injected via javascript and has to be imported additionally

```html
<style src='ui/lib/ui.css'></style>
```

### Web

If you want to use our ui tool in web, just import the minified bundled javascript and the style.

```html
<link rel="stylesheet" type="text/css" href="/css/anx-ui.css">
<script src="/js/anx-ui.min.js"></script>
```

## Usage

For a detailed description of how to use the components, please check out our Kitchensink.
You can also check out Kitchensink.vue itself, to find some example coding implementations.

## Local setup and commands

In order to view the kitchensink you have to set up the ui tool locally. The setup process is very easy. You just set it up like any other vue based project.

```
npm install
npm run serve
```

### Build the app and bundle

This command builds both, the library and app version of this project. See **Build App** and **Build Library**

```
npm run build
```

### Build app
This command builds the files for the UI project to run as app. The files are exported to /dist.  
This files can directly be used as a web app and preview website.

```
npm run build:app
```

### Build bundle
This command builds the necessary files to include the UI project as a library. The files are exported to /lib.  
This directory should also be pushed to git, to be available for download via npm.

```
npm run build:bundle
```

#### Rendered files (bundle)

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

## Common errors and troubleshooting

### IE 9+ support for custom properties
Add this to the project public/index.html to make the custom properties work in ie.
You must do it for every project which use this package.
```html
  <!-- will only load by IE -->
    <script>window.MSInputMethodContext && document.documentMode && document.write('<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"><\x2fscript>');</script>
```

### Experimental decorators

If you have just created a fresh Vue project and installed the UI tool via npm, you could possibly get the following error:

```bash
ERROR in ./node_modules/ui/src/components/AnxTitle.vue(24,26):
24:26 Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.
    22 |
    23 |   /** The text, to be displayed (can also be set via slot) */
  > 24 |   @Prop({ default: "" }) text!: string;
       |                          ^
    25 | }
    26 | </script>
    27 |
Version: typescript 3.9.7
```

Our UI tool uses a npm package called [vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator). This package allows us to strcuture our components in a easier to read way.
To fix this error you simply have to follow the instructions in the error message. Add the ```experimentalDecorators``` property to your ```compilerOptions```in your tsconfig.json like in the example below.

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    ...
  },
  ...
}
```

## Git

Due to the bundle process of our project, we use a special git worklfow.
Please see: [UI Git Workflow](https://ais.anexia-it.com/pages/viewpage.action?pageId=69967415).