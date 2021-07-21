# Icons

The structure and the way, how icons are loaded, is inspired by bootstrap-vue.
https://github.com/bootstrap-vue/bootstrap-vue/tree/dev/src/icons

## Technical documentation

All SVG Icons in /src/assets/icons are automatically exported as inline SVGs in icons.js
Each of this icons is exported as an own Vue component. This means that they can be used like any other vue component.

If you want to load icons dynamically (using the anx-icon component with icon="iconName" as property) you have to use the icon plugin and register it in your main.ts file.
