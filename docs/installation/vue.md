If you want to include our library in an existing *Vue* project, you simply have to install it in your apps entry point and import the CSS styles.

```javascript
// src/main.js

import Vue from 'vue'
import AnxUIPlugin from '@anexia/vue-ui-components'
import "@anexia/vue-ui-components/lib/anx.css";

Vue.use(AnxUIPlugin);
```

This will automatically register **all** available components and plugins in your application. You don't have to import any components or plugins separately.  

**Note:** Since we explicitly don't want the style to be rendered via Javascript, the CSS file is external. You only have to import it once in your apps entry point.  

If you don't want to install the whole library, you can also import and install some components or plugins separately.

```javascript
// src/main.js

import Vue from 'vue'
import { AnxButton, AnxInput, AnxIconsPlugin } from '@anexia/vue-ui-components'
import "@anexia/vue-ui-components/lib/anx.css";

// Registering plugins manually
Vue.use(AnxIconsPlugin);

// Registering components manually
Vue.component('AnxButton', AnxButton);
Vue.component('AnxInput', AnxInput);
```