<template>
  <div class="anx-contact">
    <anx-content title="Contact">
      <anx-paragraph size="h2">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </anx-paragraph>
      <anx-form>
        <div class="input-inline">
          <anx-input
            name="first name"
            rules="required"
            label="First Name"
            width="45%"
          />
          <anx-input
            name="last name"
            rules="required"
            label="Last Name"
            width="45%"
            class="right"
          />
        </div>
        <anx-input name="email" rules="required|email" label="Email" />
        <anx-textarea />

        <vue-recaptcha sitekey="djksdjk" />
      </anx-form>
    </anx-content>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AnxContent from "./AnxContent.vue";
import AnxForm from "./AnxForm.vue";
import AnxInput from "./AnxInput.vue";
import AnxParagraph from "./AnxParagraph.vue";
import AnxTextarea from "./AnxTextarea.vue";
import VueRecaptcha from "vue-recaptcha";

@Component({
  components: {
    AnxContent,
    AnxForm,
    AnxInput,
    AnxParagraph,
    AnxTextarea,
    VueRecaptcha
  }
})
export default class AnxContact extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-contact {
  .input-inline {
    .anx-input {
      display: inline-grid;

      &.right {
        float: right;
      }
    }
  }
}
</style>
