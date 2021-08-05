<template>
  <anx-container class="anx-login" :width="width">
    <anx-content class="anx-login-header" inverse>
      <!-- @slot This slot is can optionally be used for the header -->
      <slot name="header">
        <img v-if="logo" :src="logo" />
      </slot>
    </anx-content>
    <anx-content
      :class="'anx-login-body ' + (noFooter === null ? 'with-footer' : '')"
    >
      <div v-if="customerLogo" class="customer-logo">
        <!-- @slot This slot is can optionally be used for the customer logo -->
        <slot name="customer-logo">
          <img :src="customerLogo" class="customer-logo" />
        </slot>
      </div>

      <anx-form class="anx-login-form" @submit="login">
        <!-- @slot This slot is can optionally be used for the username input -->
        <slot name="username-input">
          <anx-input
            v-model="username"
            :name="usernameName"
            :id="usernameId"
            :label="usernameLabel"
            :rules="usernameRules"
            :assistive-text="usernameAssistiveText"
            type="text"
            autocomplete="username"
          />
        </slot>

        <slot name="password-input">
          <!-- @slot This slot is can optionally be used for the password input -->
          <anx-input
            v-model="password"
            :name="passwordName"
            :id="passwordId"
            :label="passwordLabel"
            :rules="passwordRules"
            :assistive-text="passwordAssistiveText"
            type="password"
            autocomplete="current-password"
          />
        </slot>

        <!-- @slot This slot is can optionally be used for the remember me input -->
        <slot name="remember-me-input">
          <anx-checkbox
            v-if="rememberMe !== null"
            v-model="rememberMeCheckbox"
            name="remember-me-checkbox"
          >
            {{ rememberMeText }}
          </anx-checkbox>
        </slot>

        <span class="error" v-if="hasLoginError">
          <!-- @slot This slot is can optionally be used for the error message -->
          <slot name="error">
            <anx-alert v-model="hasLoginError" type="error">
              {{ loginError }}
            </anx-alert>
          </slot>
        </span>

        <!-- @slot This slot is can optionally be used for the submit button -->
        <slot name="submit-button">
          <div :class="`button-container button-${submitButtonAlign}`">
            <anx-button
              class="login-button"
              type="submit"
              :width="submitButtonWidth"
              :text="submitButtonText"
              inline
            />
          </div>
        </slot>
      </anx-form>

      <div v-if="noFooter === null" class="anx-login-footer">
        <!-- @slot This slot is can optionally be used for the footer -->
        <slot name="footer">
          <anx-hr-line color="green" margin="20px" />
          <div class="footer-content">
            <div class="text" :style="`min-height:${footerIconSize}`">
              <span v-for="(text, i) in footerText" :key="i">
                {{ text }}<br />
              </span>
            </div>

            <div class="stamp">
              <!-- @slot This slot is can optionally be used for the footer icon (only available if the footer slot is unused) -->
              <slot name="footer-icon">
                <anx-icon
                  :icon="footerIcon"
                  :width="footerIconSize"
                  :height="footerIconSize"
                />
              </slot>
            </div>
          </div>
        </slot>
      </div>
    </anx-content>
  </anx-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import AnxAlert from "../AnxAlert/AnxAlert.vue";
import AnxButton from "../AnxButton/AnxButton.vue";
import AnxCheckbox from "../AnxCheckbox/AnxCheckbox.vue";
import AnxContainer from "../AnxContainer/AnxContainer.vue";
import AnxContent from "../AnxContent/AnxContent.vue";
import AnxForm from "../AnxForm/AnxForm.vue";
import AnxHrLine from "../AnxHrLine/AnxHrLine.vue";
import AnxIcon from "../AnxIcon/AnxIcon.vue";
import AnxInput from "../AnxInput/AnxInput.vue";

/**
 * This component renders a highly adjustable login form that matches the style guidelines
 */
@Component({
  components: {
    AnxAlert,
    AnxButton,
    AnxCheckbox,
    AnxContainer,
    AnxContent,
    AnxForm,
    AnxHrLine,
    AnxIcon,
    AnxInput
  }
})
export default class AnxLogin extends Vue {
  /** The width of the login form */
  @Prop({ default: "400px" }) width!: string;

