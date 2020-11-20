<template>
  <a
    v-if="disabled === null"
    class="anx-link"
    @click="click()"
    :href="href"
    :target="newTab !== null ? '_blank' : '_self'"
  >
    <slot />
  </a>
  <span v-else :class="'anx-link disabled disabled-style-' + disabledStyle">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import Url from "url-parse";

@Component({})
export default class AnxLink extends Vue {
  /** If the link is active or not */
  @Prop({ default: null }) disabled!: boolean | null;
  /** This is the style for the disabled link (default, text) */
  @Prop({ default: "default" }) disabledStyle!: string;
  /** The link */
  @Prop({ default: "" }) href!: string;
  /** Declare the url as external. Vue Router won't be used */
  @Prop({ default: null }) external!: boolean | null;
  /** Open the link in a new tab */
  @Prop({ default: null }) newTab!: boolean | null;

  /** Emit the click event */
  @Emit("click")
  click() {
    return;
  }

  mounted() {
    /** Check if the vue router can/should be used */
    if (this.useVueRouter) {
      /** Add an event listener for the link */
      this.$el.addEventListener("click", event => {
        /** Prevent the default event for link */
        event.preventDefault();

        /** Only push to the new route if the link is different from the current location */
        if (this.isDifferentUrl) {
          /** Check if the url should be opened in a new tab */
          if (this.newTab !== null) {
            /** First resolve the url with router and then resolve the url with url-parser */
            const url = new Url(this.$router.resolve(this.href).href);
            window.open(url.href);
          } else {
            this.$router.push(this.href);
          }
        }
      });
    }
  }

  /**
   * Checks if the vue router can/should be used
   * - Router has to be defined (!= null)
   * - The url has to be internal
   * - The external property mustn't be set
   */
  private get useVueRouter() {
    return this.$router && this.isInternalUrl && this.external === null;
  }

  /** Checks if the provided url is internal */
  private get isInternalUrl() {
    const url = new Url(this.href);
    const currentUrl = new Url(window.location.href);

    return url.host == currentUrl.host;
  }

  /** Check if the provided url differs from the current url (window location) */
  private get isDifferentUrl() {
    const url = new Url(this.href);
    const currentUrl = new Url(window.location.href);

    return url.href !== currentUrl.href;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-link {
  color: $anx-primary-green;
  outline: none !important;
  text-decoration: none;

  &:hover {
    color: $anx-primary-green;
    cursor: pointer;
    border-bottom: 1px solid $anx-primary-green;
  }

  &.disabled {
    &.disabled-style-default {
      color: $anx-primary-white;
      border-bottom: 1px solid $anx-primary-green;
    }

    &.disabled-style-text {
      color: unset;
    }

    &:hover {
      cursor: unset;
    }
  }
}
</style>
