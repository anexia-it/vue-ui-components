In the hierarchy of components, that contain your content *anx-paragraph* is the lowest. This component should be wrapped directly around your content. Below are some example for different paragraphs.

```html
<anx-global disable-fullscreen>
    <anx-container>
        <anx-content inverse>
            <anx-paragraph inverse>
                This is a paragraph with inversed colors
            </anx-paragraph>
        </anx-content>

        <anx-content>
            <anx-paragraph>This is a simple paragraph</anx-paragraph>
            <anx-paragraph title="Title">This is a paragraph with title</anx-paragraph>
        </anx-content>

        <anx-content inverse>
            <anx-paragraph inverse hint>
                This is a paragraph as hint
            </anx-paragraph>
        </anx-content>
    </anx-container>
</anx-global>
```