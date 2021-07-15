TODO:

```vue
let neutral = false;
let success = false;
let error = false;

<anx-button color="#D7D7D7" @click="neutral = true">Show neutral toast</anx-button><br><br>
<anx-button @click="success = true">Show success toast</anx-button><br><br>
<anx-button color="#d50000" @click="error = true">Show error toast</anx-button><br><br>

<anx-toast v-model="neutral" type="neutral">This is a neutral toast</anx-toast>
<anx-toast v-model="success" type="success">This is a success toast</anx-toast>
<anx-toast v-model="error" type="error">This is an error toast</anx-toast>
```

## Closeable
```vue
let neutral = false;
let success = false;
let error = false;

<anx-button color="#D7D7D7" @click="neutral = true">Show neutral toast</anx-button><br><br>
<anx-button @click="success = true">Show success toast</anx-button><br><br>
<anx-button color="#d50000" @click="error = true">Show error toast</anx-button><br><br>

<anx-toast v-model="neutral" type="neutral" closeable>This is a neutral toast</anx-toast>
<anx-toast v-model="success" type="success" closeable>This is a success toast</anx-toast>
<anx-toast v-model="error" type="error" closeable>This is an error toast</anx-toast>
```