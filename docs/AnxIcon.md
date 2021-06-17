You can easily include anexia icons in your design using the *anx-icon* component. All icons are located in */src/assets/icons* and are rendered automatically on build and registered as plugin. You just have to pass the icon name as **icon** property to the *anx-icon* component. The other properties are very straight forward and self explaining. You can additionally set a different title, width, height and margin for the icons.

**Note:** The *anx-icon* component property only supports icons from our UI tool. <br>
*For Developers:* To add a new icon to the ui tool, you just have to paste the *.svg file into the */src/assets/icons* folder. Please use kebap-case as file name. E.g. you could add a file named storage-backup.svg. Then you have to run npm run serve/build or any of the other build processes to build the necessary files.

The example below shows how to use the icon.

```html
<!-- You can pass the name of the icon via the property (PascalCase and kebap-case work) -->
<anx-icon icon="StorageBackup" width="50px" height="50px" />

<!-- You can also directly use the icon component -->
<anx-icon-storage-backup width="50px" height="50px" />
```

The title of the *anx-icon* will be displayed when you hover over the icon. The exmaple below shows, how to change it.

```html
<anx-icon
    icon="anexia-stamp"
    height="100px"
    width="100px"
    title="This is the stamp of a great company!"
/>
```

Below is a list of all icons available. Hover over the icon to see its name. You can use the icons like described above.

```vue
import { AnxIconsNames } from "@/icons";

const icons = [];
AnxIconsNames.forEach(name => {
    name = name[0].toLowerCase() + name.substring(1);
    icons.push(name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`));
});


<anx-icon
    v-for="icon in icons"
    :key="icon"
    :icon="icon"
    width="50px"
    margin="20px"
    :title="icon"
/>
```

<details open>
<summary>*For developers:* Click here to show a description of how the *anx-icon*s work.</summary>
<br>
The serve/build npm script automatically triggers the *generate:icons* npm script. Now the /src/icons/helpers/generate-files.js is executed. This file automatically creates all the files located in /src/icons/ except for the index.js, index.d.ts and the files inside the helper folder.<br>
Now all icons are exported as Vue Components in the icons.js and icons.d.ts files. So, each icon is an individual vue component. All this components are automatically registered into your vue application if you include our UI tool (The **AnxIconsPlugin** is automatically registered). You don't have to import single icons if you want to use them.
</details>