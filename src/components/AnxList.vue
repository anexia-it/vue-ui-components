<template>
  <ul
    :class="
      'anx-list ' +
        (noPadding !== null ? 'no-padding ' : '') +
        (icon !== null ? 'with-icon ' : '')
    "
    :style="listStyleType ? `list-style-type: ${listStyleType}; ` : ''"
  >
    <li v-for="(item, i) in items" :key="`${i}-${item}`">

        <slot name="icon">
          <anx-icon v-if="icon" class="anx-icon-list" :icon="icon" />
        </slot>
        <slot :name="`item${i}`">
               <span> {{ item }}    </span>
        </slot>
  
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxIcon from "./AnxIcon.vue";

@Component({
  components: {
    AnxIcon
  }
})
export default class AnxList extends Vue {
  /** The name of the icon if one should be set */
  @Prop({ default: null }) icon!: string;
  /** The items for the list */
  @Prop({ default: [] }) items!: Array<string>;
  /** List style type css property */
  @Prop({ default: null }) listStyleType!: string;
  /** No padding on the left side for the anx-list */
  @Prop({ default: null }) noPadding!: boolean;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-list {
  margin: 0px;

  &.no-padding {
    padding-left: 0px;
  }

  &.with-icon {
    list-style-type: none !important;

    .anx-icon-list {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }

    span {
      line-height: 15px;
      vertical-align: text-top;
    }
  }


}
</style>
