The *anx-button* works like any other button. The example below shows a standard button.

```html
<anx-button>Click me!</anx-button>
```

By default, the *anx-button* emits the **@click** event. This can be changed by setting the *event-name* property, although using the standard **@click** event would be enough in most cases. The example below shows how to handle a click on the button correctly.

```vue
<template>
  <anx-button text="Show alert!" @click="buttonClicked" />
</template>

<script>
export default {
  methods: {
    buttonClicked() {
      // Here you can handle the click
      this.$anxToast.show("Button clicked");
    }
  }
}
</script>
```

The *anx-button* also offers some properties for its layout. The exmple below shows how to use buttons inline and how to genrate a *outline* button. **Note:** You should always use the *default* button for positive actions like save and the *outline* button for actions like cancel or delete.

```html
<div class="button-multiline">
  <anx-button
    inline
    width="200px"
    text="Save"
    style="margin-right: 20px"
  />
  <br>
  <anx-button
    inline
    outline
    width="200px"
    text="Cancel"
    style="margin-right: 0px"
  />
</div>
```

The following button is an example for a multiline button. The button automatically changes to multiline, if the text is too long.

```html
<anx-button width="200px">
  This is a simple multiline button with no function
</anx-button>
```

Buttons can also have different colors. The default color is **anx-primary-green** defined in *_variables.scss*. You can simply change the color by using the **color** property. **Note**: The *outline* property will still be available.

```html
<anx-button style="margin-right: 20px" color="#003CA6">
  Blue
</anx-button>
<anx-button color="#003CA6" outline>Blue outline</anx-button>
<br /><br />
<anx-button style="margin-right: 20px" color="#d50000">
  Red
</anx-button>
<anx-button color="#d50000" outline>Red outline</anx-button>
```


