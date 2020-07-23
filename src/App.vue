<template>
  <anx-global id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :img="require('@/assets/anexia.svg')" />
    <div class="space"></div>
    <anx-header :menus="items" />

    <anx-container>
      <anx-content title="test title">
        <anx-paragraph size="h1">
          This is a simple paragraph. Paragraphs are made for text. A paragraph
          can additionally have a title. This paragraph for example, does not
          have a title.<br /><br />
          You can simply use <strong>inline HTML</strong> and line breaks.<br />
          In general, there are three different sizes for AnxContent,
          AnxParagraph and AnxTitle:<br />
          <ul>
            <li>h1</li>
            <li>h2</li>
            <li>h3</li>
          </ul>
        </anx-paragraph>

        <anx-paragraph title="Size h2" size="h2">
          This is a paragraph with size H2 and its content
        </anx-paragraph>

        <anx-paragraph title="Size h3" size="h3">
          And this is the smallest paragraph
        </anx-paragraph>

        <anx-alert
          :show="showSuccessAlert"
          @dismiss="showSuccessAlert = !showSuccessAlert"
          type="success"
        >
          This is a success message
        </anx-alert>

        <anx-alert
          :show="showErrorAlert"
          @dismiss="showErrorAlert = !showErrorAlert"
          type="error"
        >
          This is an error message
        </anx-alert>

        <anx-paragraph hint>
          Hint: An AnxParagraph can also be set as hint. You just have to add
          the <strong>hint</strong> property to the component
        </anx-paragraph>
      </anx-content>

      <anx-content title="H2 Content" size="h2">
        <anx-paragraph>
          This is another content with size H2
        </anx-paragraph>

        <anx-card
          :img="require('@/assets/anexia.svg')"
          title="One card"
          link="#"
          link-text="more >"
        >
          This is the text of the card
        </anx-card>

        <anx-card
          :img="require('@/assets/anexia.svg')"
          title="And another card"
          link="#"
          link-text="more >"
        >
          And this ...<br />
          Is a <strong>multiline</strong> card with inline HTML
        </anx-card>
      </anx-content>

      <anx-content title="Some additional info" inverse>
        <anx-paragraph>
          If you don't want the white background, you can set the
          <strong>inverse</strong> property on the AnxContent component
        </anx-paragraph>
      </anx-content>
    </anx-container>

    <anx-footer />
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AnxHeader from "@/components/AnxHeader.vue";
import AnxFooter from "@/components/AnxFooter.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";
import AnxContainer from "@/components/AnxContainer.vue";
import AnxContent from "@/components/AnxContent.vue";
import AnxAlert from "@/components/AnxAlert.vue";
import AnxParagraph from "@/components/AnxParagraph.vue";
import AnxCard from "@/components/AnxCard.vue";

@Component({
  components: {
    AnxHeader,
    AnxFooter,
    AnxContainer,
    AnxContent,
    AnxAlert,
    AnxGlobal,
    AnxParagraph,
    AnxCard
  }
})
export default class App extends Vue {
  public items: Array<object> = [
    { menu: "Software", link: "/x" },
    { menu: "Hosting", link: "/y" }
  ];

  showSuccessAlert = true;
  showErrorAlert = true;
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";

.space {
  height: 20px;
}
</style>
