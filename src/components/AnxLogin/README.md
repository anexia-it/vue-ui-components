This component renders a highly adjustable login form. There are several properties and slots to modify the content. The example below shows a simple login form with its functionalities.

```vue
<template>
    <anx-global id="app" style="padding:1px">
        <!-- This is the login component -->
        <anx-login
            logo="https://anexia.com/fileadmin/img/pressContant/imagePics/logo/ANEXIA_Logo_CMYK.jpg"
            customer-logo="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
            :footer-text="[
                'Log-in to your application',
                'Lorem Ipsum placeholder text',
                'Text lorem ipsum.'
            ]"
            :login-error="error"
            @login="login"
            remember-me="Remember me"
            :remember-me-default="true"
        />

        <!-- In production you don't need this modal. The data should be check via your API -->
        <anx-modal
            v-if="showModal"
            title="Login attempt"
            @close="showModal = false"
            :has-close-button="false"
        >
            <anx-paragraph>
                <strong>Username: </strong> {{ credentials.username }}<br />
                <strong>Password: </strong> {{ credentials.password }}<br />
                <strong>Remember Me: </strong>
                {{ credentials.rememberMe ? "Checked" : "Not checked" }}<br />

                <br /><span>Is the data correct?</span><br />

                <anx-button @click="dataCorrect">Correct</anx-button><br /><br />
                <anx-button @click="dataIncorrect">Incorrect</anx-button>
            </anx-paragraph>
        </anx-modal>
    </anx-global>
</template>

<script>
export default {
    data() {
        return {
            // The modal to show after login
            showModal: false,
            // The user credentials
            credentials: {username: '', password: '', rememberMe: false},
            // This is the error that will be displayed when login fails
            error: ''
        }
    },
    methods: {
        // This function will be called when the login event is emitted
        login(data) {
            this.credentials = data;
            this.showModal = true;
        },
        // This function simulates a positive response from the api regarding the credentials
        dataCorrect() {
            this.$anxToast.show("Now you would be redirected to your users page");
            location.reload();
        },
        // This function simulates a negative response from the api regarding the credentials
        dataIncorrect() {
            this.showModal = false;
            this.error = "Wrong user credentials";
        }
    }
}
</script>
```

If you are unhappy with the predefined components and fields for header, footer, username... use the predefined slots to replace the components.