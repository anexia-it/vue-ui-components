The *anx-link* can be used very straight forward like a regular HTML link. You just have to provide the **href** property and the link will lead the user to this direction on click.


If you are using the Vue Router and you have *named routes*, you can also pass the name of the route with the **route-name** property. This will override the **href** parameter.

```html
<anx-link href="https://anexia.com">Anexia website</anx-link>
```

You can also disable a link with the **disabled** property. In this case the *anx-link* will be rendered as span.

```html
<anx-link href="https://anexia.com" disabled disabled-style="text">
    Anexia website
</anx-link>
```
         
You can tell the *anx-link* to open the url in a new tab by using the **new-tab** property. This will work for external and internal urls.

```html
<anx-link href="https://anexia.com" new-tab>Open Anexia website in new tab</anx-link>
```

If you use internal links, you should always use the **Vue Router**, because it is **much faster** (does not reload the whole page) and this is way more user friendly. *anx-link* **automatically** does this for you. It checks, if the Vue Router is installed and if the provided link is internal or external. Based on this information, *anx-link* decides whether to use the Vue Router or not.

If you wish not to use the Vue Router although it is installed, you can use the **external** property to handle the link like an external.

