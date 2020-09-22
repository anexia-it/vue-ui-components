<template>
  <anx-container class="anx-login" :width="width">
    <anx-content class="anx-login-header" inverse>
      <slot name="header">
        <img v-if="logo" :src="logo" />
      </slot>
    </anx-content>
    <anx-content
      :class="'anx-login-body ' + (noFooter === null ? 'with-footer' : '')"
    >
      <div v-if="customerLogo" class="customer-logo">
        <slot name="customer-logo">
          <img :src="customerLogo" class="customer-logo" />
        </slot>
      </div>

      <anx-form class="anx-login-form">
        <slot name="username-input">
          <anx-input
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
          <anx-input
            :name="passwordName"
            :id="passwordId"
            :label="passwordLabel"
            :rules="passwordRules"
            :assistive-text="passwordAssistiveText"
            type="password"
            autocomplete="current-password"
          />
        </slot>

        <slot name="submit-button">
          <div :class="`button-container button-${submitButtonAlign}`">
            <anx-button
              type="submit"
              :width="submitButtonWidth"
              :text="submitButtonText"
              inline
            />
          </div>
        </slot>
      </anx-form>

      <div v-if="noFooter === null" class="anx-login-footer">
        <slot name="footer">
          <anx-hr-line color="green" margin="20px" />
          <div class="footer-content">
            <div class="text" :style="`min-height:${footerIconSize}`">
              <span v-for="(text, i) in footerText" :key="i">
                {{ text }}<br />
              </span>
            </div>

            <div class="stamp">
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
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxButton from "./AnxButton.vue";
import AnxContainer from "./AnxContainer.vue";
import AnxContent from "./AnxContent.vue";
import AnxForm from "./AnxForm.vue";
import AnxHrLine from "./AnxHrLine.vue";
import AnxIcon from "./AnxIcon.vue";
import AnxInput from "./AnxInput.vue";

@Component({
  components: {
    AnxButton,
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
  @Prop({ default: null }) logo!: string;

  /** This is the src attribute of the customer logo */
  @Prop({ default: null }) customerLogo!: string;

  /** Modify the username input */
  /** The name of the username field */
  @Prop({ default: "username" }) usernameName!: string;
  /** The id of the username field */
  @Prop({ default: "username-input" }) usernameId!: string;
  /** The label for the username field */
  @Prop({ default: "Username" }) usernameLabel!: string;
  /** The rules for the username field */
  @Prop({ default: "" }) usernameRules!: string;
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
  @Prop({ default: "" }) passwordRules!: string;
  /** The assistive text for the password field */
  @Prop({ default: "" }) passwordAssistiveText!: string;

  /** Modify the submit button */
  /** The width of the submit button */
  @Prop({ default: "100px" }) submitButtonWidth!: string;
  /** The text of the submit button */
  @Prop({ default: "Log in" }) submitButtonText!: string;
  /** The align of the submit button */
  @Prop({ default: "right" }) submitButtonAlign!: string;

  /** Modify the footer */
  /** This property can be set to hide the footer */
  @Prop({ default: null }) noFooter!: boolean;
  /** These are the lines for the text in the footer */
  @Prop({ default: [] }) footerText!: Array<string>;
  /** The icon of the footer */
  @Prop({ default: "anexia-stamp" }) footerIcon!: string;
  /** The size of the icon of the footer */
  @Prop({ default: "60px" }) footerIconSize!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-login {
  .anx-login-header {
    padding: 0px;
    margin-bottom: 30px;
    margin-top: 140px;

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
