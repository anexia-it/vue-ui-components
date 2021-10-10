The *anx-toast* is used to notify your users with a small push notifications. The component is very simple and straightforward to use. The recommended way of using the *anx-toast* is via the [AnxToastPlugin](/vue-ui-components/#/Documentation/AnxToastPlugin). The example below shows hot to programmatically create a toast notification.

```vue
<template>
    <anx-button @click="handleClick">AnxToastPlugin!</anx-button>
</template>

<script>
export default {
    methods: {
        handleClick() {
            // This simple line is responsible for generating the notification
            this.$anxToast.show("The AnxToastPlugin is great!");
        }
    }
}
</script>
```

The **AnxIconsPlugin** is automatically registered as plugin when the UI tool itself is regsitered.  

To modify the *anx-toast* generated with the **AnxToastPlugin** you can simply pass an object with all the described properties from above as additional parameter to the show function. For easier usage you also have the ```$anxToast.success()``` and ```$anxToast.error()``` functions to simply create success or error notifications.

```vue
<template>
    <div>
        <anx-button @click="success">Success</anx-button>
        <anx-button @click="warning" color="#FFB02F">Warning</anx-button>
        <anx-button @click="error" color="#C9302C">Error</anx-button>
        <anx-button @click="options" color="#003CA6">Toast with modified properties</anx-button>
    </div>
</template>

<script>
export default {
    methods: {
        warning() {
            // If no options are provided, the default options are applied
            this.$anxToast.warning("This is a warning default notification");
        },
        success() {
            this.$anxToast.success("This is a success notification!");
        },
        error() {
            this.$anxToast.error("This is an error notification!");
        },
        options() {
            this.$anxToast.show("This is a notification with additional options", {
                autoCloseTimeout: 10000,
                horizontalAlign: "center",
                verticalAlign: "bottom",
                color: "white",
                backgroundColor: "#003CA6"
            })
        }
    }
}
</script>
```

You may have noticed, that the *anx-toast* will automatically disappear after 2,5 seconds. You can either change the timeout for autmatic closing with the **autoCloseTimeout** property or disable the automatic close functionality. The notification in the example below won't be automatically closed. It can only be closed by clicking on the button again or by clicking on the notification itself. **Note:** Since the show method of the plugins returns an instance of the toast itself, you can also programmatically close the toast. In this example the toast can also be closed by clicking on the *Hide toast* button.

```vue
<template>
    <div>
        <anx-button @click="toggle">
            <span v-if="!toast">Show toast</span>
            <span v-else>Hide toast</span>
        </anx-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toast: null
        }
    },
    methods: {
        show() {
            this.toast = this.$anxToast.show("This notification will only close on click!", { autoClose: false});

            this.toast.$on("destroy", () => {
                this.toast = null;
            })
        },
        hide() {
            if (this.toast) {
                this.toast.hideAction();
            }
        },
        toggle() {
            if (this.toast) this.hide();
            else this.show();
        }
    }
}
</script>
```

The notification can be displayed in six different locations on the screen. The following example covers all possible locations for a notification.

```vue
<template>
    <div>
        <anx-button @click="showToast({ verticalAlign: 'top', horizontalAlign: 'left'})" text="top-left" />
        <anx-button @click="showToast({ verticalAlign: 'top', horizontalAlign: 'center'})" text="top-center" />
        <anx-button @click="showToast({ verticalAlign: 'top', horizontalAlign: 'right'})" text="top-right" />
        <br><br>
        <anx-button @click="showToast({ verticalAlign: 'bottom', horizontalAlign: 'left'})" text="bottom-left" />
        <anx-button @click="showToast({ verticalAlign: 'bottom', horizontalAlign: 'center'})" text="bottom-center" />
        <anx-button @click="showToast({ verticalAlign: 'bottom', horizontalAlign: 'right'})" text="bottom-right" />

    </div>
</template>

<script>
export default {
    methods: {
        showToast(options) {
            this.$anxToast.show("This is a notification", options)
        }
    }
}
</script>
```