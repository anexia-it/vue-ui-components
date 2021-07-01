As described above, the *anx-modal* is used to display information in a "pop-up" dialog. The *anx-modal* itself does not contain any logic regarding showing or hiding the modal. By using a simple *v-if* you can decide whether to show the modal or not. When the user closes the modal, the **close** event is emitted and you can hide the modal. The example below shows how to use a modal in combination with a button.

```vue
let showModal = false;

<anx-button text="Show modal >" @click="showModal = true" />

<anx-modal
    v-if="showModal"
    title="AnxModal"
    @close="showModal = false"
    has-close-button
>
    This is an example <i>&lt;anx-modal&gt;</i>.
</anx-modal>

```

Note that the modal will also be closed when a user clicks outside of the modal.

You can also use the built-in confirmation. You just have to set the **confirm** property. The example below show a simple confirmation modal.

```vue
var modal = { show: false };

const close = function() {
    // Do something here
    alert('Closed');
    modal.show = false;
};

const confirm = function() {
    // Do something here
    alert('Confirmed');
    modal.show = false;
};

<anx-button text="Show confirmation modal >" @click="modal.show = true" />

<anx-modal
    v-if="modal.show"
    title="Confirmation modal"
    @close="close"
    @confirm="confirm"
    confirm
>
    This is an example confirmation modal. Just click something and an alert with your choice will be shown.
</anx-modal>
```

You can also show a custom footer and open a model inside another modal. The example below shows how to do this.

```vue
let modals = { first: false, second: false };

<anx-button
    text="Show custom modal >"
    @click="modals.first = true"
/>

<anx-modal
    confirm
    confirm-button-text="Save"
    v-if="modals.first"
    title="Confirmation"
    @close="modals.first = false"
    @confirm="modals.first = false"
>
    This is an example for a modal with a custom footer and confirm and
    close button.<br /><br />
    If you are not happy with the predefined buttons, you can remove the
    <strong>confirm</strong> and
    <strong>has-close-button</strong> property from the modal and
    configure your own footer with your own buttons using the
    <strong>modal-footer</strong> slot.<br /><br />
    Click the modal button to open a smaller model inside the original
    modal.
    <template v-slot:modal-footer>
        <anx-button
        text="Modal"
        @click="modals.second = true"
        style="margin-left: 30px;"
        />
    </template>
</anx-modal>

<anx-modal
    v-if="modals.second"
    title="Success"
    size="s"
    has-close-button
    @close="modals.second = false"
    >
    This is another smaller modal!
</anx-modal>
```