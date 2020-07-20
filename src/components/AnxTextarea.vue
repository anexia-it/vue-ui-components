<template>
  <div class="anx-textarea" :style="cssProps">
    <textarea
      :id="id"
      :rows="rows"
      :disabled="disabled"
      v-model="message"
      :class="{ filled: message.length >= 1 }"
    />
    <label id="textarea-label" :for="id">{{ labelText }}</label>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxTextarea extends Vue {
  @Prop({ default: "anx-textarea" }) id!: string;
  @Prop({ default: "Additional Text" }) labelText!: string;
  @Prop({ default: "4" }) rows!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: "420px" }) width!: string;

  private message = "";

  get cssProps() {
    return {
      "--textarea-width": this.width
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-textarea {
  width: var(--textarea-width);
  display: block;
  position: relative;
  padding-top: 9px;
  margin-bottom: 30px;

  @media only screen and (width: 1125px), only screen and (width: 1200px) {
    display: inline-block !important;
  }
}
.anx-textarea textarea {
  width: var(--textarea-width);
  padding: 20px 17px 20px 17px;
  border: 1px solid $anx-second-grey-light;
  color: $anx-lightest-grey-dark !important;

  &:focus,
  &.filled {
    border: 1px solid #77bc1f;
    outline: 0;

    + label {
      color: $anx-primary-green !important;
      margin-left: 15px;
      background-color: #fff;
      font-size: 12px !important;
      opacity: 1 !important;
      z-index: 1;
      transition: all 0.1s ease;
      position: absolute;
      left: 0;
      top: -1px;
      padding: 0 2px 0 2px;
    }

    & placeholder {
      display: none;
    }
  }
}
.anx-textarea textarea + label {
  color: $anx-lightest-grey-dark !important;
  margin-left: 17px;
  margin-bottom: 0;
  background-color: transparent;
  font-size: 16px !important;
  opacity: 1 !important;
  z-index: 1;
  transition: all 0.1s ease;
  left: 0;
  top: 24px;
  position: absolute;
}

.anx-textarea textarea[disabled] label {
  opacity: 0 !important;
}

.anx-textarea textarea:not([disabled]) label {
  opacity: 1;
}
</style>
