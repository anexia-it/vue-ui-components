If you want to include our library in an existing *Vue* project, you simply have to install it in your apps entry point.

```javascript
// src/main.js
import Vue from 'vue'
import AnxUIPlugin from '@anx/vue-ui-components/src'

Vue.use(AnxUIPlugin);
```

This will automatically register **all** available components and plugins in your application. You don't have to import any component or plugin separately.  

If you don't want to install the whole library, you can also import and install some components or plugins separately.

```javascript
// src/main.js
import Vue from 'vue'
import { AnxButton, AnxInput } from '@anx/vue-ui-components/src'

Vue.use(AnxButton);
Vue.use(AnxInput);
Vue.use(AnxIconsPlugin);
```