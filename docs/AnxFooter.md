The exmple below shows how to use the *anx-footer*.

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

    <anx-footer
        :links="[
            { text: 'anexia.com', link: 'https://anexia.com' },
            { text: 'Impressum', link: 'https://anexia.com/en/company/about-anexia/imprint' }
        ]"
    >
        <template v-slot:icon>
            <img
                alt="anx-header-logo"
                src="https://anexia.com/fileadmin/anexia-www-3/images/anexia.svg"
            />
        </template>
    </anx-footer>
</anx-global>
```