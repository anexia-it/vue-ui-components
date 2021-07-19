The *anx-list* is used for rendering a list based on the items provided. You just have to pass an array with the items you wish to render as a list.

```html
<anx-list :items="['First', 'Second', 'Third']" />
```

There are also several properties for changing the style of the list. You can for example replace the icon of the list with an *anx-icon*. Just use the **icon** property.

```html
<anx-list :items="['First', 'Second', 'Third']" icon="like" no-padding />
```

You can change the list style type:

```html
<anx-list
    :items="['First', 'Second', 'Third']"
    list-style-type="decimal"
    no-spacing
/>
```

The *anx-list* also provides named slots for the respective item and the icon. In the example below the text and the icon for the third item are changed by slots. Look at the code to see how it works.

```html
<anx-list
    :items="['First', 'Second', 'Third', 'Fourth']"
    icon="like"
    no-padding
>
    <template v-slot:icon2>
        <anx-icon icon="x" width="15px"/>
    </template>
    <template v-slot:item2>
        This item has been changed
    </template>
</anx-list>
```