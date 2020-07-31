<template>
  <button
    :type="btnType"
    :class="className"
    :style="cssProps"
    @click="$emit(btnType)"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxButton extends Vue {
  /**With this property, a button can be set */
  /**Props
   * btnType: the Type of a button
   */
  @Prop({ default: "submit" }) btnType!: string;
  /**className: the class of the button
   * options:
   * "anx-button": the default class (green-animated-button to white outlined)
   * "anx-button btn-outline": outlined-button (white-animated to green)
   */
  @Prop({ default: "anx-button" }) className!: string;
  @Prop({ default: "button" }) text!: string;
  @Prop({ default: "136px" }) width!: string;

  get cssProps() {
    return {
      "--button-width": this.width
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

button {
  width: var(--button-width);
  height: 2.5em; //40px
  padding-top: 2px;
  border: none;
  font-size: 16px;
  vertical-align: middle;
  outline: 0 none;
  padding: 0 2em; //links - rechts 32px
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: $anx-font-family;
}

/* anx-button - super cool animation button */
/***/
.anx-button {
  z-index: 100;
  position: relative;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  font-weight: none;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  text-align: center;
  background-color: transparent;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:before,
  &:after {
    content: "";
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &:before {
    border: 1px solid $anx-primary-green;
    opacity: 0;
    -webkit-transform: scale3d(1.2, 1.2, 1);
    transform: scale3d(1.2, 1.2, 1);
  }

  &:after {
    background: $anx-primary-green;
  }

  &:visited {
    color: $anx-primary-green;
    text-decoration: none;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      color: $anx-primary-green;
      text-decoration: none;

      &:before {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }

      &:after {
        opacity: 0;
        -webkit-transform: scale3d(0.8, 0.8, 1);
        transform: scale3d(0.8, 0.8, 1);
      }
    }
  }
}

/*btn-outline animated button*/
.btn-outline {
  color: $anx-primary-green !important;
  border: 1px solid $anx-primary-green !important;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:before {
    background-color: $anx-primary-green;
    border: none !important;
  }

  &:after {
    background: transparent !important;
  }

  &:visited {
    color: white;
    text-decoration: none;
  }

  &:hover {
    color: white !important;
    text-decoration: none;
  }
}
</style>
