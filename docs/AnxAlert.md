Currently, there are two types of *anx-alert*s: *error* and *success*. By default, the *error* alert will be rendered. The example below shows some basic examples:

```vue
<template>
  <div>
    <anx-alert v-model="error">Error</anx-alert>
    <anx-alert v-model="success" type="success">Success</anx-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: true,
      success: true
    }
  }
}
</script>
```

The alert is controled via the *v-model*. As soon as the passed variable changes to true, the alert will be shown. When the user closes the button, a *input* event is emitted and the variable is changed to false. The example below shows how to use a alert in combintation with a button. The button is only clickable, if the alert is not shown.

```vue
<template>
  <div>
    <anx-button @click="show = true" :disabled="show">Show alert!</anx-button>
    <br><br>
    <anx-alert v-model="show" type="success">You clicked the button!</anx-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
```

Additionally you can set a timeout for the alert, to close automatically. The alert in the example below closes automatically after five sceonds.

```vue
<template>
  <div>
    <anx-button @click="show = true" :disabled="show">Show alert!</anx-button>
    <br><br>
    <anx-alert v-model="show" type="success" :auto-close="true" :auto-close-timeout="5000">You clicked the button! Alert will be closed after five seconds...</anx-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
```
