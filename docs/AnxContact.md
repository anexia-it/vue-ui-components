The contact form does not automatically send the request to the backend. This is not possible, because if we are sending the request from the frontend, the google recaptcha will not be validated and could easily be bypassed. If the form has been filled and is valid, the *anx-contact* component will emit the **@submit** event. The request is passed as property and must be handled by you. 

The request already includes the recaptcha. The whole request should be sent to your backend. 
**Note:** If you are using the recaptcha, don't forget to validate the token in the backend. Otherwise the recaptcha could easily be bypassed.

The request also has a WTS session id. It will be automatically set if a tracking script is included in the vue project. The contact form component does not include the tracking script!

```vue
let error = "Test";
let success;
let enabled = true;

const submitted = function(request) {
    // You should now send this to your backend and validate the recaptcha token (request contains the information)

    // Depending on you response, an error or success message should be showed
    const serverResponse = { success: Math.random() < 0.5}; // Just for demonstration!
    if (serverResponse.success === false) {
        error = "Something went wrong!";
    } else {
        success =
        "We have received your request and will conact you as soon as possible";
        enabled = false;
    }
}

<anx-container>
    <anx-contact
        recaptcha-sitekey="6Ld9pr4aAAAAAMenlr2xionxPM1sHQ-OgFaa2n2V"
        :invisible-captcha="false"
        :error="error"
        :success="success"
        :enabled="enabled"
        :show-email="true"
        :show-phone="true"
        @submit="submitted"
        ref="contact"
    >
        This is an example for the <strong>anx-contact</strong> component. You
        can modify several properties of this component. VueRecaptcha is also supported and will only be initialised
        if a site key is provided.

        The labels for the input fields can be changed by using the respective property for the input.
    </anx-contact>
</anx-container>
```