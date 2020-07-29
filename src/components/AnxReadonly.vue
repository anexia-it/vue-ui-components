<template>
  <div id="testanx" class="anx-readonly" @click="copy($event)">
    <div :class="'inner-text ' + (bold !== null ? 'bold ' : '')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxReadonly extends Vue {
  /** This is the id of the alert */
  @Prop({ default: "anx-alert" }) name!: string;

  /** Should the text be selcted and copied to the clipboard on click? */
  @Prop({ default: null }) copyOnClick!: boolean;

  /** Should the text be bold? */
  @Prop({ default: null }) bold!: boolean;

  /** Select and copy the text of the area */
  private copy(event: Event) {
    if (this.copyOnClick !== null) {
      const range = document.createRange();
      range.selectNode(event.target as HTMLElement);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      document.execCommand("copy");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-readonly {
  background-color: $anx-table-row-background;
  border: 1px solid $anx-primary-grey-light;
  margin: 30px 0;
  width: 100%;

  .inner-text {
    line-height: 16px;
    padding: 16px;
    color: $anx-lightest-grey-dark;

    &.bold {
      font-weight: 800;
    }
  }
}
</style>
