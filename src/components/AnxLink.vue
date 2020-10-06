<template>
  <a
    :class="'anx-link ' + (disabled ? 'disabled ' : '')"
    @click="click()"
    :href="disabled ? 'javascript:void(0)' : href"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";

@Component({})
export default class AnxLink extends Vue {
  /** If the link is active or not */
  @Prop({ default: null }) disabled!: boolean | null;
  /** The link */
  @Prop({ default: null }) href!: string | null;

  /** Emit the click event */
  @Emit("click")
  click() {
    return;
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
    color: $anx-primary-white;
    border-bottom: 1px solid $anx-primary-green;

    &:hover {
      color: $anx-primary-white;
      cursor: unset;
    }
  }
}
</style>
