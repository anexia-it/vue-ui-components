The *anx-form-container* can be used to group input components inside a *anx-form* together. Sometimes you may have a block of checkboxes that belong together, in this case the *anx-form-container* automatically adapts the margin for the components.

```html
<anx-container>
    <anx-form name="my-form" :submit-button="{ text: 'Send >' }">
        <anx-input label="Some input" />
        <anx-input label="Another input" assistive-text="Another input field for the user" />

        <anx-form-container>
            <anx-checkbox name="Option 1" />
            <anx-checkbox name="Option 2" />
            <anx-checkbox name="Option 3" />
        </anx-form-container>

        <anx-checkbox name="Checkbox out of form container" />
    </anx-form>
</anx-container>
```