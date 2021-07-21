You can also use our library on any website. You just have to include the builded version of our library.

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- Include the vue script before the component library -->
        <script src="https://unpkg.com/vue"></script>
        <script src="anx.min.js"></script>
    </head>
    <body>
        <anx-anx-global>
            <anx-anx-container>
                <anx-anx-content title="Test">
                    <anx-anx-paragraph>
                        This is a test
                    </anx-anx-paragraph>
                    
                    <anx-anx-button>Button</anx-anx-button>
                </anx-anx-content>
            </anx-anx-container>
        </anx-anx-global>
    </body>
</html>
```

**Note:** The webcomponent library is built using *vue-cli-service*. When building the library, an additional prefix has to be defined. That's why you have to use the special prefix *wc-anx-*.

**Note:** The library relies on Vue being globally available on the page. So you also have to load Vue into your project. It's important that Vue is loaded before the component library, otherwise the library won't be installed correctly.