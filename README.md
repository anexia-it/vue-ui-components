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

### Compiles and minifies for production
This command can be used to create a production preview website of the ui project. The preview website will be exported to /dist
```
npm run build
```

### Rollup
When integrating the UI project via npm, the /lib files are used. This command is used to build these files.
This command should be run every time, changes are made.
```
npm run rollup
```

## Rendered files
The UI project will be rendered to /lib.
The **anx-ui.ssr-js** will be used by modern applications like NUXT. This is the main entry of the npm package.
The **anx-ui.min.js** can be used directly in the browser and can be imported with the <script> tag


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
