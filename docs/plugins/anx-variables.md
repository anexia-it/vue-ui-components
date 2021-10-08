By default, our library matches the **Anexia Corporate Design Guidelines**. If you wish to include our library in your project, that has different design guidelines and does not follow the *Anexia* color scheme, you can easily override the default style settings.  

The *AnxVariablesPlugin* helps you to programmatically change the design of our library during runtime. The example below shows how you can change the primary and secondary color, for example.

```javascript
// Set variables
this.$anxVariables.setVariable('--primary-color', 'red');
this.$anxVariables.setVariable('--secondary-color', '#FE87E2');

// This reset a value to default
this.$anxVariables.resetVariable('--primary-color');
```

You can find a detailed description of the design and how to change it in the [Design Documentation](/vue-ui-components/#/Documentation/Design).  

