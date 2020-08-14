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
**ui.umd.min.js** this is the minified version. This version is used to be included directly into websites using the <script> tag.  
**ui.common.js** this is a commonJS bundle for consuming via bundlers

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
