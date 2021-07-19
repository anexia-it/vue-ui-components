

```vue
const selectOptions = [
    { value: "null", text: "Select something..." },
    { value: "first", text: "First choice" },
    {
      value: "second",
      text:
        "Second choice - This is a very long text to test the responsiveness of the anx-select element."
    },
    { value: "third", text: "Third choice" },
    { value: "fourth", text: "Fourth choice" }
];

var data = { select1: '', select2: '' }

<anx-select v-model="data.select1" :options="selectOptions" label="Select label"/>
<anx-select v-model="data.select1" :options="selectOptions" label="Responsive select" width="400px" />
```