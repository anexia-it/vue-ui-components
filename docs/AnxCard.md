The *anx-card* component does not contain any special logic and is only used for rendering a special layout.
You can decide if you want to render an icon (from anx-icons) or an image (with the URL).

```html
<anx-container>
  <anx-content title="Cards" size="h2">
    <anx-card 
      image="https://picsum.photos/80" 
      title="One card" 
      link="#" 
      link-text="more >"
    >
      This is the text of the card
    </anx-card>

    <anx-card
      icon="like"
      title="And another card"
      link="#"
      link-text="more >"
    >
      And this ...<br />
      Is a <strong>multiline</strong> card with inline HTML
    </anx-card>
  </anx-content>
</anx-container>
```