  /** This is the src for the logo in the header */
  @Prop({ default: null }) logo!: string | null;

  /** This is the src attribute of the customer logo */
  @Prop({ default: null }) customerLogo!: string | null;

  /** If this is not null, the string will be displayed as error */
  @Prop({ default: null }) loginError!: string | null;

  /** Modify the username input */
  /** The name of the username field */
  @Prop({ default: "username" }) usernameName!: string;
  /** The id of the username field */
  @Prop({ default: "username-input" }) usernameId!: string;
  /** The label for the username field */
  @Prop({ default: "Username" }) usernameLabel!: string;
  /** The rules for the username field */
  @Prop({ default: "required" }) usernameRules!: string;
  /** The assistive text for the username field */
  @Prop({ default: "" }) usernameAssistiveText!: string;

  /** Modify the password input */
  /** The name of the password field */
  @Prop({ default: "password" }) passwordName!: string;
  /** The id of the password field */
  @Prop({ default: "password-input" }) passwordId!: string;
  /** The label for the password field */
  @Prop({ default: "Password" }) passwordLabel!: string;
  /** The rules for the password field */
  @Prop({ default: "required" }) passwordRules!: string;
  /** The assistive text for the password field */
  @Prop({ default: "" }) passwordAssistiveText!: string;

  /** Modify the submit button */
  /** The width of the submit button */
  @Prop({ default: null }) submitButtonWidth!: string | null;
  /** The text of the submit button */
  @Prop({ default: "Log in" }) submitButtonText!: string;
  /** The align of the submit button */
  @Prop({ default: "right" }) submitButtonAlign!: string;

  /** Modify the footer */
  /** This property can be set to hide the footer */
  @Prop({ default: null }) noFooter!: boolean | null;
  /** These are the lines for the text in the footer */
  @Prop({ default: null }) footerText!: Array<string> | null;
  /** The icon of the footer */
  @Prop({ default: "anexia-stamp" }) footerIcon!: string;
  /** The size of the icon of the footer */
  @Prop({ default: "60px" }) footerIconSize!: string;

  /** Option to display a remember me button (The string that is provided, will be displayed as text. If no text is provided, the text is "Remember me") */
  @Prop({ default: null }) rememberMe!: string | null;
  /** The default value for the remember me checkbox */
  @Prop({ default: false }) rememberMeDefault!: boolean;

  /** The variables for username and password */
  private username = "";
  private password = "";
  private rememberMeCheckbox = this.rememberMeDefault;

  /** Shows the error message if this is true */
  private hasLoginError = false;

  /** Watches the error message and sets the variable to show the error if needed */
  @Watch("loginError")
  onLoginErrorChanged(newVal: string) {
    if (newVal === null || !newVal) {
      this.hasLoginError = false;
    } else {
      this.hasLoginError = true;
    }
  }

  /** When the user hits the login button and the entered data passes validation, the login event is emitted */
  @Emit()
  login() {
    return {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMeCheckbox
    };
  }

  /** Check if the remember me text is set, otherwise return default text */
  private get rememberMeText(): string {
    if (this.rememberMe && this.rememberMe.length > 0) {
      return this.rememberMe;
    }

    return "Remember me";
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-login {
  .anx-login-header {
    padding: 0px;
    margin-bottom: 30px;
    padding-top: 140px;

    img {
      height: 40px;
    }
  }

  .anx-login-body {
    &.with-footer {
      padding-bottom: 20px;
    }

    .customer-logo {
      margin-bottom: 20px;

      img {
        width: 200px;
        display: block;
        margin: auto;
      }
    }

    .anx-login-form {
      .button-container {
        width: 100%;

        .login-button {
          margin-right: 0px;
        }

        &.button-left {
          text-align: left;
        }

        &.button-center {
          text-align: center;
        }

        &.button-right {
          text-align: right;
        }
      }
    }
  }

  .anx-login-footer {
    .footer-content {
      .text {
        display: inline-block;
        font-size: 14px;
      }

      .stamp {
        display: inline-flex;
        float: right;
      }
    }
  }
}
</style>
