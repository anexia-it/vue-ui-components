In the hierarchy, the *anx-container* comes after *anx-global*. The *anx-container* should be wrapped arround the body of your page. **Note:** *anx-header* and *anx-footer* should not be used inside the container.

```html
<anx-global>
    <anx-header>
        <template v-slot:icon>
            <img
                alt="anx-header-logo"
                src="https://anexia.com/fileadmin/anexia-www-3/images/anexia.svg"
            />
        </template>
    </anx-header>

    <anx-container>
        <anx-content title="Content">
            This is some content inside a container
        </anx-content>
    </anx-container>

    <anx-footer />
</anx-global>
```