<template>
  <div :id="name" class="anx-readonly">
    <div :class="'inner-text ' + (bold !== null ? 'bold ' : '')">
      <!-- @slot Use this slot for your content -->
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * This component can be used to display some text in read-only format.
 * It has special styles and differs from a input field with readonly attribute.
 */
@Component({})
export default class AnxReadonly extends Vue {
  /** This is the name of the readonly and will also be used as id */
  @Prop({ default: "anx-readonly" }) name!: string;

  /** If this attribute is set, the text will be selected and copied when a user clicks on it */
  @Prop({ default: null }) copyOnClick!: boolean | null;

  /** Display the text in bold */
  @Prop({ default: null }) bold!: boolean | null;

  /** Mount function */
  private mounted() {
    /** Init the copy event if necessary */
    if (this.copyOnClick !== null) {
      this.$el.addEventListener("click", () => {
        this.copy(this.$el as HTMLElement);
      });
    }
  }

  /** Select and copy the text of the area */
  private copy(elem: HTMLElement) {
    const range = document.createRange();
    range.selectNode(elem);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand("copy");
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
  word-break: break-word;

  .inner-text {
    line-height: 1.5em;
    padding: 16px;
    color: $anx-lightest-grey-dark;

    &.bold {
      font-weight: 800;
    }
  }
}
</style>
