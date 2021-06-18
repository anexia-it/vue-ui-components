The *anx-global* should be wrapped around your whole application. In the hierarchy of components the *anx-global* should be the first. This component contains some styles that match our guidelines. So everything this component does is applying some design to your application. In the example below you can find all grid components in the correct hierarchy.

```html
<anx-global>
    <anx-header />

    <anx-container>
        <anx-content inverse first>
            First content
        </anx-content>
        <anx-content title="Content">
            <anx-paragraph>
                The first paragraph
            </anx-paragraph>

            <anx-paragraph size="h3" title="Paragraph">
                The first paragraph
            </anx-paragraph>
        </anx-content>
    </anx-container>

    <anx-footer />
</anx-global>
```
