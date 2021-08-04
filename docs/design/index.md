Our library has been built to match the **Anexia Corporate Design Guidelines**. This makes it very easy and straight forward to build projects matching these guidelines. If you don't want to follow these guidelines, you can simply change them.

For a description on how to change design variables during runtime please refer to the [AnxVariablesPlugin Documentation](/#/Documentation/Plugins?id=anxvariablesplugin).

In most cases you don't need to change the design during runtime. You can simply adapt the design when installing our library. Therefore you have to pass options with a ```variables``` key containing you variables.

```javascript
import Vue from 'vue'
import AnxUIPlugin from '@anexia/vue-ui-components'
import "@anexia/vue-ui-components/lib/anx.css";

Vue.use(AnxUIPlugin, {
    variables: {
        '--primary-color': '#ffb703',
        '--primary-color-dark': '#219ebc',
        '--secondary-color': '8ecae6'
    }
});
```

These variables change the style for the whole application. This affects all components (AnxTitle, AnxInput, AnxIcon, ...). In the example below you can change some variables and the [AnxVariablesPlugin ](/#/Documentation/Plugins?id=anxvariablesplugin) will change the styles during runtime. Just click the **Change design** button.  

**Note:** Since the design is set programmatically during runtime, the design is lost when refreshing the page. This can be avoided, for example, by setting the colors when installing our library (described above).

```vue
<template>
    <anx-global>
        <anx-header />

        <anx-container>
            <anx-content inverse first>
                This is a simple example on how to change the design of the application during runtime.
            </anx-content>

            <anx-content title="Change Design">
                <anx-paragraph>
                    Use the inputs below to change some styles. Please use CSS compatible styles like HEX codes.
                </anx-paragraph>

                <anx-form :submit-button="{ text: 'Change design', width: '100%' }" @submit="changeDesign">
                    <anx-input 
                        v-model="primaryColor" 
                        label="Primary color" 
                        assistive-text="This is the primary color" />
                    <anx-input 
                        v-model="primaryColorDark" 
                        label="Primary color dark" 
                        assistive-text="This is the dark version of the primary color. Used for background." />
                    <anx-input 
                        v-model="secondaryColor" 
                        label="Secondary color" 
                        assistive-text="This is the secondary color" />
                    <anx-input 
                        v-model="successColor" 
                        label="Success color" 
                        assistive-text="This is the color used for success messages" />
                    <anx-button 
                        @click="resetDesign" 
                        type="button" 
                        outline 
                        style="width: 100%; margin-bottom: 30px"
                    >
                        Reset design
                    </anx-button>
                    <anx-button 
                        @click="randomDesign" 
                        type="button" 
                        outline 
                        style="width: 100%; margin-bottom: 30px"
                    >
                        Random design
                    </anx-button>
                </anx-form>
            </anx-content>

            <anx-content title="Components">
                <anx-paragraph>
                    If you changed the design, the whole application will change its design, because the AnxVariablesPlugin actsl globally. At the <anx-link href="/#/Components">Components</anx-link> Documentation you can see all components with the new design.<br><br>
                    Below are some example components so you can see what affects the design change has.
                </anx-paragraph>

                <anx-checkbox>This is a checkbox</anx-checkbox>

                <anx-paragraph>
                    All the icons will also change their color to the <span class="attention">secondary-color</span>.
                </anx-paragraph>

                <div style="display: flex">
                    <anx-icon-24h width="40px" height="40px" margin="20px" />
                    <anx-icon-datenbank width="40px" height="40px" margin="20px" />
                    <anx-icon-satellit width="40px" margin="20px" />
                    <anx-icon-spiele-und-spass width="40px" margin="20px" />
                    <anx-icon-mbaas width="40px" margin="20px" />
                </div>
            </anx-content>
        </anx-container>

        <anx-footer />
    </anx-global>
</template>

<script>
export default {
    data() {
        return {
            primaryColor: "#ffb703",
            primaryColorDark: "#219ebc",
            secondaryColor: "#8ecae6",
            successColor: "#ffb703",
            presets: [
                [ "#ffb703", "#219ebc", "#8ecae6", "#ffb703" ],
                [ "#606c38", "#283618", "#bc6c25", "#bc6c25" ],
                [ "#669bbc", "#003049", "#c1121f", "#669bbc" ],
                [ "#2a9d8f", "#264653", "#e76f51", "#2a9d8f" ],
                [ "#3a6ea5", "#004e98", "#ff6700", "#3a6ea5" ],
                [ "#bf4342", "#8c1c13", "#735751", "#bf4342" ]
            ]
        }
    },
    methods: {
        // Change the design
        changeDesign() {
            this.$anxVariables.setVariable('--primary-color', this.primaryColor);
            this.$anxVariables.setVariable('--primary-color-dark', this.primaryColorDark);
            this.$anxVariables.setVariable('--secondary-color', this.secondaryColor);
            this.$anxVariables.setVariable('--success-color', this.successColor);
        },
        // Reset the design to the default values
        resetDesign() {
            this.$anxVariables.resetVariable('--primary-color');
            this.$anxVariables.resetVariable('--primary-color-dark');
            this.$anxVariables.resetVariable('--secondary-color');
            this.$anxVariables.resetVariable('--success-color');
        },
        // Select a design randomly from the presets
        randomDesign() {
            let random;
            do {
                random = Math.floor(Math.random() * this.presets.length);
                console.log(random);
            } while (this.presets[random][0] === this.primaryColor);

            this.primaryColor = this.presets[random][0];
            this.primaryColorDark = this.presets[random][1];
            this.secondaryColor = this.presets[random][2];
            this.successColor = this.presets[random][3];

            this.changeDesign();
        }
    }
}
</script>
```

A detailed list of all available variables can be found in ```/src/assets/scss/_varaibles.scss```.