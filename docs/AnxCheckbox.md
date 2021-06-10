The example below shows a simple checkbox using the slot to render the label and a checkbox with the required property.

```vue
let cb1 = false;
let cb2 = false;

<anx-checkbox
    name="Simple checkbox"
    v-model="cb1"
>
    This is the label
</anx-checkbox>

<anx-checkbox
    name="Required checkbox"
    v-model="cb2"
    validation
>
    This checkbox has to be required
</anx-checkbox>
```

When the user changes the state of the checkbox the *@input* event is emitted. The example below shows how to correctly handle a user input.

```vue
let value = true;
const handleInput = function(state) {
    alert("The checkbox has been changed to " + state);
}

<anx-checkbox
    name="input checkbox"
    v-model="value"
    @input="handleInput"
>
    This checkbox will react on user input
</anx-checkbox>
```
