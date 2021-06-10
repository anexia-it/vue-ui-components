You can simply use a *anx-icon* to display a icon in the header by setting the **icon** property. You can also override the *anx-icon* and set a custom icon in the header. The following header is the simplest form of the *anx-header*. In this case, an icon is set using the **icon** property.

```html
<anx-global>
    <anx-header icon="start-up" />
</anx-global>
```

When you pass a **$i18n** instance to the *anx-header*, a language switcher will automatically be rendered. When the user changes the locale, the **localeChange** event is emitted.<br><br>

The *anx-header* also has a navigation menue implemented. Therefore, you just have to pass the **menus** for the navigation menu. Each menu consists of a name and a link to the page. The *anx-header* automatically checks if the current URL of the page matches the provided URL and enables or disables the link if neccessary. You also have the possibility to pass a regular expression for a item. This regex will be checked against the current url of the page. If it matches, this respective link will be disabled.<br> **Note:** The regex will be checked against the full URL of the page! (e.g. https://anexia.com/en/)

```vue
let menus = [
    { menu: "Home", link: "/" },
    { menu: "Anx-Header", link: "/#anxheader" },
    { menu: "Anexia", link: "https://anexia.com", external: true },
    { menu: "Some other component", link: "#", activeRegex: /\/#((?!anxheader).)*$/ }
];
// Note: The last menu item is activated when any component is select except the #anxheader

<anx-global>
    <anx-header :menus="menus">
      <template v-slot:icon>
        <img
            alt="anx-header-logo"
            src="https://anexia.com/fileadmin/anexia-www-3/images/anexia.svg"
        />
      </template>
    </anx-header>
</anx-global>
```