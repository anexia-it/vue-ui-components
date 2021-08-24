<template>
  <a
    v-if="disabled === null"
    :class="{ 'anx-link': true, 'no-style': noStyle !== null }"
    @click="click($event)"
    :href="href"
    :target="newTab !== null ? '_blank' : '_self'"
  >
    <!-- @slot Use this slot for the link text -->
    <slot>{{ text }}</slot>
  </a>
  <span
    v-else
    :class="
      'anx-link disabled disabled-style-' +
        disabledStyle +
        (noStyle != null ? ' no-style' : '')
    "
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";

/**
 * A simple link with VueRouter integrated
 */
@Component({})
export default class AnxLink extends Vue {
  /** Require the url module (import can't be used because it does not have @types) */
  Url = require("url-parse");

  /** If the link is active or not */
  @Prop({ default: null }) disabled!: boolean | null;
  /** This is the style for the disabled link (default, text) */
  @Prop({ default: "default" }) disabledStyle!: string;
  /** The link */
  @Prop({ default: "" }) href!: string;
  /** If the route name is defined, the href parameter will be ignored and Vue-Router will push to the named route */
  @Prop({ default: null }) routeName!: string | null;
  /** Declare the url as external. Vue Router won't be used */
  @Prop({ default: null }) external!: boolean | null;
  /** Open the link in a new tab */
  @Prop({ default: null }) newTab!: boolean | null;
  /**
   * Disable any style for the anx-link (can be used if the component, the anx-link
   * is wrapped around already has its own design; e.g. image)
   */
  @Prop({ default: null }) noStyle!: boolean | null;
  /** This is the text of the link. This can be used instead of the slot */
  @Prop({ default: "" }) text!: string;

  /** Emit the click event */
  @Emit("click")
  click(event: MouseEvent) {
    /** Check if the vue router can/should be used */
    if (this.useVueRouter) {
      /** Prevent the default event for link */
      event.preventDefault();

      /** If a route name is defined, use it instead of the href */
      if (this.routeName && this.$route) {
        /** If the window should be opened in a new tab, this is done independent from the route name */
        if (this.newTab !== null) {
          /** Logic to open link in new tab by route name */
          const url = new this.Url(
            this.$router.resolve({
              name: this.routeName
            }).href
          );
          window.open(url.href);
          /** If the window should be opened in the same window, this is only done if the current route name and the provided route name differ */
        } else {
          if (this.$route.name !== this.routeName && this.newTab === null) {
            this.$router.push({ name: this.routeName });
          }
        }
      } else {
        /** Only push to the new route if the link is different from the current location */
        /** Check if the url should be opened in a new tab */
        if (this.newTab !== null) {
          /** If the url is internal, the href has to be parsed first to get the pathname that is then parsed with the vue router */
          const pathname = new this.Url(this.href).pathname;
          const url = new this.Url(this.$router.resolve(pathname).href);
          window.open(url.href);
        } else {
          if (this.isDifferentUrl) {
            /** Parse the url first to get the path name (in case a full href with hostname is provided) */
            const url = new this.Url(this.href);
            this.$router.push(url.pathname + url.hash);
          }
        }
      }
    }

    return;
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
    const url = new this.Url(this.href);
    const currentUrl = new this.Url(window.location.href);

    return url.host == currentUrl.host;
  }

  /** Check if the provided url differs from the current url (window location) */
  private get isDifferentUrl() {
    const url = new this.Url(this.href);
    const currentUrl = new this.Url(window.location.href);

    return url.href !== currentUrl.href;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-link {
  color: $anx-secondary-color;
  outline: none !important;
  text-decoration: none;

  &:hover {
    color: $anx-secondary-color;
    cursor: pointer;
    border-bottom: 1px solid $anx-secondary-color;
  }

  &.disabled {
    &.disabled-style-default {
      color: $anx-primary-white;
      border-bottom: 1px solid $anx-secondary-color;
    }

    &.disabled-style-text {
      color: unset;
    }

    &:hover {
      cursor: unset;
    }
  }

  &.no-style {
    border-bottom: unset !important;
    color: unset !important;
  }
}
</style>
