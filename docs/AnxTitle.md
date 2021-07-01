The *anx-title* does not contain any logic. It has only styling features. So the component can be used to generate a title that matches our stlye guidelines.

```html
<anx-title size="h1">This is the H1 title</anx-title>
<anx-title size="h2">This is the H2 title</anx-title>
<anx-title size="h3">This is the H3 title</anx-title>
```

By default, there is always a line after the title. This line can be removed by using the **noline** property.

```html
<anx-title size="h1" noline>This is the H1 title without the line</anx-title>
<anx-title size="h2" noline>This is the H2 title without the line</anx-title>
<anx-title size="h3" noline>This is the H3 title without the line</anx-title>
```