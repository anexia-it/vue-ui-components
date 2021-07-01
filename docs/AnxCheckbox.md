The example below shows a simple checkbox using the slot to render the label and a checkbox with the **validation** property. The *anx-checkbox* has a built in ValidationProvider. If the **validation** flag is set, a simple "required" validation will be applied on the checkbox.

```vue
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
