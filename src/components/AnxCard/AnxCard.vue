<template>
  <div class="anx-card">
    <div class="anx-card-content d-flex">
      <anx-icon v-if="icon != null" class="anx-card-icon" :icon="icon" />
      <img
        v-else-if="image != null"
        class="anx-card-icon"
        :src="image"
        alt="Card icon"
      />
      <anx-paragraph :title="title" size="h3">
        <!-- @slot The text to be displayed in the card -->
        <slot />
        <br v-if="linkText" />
        <anx-link v-if="linkText" :href="link"> {{ linkText }}</anx-link>
      </anx-paragraph>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxLink from "../AnxLink/AnxLink.vue";
import AnxIcon from "../AnxIcon/AnxIcon.vue";
import AnxParagraph from "../AnxParagraph/AnxParagraph.vue";

/**
 * The *anx-card* is a special layout used on websites of Anexia.
 * It contains an icon, a header, a link and some text.
 */
@Component({
  components: {
    AnxLink,
    AnxIcon,
    AnxParagraph
  }
})
export default class Card extends Vue {
  /** This is the header for the card */
  @Prop() title!: string;

  /** This is the text for the link */
  @Prop({ default: null }) linkText!: string | null;

  /** This is the link for the card */
  @Prop({ default: "#" }) link!: string;

  /**
   * This is the icon of the card.
   * A *anx-icon* component is used to parse the string.
   */
  @Prop({ default: null }) icon!: string | null;

  /**
   * If no icon is provided, an image will be rendered as fallback.
   * The image property shoudl contain a link to the image resource.
   */
  @Prop({ default: null }) image!: string | null;
}
</script>

<style lang="scss">
@import "../../assets/scss/_variables.scss";

.anx-card {
  margin-bottom: 20px;
  border-radius: 0px !important;
  border: 1px solid $anx-primary-grey-light;

  .anx-card-content {
    padding: 0 20px 0 20px;
    margin: 20px 0;

    .anx-card-icon {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 20px;
      height: 80px;
      min-height: 80px;
      width: 80px;
      min-width: 80px;
      @media screen and (max-width: 500px) {
        display: none;
        margin-right: 0;
      }
    }

    .anx-paragraph {
      margin-bottom: 0;

      a {
        text-transform: uppercase;
      }
    }
  }
}
</style>
