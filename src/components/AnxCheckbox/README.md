The example below shows a simple checkbox using the slot to render the label and a checkbox with the **validation** property. The *anx-checkbox* has a built in ValidationProvider. If the **validation** flag is set, a simple "required" validation will be applied on the checkbox.

```html
<anx-checkbox
  name="Simple checkbox"
>
  This is the label
</anx-checkbox>

<anx-checkbox
  name="Required checkbox"
  validation
>
  This checkbox has to be required
</anx-checkbox>
```

When the user changes the state of the checkbox the **@input** event is emitted. The example below shows how to correctly handle a user input. Note that the variable used for the value is passed via the **v-model**. When changen the variable passed via **v-model**, the state of the checkbox will also be changed. This enables two-way-data-binding for the variable.

```vue
<template>
  <anx-checkbox
    name="input checkbox"
    v-model="cb_value"
    @input="handleInput"
  >
    This checkbox will react on user input
  </anx-checkbox>
</template>

<script>
export default {
  data() {
    return {
      cb_value: false
    }
  },
  methods: {
    handleInput(state) {
      this.$anxToast.show("The checkbox has been changed to " + state);
    }
  }
}
</script>
```
