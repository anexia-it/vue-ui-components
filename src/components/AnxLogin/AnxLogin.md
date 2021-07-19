This component renders a highly adjustable login form. There are several properties and slots to modify the content. The example below shows a simple login form with its functionalities.

```vue
/** The modal to show after login */
let modal = {show: false};

/** The user credentials */
let credentials = {username: '', password: '', rememberMe: false};

/** This is the error that will be displayed when login fails */
let error = { login: '' };

/** This function will be called when the login event is emitted */
const login = function(data) {
    credentials.username = data.username;
    credentials.password = data.password;
    credentials.rememberMe = data.rememberMe;
    modal.show = true;
}

/** This function simulates a positive response from the api regarding the credentials */
const dataCorrect = function() {
    alert("Now you would be redirected to your users page");
    location.reload();
}

/** This function simulates a negative response from the api regarding the credentials */
const dataIncorrect = function() {
    modal.show = false;
    error.login = "Wrong user credentials";
}

<anx-global id="app" style="padding:1px">
    <anx-login
      logo="https://anexia.com/fileadmin/img/pressContant/imagePics/logo/ANEXIA_Logo_CMYK.jpg"
      customer-logo="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
      :footer-text="[
        'Log-in to your application',
        'Lorem Ipsum placeholder text',
        'Text lorem ipsum.'
      ]"
      :login-error="error.login"
      @login="login"
      remember-me="Remember me"
      :remember-me-default="true"
    />

    <!-- In production you don't need this modal. The data should be check via your API -->
    <anx-modal
      v-if="modal.show"
      title="Login attempt"
      @close="modal.show = false"
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
```

If you are unhappy with the predefined components and fields for header, footer, username... use the predefined slots to replace the components.