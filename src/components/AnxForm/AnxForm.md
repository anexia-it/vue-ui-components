The *anx-form* is used for grouping input components together in a form. Everytime you have more than one input component, you should consider putting them inside a *anx-form*. The component itself is very simple. The example below shows hot to automatically render a button for the form and how to handle the form submit correctly.

```vue
const formdata = { input: '' };
const submitForm = function() {
    alert('The form has been submitted\n User input: ' + formdata.input + '');
};

<anx-container>
    <anx-form
        @submit="submitForm"
        name="ip-form"
        :submit-button="{ text: 'Send >', disabled: false, width: 'auto' }"
    >
        <anx-input v-model="formdata.input" name="input" label="Input"/>
    </anx-form>
</anx-container>
```

If you are using input components that have validation rules, the *anx-form* will not fire the submit event until all conditions are matched. If the user tries submit the form, the validation will be triggered. If a validation does not match, it is highlited. See the exmaple below:

```vue
const formdata = { input: '', cb1: false, cb2: false };
const submitForm = function() {
    alert('The form has been submitted');
};

<anx-container>
    <anx-form
        @submit="submitForm"
        name="my-form"
        :submit-button="{ text: 'Send >', disabled: false, width: 'auto' }"
    >
        <anx-input v-model="formdata.input" name="input" label="Input" rules="required|email"/>
        <anx-checkbox v-model="formdata.cb1" name="Additional Checkbox" />
        <anx-checkbox v-model="formdata.cb2" name="Required Checkbox" validation />
    </anx-form>
</anx-container>
```