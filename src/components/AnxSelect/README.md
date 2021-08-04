The *anx-select* is a input component that renders a custom select input. The component is higly modifiable. The example below shows how to use the component correctly.  

**Note:** The **options** property is required. If this property is not provided, the component cannot be mounted correctly.

```vue
<template>
    <div>
        <anx-select v-model="select1" :options="selectOptions" label="Select label"/>
        <anx-select v-model="select2" :options="selectOptions" label="Responsive select" width="400px" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectOptions: [
                { value: "null", text: "Select something..." },
                { value: "first", text: "First choice" },
                {
                value: "second",
                text:
                    "Second choice - This is a very long text to test the responsiveness of the anx-select element."
                },
                { value: "third", text: "Third choice" },
                { value: "fourth", text: "Fourth choice" }
            ],
            select1: '',
            select2: ''
        }
    }
}
</script>
```

The following example show how to render an *anx-select* with a required validation. If you change the option back to required, an error will be shown.

```vue
<template>
    <div>
        <anx-select v-model="select1" :options="selectOptions" label="Select label" validation/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectOptions: [
                { value: "null", text: "Select something..." },
                { value: "first", text: "First choice" },
                {
                value: "second",
                text:
                    "Second choice - This is a very long text to test the responsiveness of the anx-select element."
                },
                { value: "third", text: "Third choice" },
                { value: "fourth", text: "Fourth choice" }
            ],
            select1: '',
            select2: ''
        }
    }
}
</script>
```