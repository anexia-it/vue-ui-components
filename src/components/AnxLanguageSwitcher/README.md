The *anx-language-switcher* currently only works along with Vue-I18n. In order to use this component, your project should have implemented Vue-I18n.  

All you have to do is pass the **i18n** instance to the component. You can additionally pass the languages you want to support. Default langauges are *de* and *en*. The *anx-language-switcher* automatically detects the current language and enables or disables the respective links for the languages. If the user changes the language, it will automatically be updated in the *i18n* instance.

```vue
<template>
    <anx-global disable-fullscreen>
        <anx-container>
            <anx-content inverse>
                <!-- We simply pass the global $i18n instance -->
                <anx-language-switcher :i18n="$i18n" />
            </anx-content>

            <anx-content inverse>
                The current language is: <strong>{{ $i18n.locale }}</strong>
            </anx-content>
        </anx-container>
    </anx-global>
</template>

<script>
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// Note: VueI18n has to be registered in the entry point of your application

export default {}
</script>
```

As mentioned above, the default languages are *de* and *en*. If you want to set you custom languages, you have to use the **languages** property. The example below shows how to use this property correctly.

```vue
<template>
    <anx-global disable-fullscreen>
        <anx-container>
            <anx-content inverse>
                <!-- We simply pass the global $i18n instance -->
                <anx-language-switcher :i18n="$i18n" :languages="languages"/>
            </anx-content>

            <anx-content inverse>
                The current language is: <strong>{{ $i18n.locale }}</strong>
            </anx-content>
        </anx-container>
    </anx-global>
</template>

<script>
export default {
    data() {
        return {
            languages: [
                {   
                    code: "de", // This is the ISO standard code for the language used by i18n
                    link: null, // This is the link for the language. By default, this should be null and the language will be changed using vue-i18n. If you pass a link, it will be called when clicking the language.
                    text: "DE" // The text to be displayed for the language
                },
                { code: "en", link: null, text: "EN" },
                { code: "fr", link: null, text: "FR" },
                { code: "it", link: "#anxlanguageswitcher", text: "IT" }
            ]
        }
    }
}
</script>
```