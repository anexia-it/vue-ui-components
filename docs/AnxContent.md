In the hierarchy, the *anx-content* comes after *anx-container*. The *anx-content* is used to split up information inside the *anx-container*. The example below shows somer different usages of a *anx-content* inside a *anx-container* with a simple header and footer.<br>
**Note:** You should always use a *anx-paragraph* inside the *anx-content* if you want to display simple text.

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
        <anx-content inverse first>
            You can display some information on the top of the page like this
        </anx-content>

        <anx-content title="H1 content">
            <anx-paragraph>This is a content with size h1</anx-paragraph>
        </anx-content>

        <anx-content title="H1 content" size="h2">
            <anx-paragraph>This is a content with size h1</anx-paragraph>
        </anx-content>

        <anx-content title="H1 content" size="h3">
            <anx-paragraph>This is a content with size h1</anx-paragraph>
        </anx-content>

        <anx-content title="H1 content" size="h3" noline>
            <anx-paragraph>This is a content with size h3 without a line</anx-paragraph>
        </anx-content>

        <anx-content>
            <anx-paragraph>This is a content without a title</anx-paragraph>
        </anx-content>
    </anx-container>

    <anx-footer />
</anx-global>
```

```