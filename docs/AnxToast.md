The *anx-toast* is used to notify your users with a small push notifications. The component is very simple and straightforward to use. There are two ways for generating a push notification. The first way is by using the component in combination with *v-model*:

```vue
<template>
    <div>
        <anx-button @click="toast = true">Click me!</anx-button>
        <anx-toast v-model="toast">This is a notification!</anx-toast>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toast: false
        }
    }
}
</script>
```

If you don't want to write code for the *anx-toast* inside your template you can also use the **AnxToastPlugin**. In most cases, using the plugin will be an easier and more straightforward way for generating a toast as you don't have to use the v-model and need no extra variable. When using the plugin, you programmatically create the notification. The example below show how to do this. *Note:* The output will be the same, it only differs in the way of implementing.

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
        <anx-button @click="neutral" color="#D7D7D7">Neutral</anx-button>
        <anx-button @click="success">Success</anx-button>
        <anx-button @click="error" color="#d50000">Error</anx-button>
        <anx-button @click="options" color="#003CA6">Toast with modified properties</anx-button>
    </div>
</template>

<script>
export default {
    methods: {
        neutral() {
            // If no options are provided, the default options are applied
            this.$anxToast.show("This is a neutral default notification");
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
                horizontalAlign: "right",
                verticalAlign: "top",
                color: "white",
                backgroundColor: "#003CA6"
            })
        }
    }
}
</script>
```

You may have noticed, that the *anx-toast* will automatically disappear after 2,5 seconds. You can either change the timeout for autmatic closing with the **autoCloseTimeout** property or disable the automatic close functionality. The notification in the example below won't be automatically closed. It can only be closed by clicking on the button again or by clicking on the notification itself.

```vue
<template>
    <div>
        <anx-button @click="toast = !toast">
            <span v-if="!toast">Show toast</span>
            <span v-else>Hide toast</span>
        </anx-button>

        <anx-toast v-model="toast" :auto-close="false">This is a notification!</anx-toast>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toast: false
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