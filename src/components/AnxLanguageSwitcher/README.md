The *anx-language-switcher* currently only works along with Vue-I18n. In order to use this component, your project should have implemented Vue-I18n.  

All you have to do is pass the **i18n** instance to the component. You can additionally pass the languages you want to support. Default langauges are *de* and *en*. The *anx-language-switcher* automatically detects the current language and enables or disables the respective links for the languages. If the user changes the language, it will automatically be updated in the *i18n* instance.

```vue
import VueI18n from "vue-i18n";

// For this example we create a simple i18n instance
const i18n = new VueI18n({
  locale: "en"
});

<anx-global disable-fullscreen>
    <anx-container>
        <anx-content inverse>
            <anx-language-switcher :i18n="i18n" />
        </anx-content>

        <anx-content inverse>
            The current language is: <strong>{{ i18n.locale }}</strong>
        </anx-content>
    </anx-container>
</anx-global>
```

As mentioned above, the default languages are *de* and *en*. If you want to set you custom languages, you have to use the **languages** property. The example below shows how to use this property correctly.

```vue
import VueI18n from "vue-i18n";

// For this example we create a simple i18n instance
const i18n = new VueI18n({
  locale: "en"
});

const languages = [
    {   
        code: "de", // This is the ISO standard code for the language used by i18n
        link: null, // This is the link for the language. By default, this should be null and the language will be changed using vue-i18n. If you pass a link, it will be called when clicking the language.
        text: "DE" // The text to be displayed for the language
    },
    { code: "en", link: null, text: "EN" },
    { code: "fr", link: null, text: "FR" },
    { code: "it", link: "#anxlanguageswitcher", text: "IT" }
]

<anx-global disable-fullscreen>
    <anx-container>
        <anx-content inverse>
            <anx-language-switcher :i18n="i18n" :languages="languages"/>
        </anx-content>

        <anx-content inverse>
            The current language is: <strong>{{ i18n.locale }}</strong>
        </anx-content>
    </anx-container>
</anx-global>
```