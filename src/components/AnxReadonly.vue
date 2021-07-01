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
        this.copy(this.$el.childNodes[0] as HTMLElement);
      });
    }
  }

  /** Select and copy the text of the area */
  public copy(elem: HTMLElement | null = null) {
    if (!elem) {
      elem = this.$el.childNodes[0] as HTMLElement;
    }

    // Select the text
    const range = document.createRange();
    range.selectNode(elem);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Try to copy the selected text
    try {
      document.execCommand("copy");
    } catch (e) {
      // Browser is unable to execute copy command
      return false;
    }

    return true;
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
