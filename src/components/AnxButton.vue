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
  @Prop({ default: "submit" }) btnType!: string;
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
button {
  cursor: pointer;
  width: var(--button-width);
  height: 2.5em; //40px
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
}

/* anx-button - super cool animation button */
/***/
.anx-button {
  z-index: 100;
  position: relative;
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
    -webkit-backface-visibility: hidden;
    transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &:before {
    border: 1px solid #77bc1f;
    opacity: 0;
    -webkit-transform: scale3d(1.2, 1.2, 1);
    transform: scale3d(1.2, 1.2, 1);
  }

  &:after {
    background: #77bc1f;
  }

  &:visited {
    color: #77bc1f;
    text-decoration: none;
  }

  &:hover {
    color: #77bc1f;
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

/*btn-outline*/
.btn-outline {
  color: #77bc1f !important;
  border: 1px solid #77bc1f !important;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:before {
    background-color: #77bc1f;
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
