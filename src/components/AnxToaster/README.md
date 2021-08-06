The *anx-toaster* is a container for toasts in a specific position on the screen. Without the toaster the stacking of toasts would not be possible. For simple examples on how to show toasts please refere to the [AnxToast Component Documentation](/#/Components/AnxToast). The example below randomly generates toasts when the button is clicked.

```vue
<template>
    <anx-button @click="generateRandomToast">Click me to show a random toast!</anx-button>
</template>

<script>
export default {
    data: function() {
        return {
            horizontalPositions: [ "left", "center", "right" ],
            verticalPositions: [ "top", "bottom" ],
            colors: [ "#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        }
    },
    methods: {
        generateRandomToast() {
            this.$anxToast.show(this.getRandomString(), {
                backgroundColor: this.getRandomElement(this.colors),
                verticalAlign: this.getRandomElement(this.verticalPositions),
                horizontalAlign: this.getRandomElement(this.horizontalPositions)
            })
        },
        getRandomString() {
            let length = 0;
            do {
                length = Math.floor(Math.random() * this.text.length);
            } while (length < 20)

            return this.text.substring(0, length)
        },
        getRandomElement(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }
}
</script>

```