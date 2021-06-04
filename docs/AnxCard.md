The *anx-card* component does not contain any special logic and is only used for rendering a special layout.

```html
<anx-container>
  <anx-content title="Cards" size="h2">
    <anx-card icon="anexia" title="One card" link="#" link-text="more >">
      This is the text of the card
    </anx-card>

    <anx-card
      icon="dokument"
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