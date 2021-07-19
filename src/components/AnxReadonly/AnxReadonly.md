The *anx-readonly* can be used to display some information to the user that cannot be modified. The design from this comoponent differs from a disabled *anx-input*.  The purpose of a *anx-readonly* is to display some text, that should not be modified and can easily be copied. The example below shows the component with all its features.

```html
<anx-readonly bold copy-on-click>
    This is a simple <i>&lt;anx-readonly&gt;</i> component with bold
    text. Click me to copy the text!
</anx-readonly>

<anx-readonly>
    The following <i>&lt;anx-readonly&gt;</i> component is not bold and
    the text cannot be copied.<br /><br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
    convallis turpis a elit imperdiet pellentesque in ac tortor.
    Pellentesque non massa eget diam porta scelerisque quis vitae lacus.
    Nam id orci ut enim tempus porta. Nunc nec mi nulla. Praesent et
    semper mi. Integer dignissim diam dictum dui ultricies, vitae
    facilisis ante rhoncus. Sed euismod sapien at cursus tristique.<br /><br />
    Fusce ut tristique augue, vitae blandit sapien. Donec turpis leo,
    interdum at blandit sit amet, vehicula eget turpis. Donec rhoncus
    porta hendrerit. Etiam at ultrices eros. Pellentesque dictum purus
    at odio venenatis, eu malesuada lorem convallis. In quis massa eros.
    Praesent vitae velit vitae lectus dapibus vestibulum a quis leo.
</anx-readonly>
```