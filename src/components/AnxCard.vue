<template>
  <div class="anx-card">
    <div class="anx-card-content d-flex">
      <img :src="img" />
      <anx-paragraph :title="title" size="h3">
        <p>
          <slot />
        </p>
        <anx-link v-if="linkText" :href="link"> {{ linkText }}</anx-link>
      </anx-paragraph>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxLink from "./AnxLink.vue";
import AnxParagraph from "./AnxParagraph.vue";

@Component({
  components: {
    AnxLink,
    AnxParagraph
  }
})
export default class Card extends Vue {
  /** This is the header for the card */
  @Prop() title!: string;

  /** This is the text for the link */
  @Prop({ default: null }) linkText!: string;

  /** This is the link for the card */
  @Prop({ default: "#" }) link!: string;

  /** The image of the card */
  @Prop({ default: null }) img!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-card {
  margin-bottom: 20px;
  border-radius: 0px !important;
  border: 1px solid $anx-primary-grey-light;

  .anx-card-content {
    padding: 0 20px 0 20px;
    margin-top: 24px;
    margin-bottom: 17px;
    img {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 20px;
      height: 80px;
      width: 80px;
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
