The following input is the simplest form of the *anx-input*. It does not have any validation or features. The v-model is used for two-way-databinding.

```html
<template>
    <anx-input v-model="value" name="input" label="Input" />
</template>

<script>
export default {
    data() {
        return {
            value: ""
        }
    }
}
</script>
```

There are several properties to change the layout of the *anx-input*. The following examples show input fields with modified layouts. Furthermore, the *anx-input* also offers a **read-only** feature shown in the example below.

```html
<template>
    <div>
        <anx-input 
            v-model="value"
            id="my-password"
            name="password"
            label="Password"
            assistive-text="Don't enter your real password!"
            type="password"
        />

        <anx-input
            v-model="value"
            name="read-only"
            label="Read only input"
            assistive-text="This is the text from the input field from above as read only"
            readonly
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ""
        }
    }
}
</script>
```

You can use the slot of the *anx-input* to display some content on the right side of the element.

```html
<anx-container>
    <anx-input
        name="mail"
        label="Mail"
        rules="email"
        width="310px"
        inline
    >
        <anx-button
            btn-type="button"
            width="150px"
            style="margin-left: 20px; margin-right: 0px"
        >
            Inline
        </anx-button>
    </anx-input>
</anx-container>
```

The *anx-input* also offers validation. You just have to pass the validation rules via the **rules** property. You can find a list of all possible rules on the official [VeeValidate Rules](https://vee-validate.logaretm.com/v2/guide/rules.html) website. Try to type in some text in the input fields below.

```html
<anx-input name="email" label="Email" rules="required|email" />
<anx-input name="password" label="Password" rules="required|min:6|max:12" type="password" />
```

When a user enters input, the **@input** event will be emitted. The example below show how to react on user input.

```vue
<template>
    <anx-input @input="userInput" label="Alert" assistive-text="When you enter some text, an alert will be shown" />
</template>

<script>
export default {
    methods: {
        userInput(input) {
            this.$anxToast.show("User input: " + input);
        }
    }
}
</script>
```