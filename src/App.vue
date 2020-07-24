<template>
  <anx-global id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :img="require('@/assets/anexia.svg')" />
    <div class="space"></div>
    <anx-header :menus="items" />

    <anx-container>
      <anx-content title="Simple styling">
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
          And this is the smallest paragraph<br /><br />
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

      <anx-content title="Tables" size="h2">
        <anx-paragraph title="Simple table" size="h3">
          The table below is a very simple table to demonstrate, how less code
          you need to implement such a table.
        </anx-paragraph>

        <anx-table :items="tableItems" hover />

        <anx-paragraph title="Complex table" size="h3">
          The following table is a little bit more complex.<br /><br />
          This table has <strong>stripped</strong>, <strong>bordered</strong>,
          <strong>hover</strong>, <strong>uppercase-title</strong> and
          <strong>scrollable</strong> properties. This properties change the
          design of the table. In this case, the table is also limited to a size
          of 200 px. The first column is limited to a width of 50px.<br /><br />It
          is also possible, to render inline html in the different cells.
          Therefore, named slots are used. The name of the slot is as follows:
          <strong>$columnname$rowIndex</strong>. E.g. age0 for first row and the
          column with the ages. Inside this slot you can add whatever you want
          (images, inline html, ...)
        </anx-paragraph>

        <anx-table
          stripped
          hover
          bordered
          scrollable
          uppercase-title
          height="200px"
          :items="secondTableItems"
          :widths="{ age: '50px' }"
        >
          <!-- This is an example for replacing content. In this case we change the styling for a specific cell -->
          <template v-slot:firstName2="{ content }">
            <span style="color: #003CA6">
              <strong>
                {{ content }}
              </strong>
            </span>
          </template>

          <!-- Replace all cells with images with an image -->
          <template
            v-for="(item, i) in secondTableItems"
            v-slot:[getImgCellName(i)]
          >
            <img :src="require('@/assets/anexia.svg')" :key="i" />
          </template>
        </anx-table>
      </anx-content>

      <anx-content title="Form components" size="h2">
        <anx-input
          name="name"
          translate="Name"
          assistive-text="Here you can display some help for the user"
        >
        </anx-input>

        <anx-read-only bold>
          This is a simple AnxReadOnly component with bold text. Click me to
          copy the text!
        </anx-read-only>

        <anx-read-only :copy-on-click="false">
          The following AnxReadOnly component is not bold and the text cannot be
          copied.<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          convallis turpis a elit imperdiet pellentesque in ac tortor.
          Pellentesque non massa eget diam porta scelerisque quis vitae lacus.
          Nam id orci ut enim tempus porta. Nunc nec mi nulla. Praesent et
          semper mi. Integer dignissim diam dictum dui ultricies, vitae
          facilisis ante rhoncus. Sed euismod sapien at cursus tristique.<br /><br />
          Fusce ut tristique augue, vitae blandit sapien. Donec turpis leo,
          interdum at blandit sit amet, vehicula eget turpis. Donec rhoncus
          porta hendrerit. Etiam at ultrices eros. Pellentesque dictum purus at
          odio venenatis, eu malesuada lorem convallis. In quis massa eros.
          Praesent vitae velit vitae lectus dapibus vestibulum a quis leo.
        </anx-read-only>
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
import AnxInput from "@/components/AnxInputField.vue";
import AnxButton from "@/components/AnxButton.vue";
import AnxReadOnly from "@/components/AnxReadOnly.vue";
import AnxTable from "@/components/AnxTable.vue";
import AnxTableRow from "@/components/AnxTableRow.vue";

@Component({
  components: {
    AnxHeader,
    AnxFooter,
    AnxContainer,
    AnxContent,
    AnxAlert,
    AnxGlobal,
    AnxParagraph,
    AnxCard,
    AnxInput,
    AnxReadOnly,
    AnxButton,
    AnxTable,
    AnxTableRow
  }
})
export default class App extends Vue {
  public items: Array<object> = [
    { menu: "Software", link: "/x" },
    { menu: "Hosting", link: "/y" }
  ];

  showSuccessAlert = true;
  showErrorAlert = true;

  tableItems = [
    { age: 40, firstName: "Dickerson", lastName: "Macdonald" },
    { age: 21, firstName: "Larsen", lastName: "Shaw" },
    { age: 89, firstName: "Geneva", lastName: "Wilson" },
    { age: 38, firstName: "Jami", lastName: "Carney" },
    { age: 40, firstName: "Dickerson", lastName: "Macdonald" },
    { age: 21, firstName: "Larsen", lastName: "Shaw" }
  ];

  secondTableItems = [
    { age: 40, firstName: "Dickerson", lastName: "Macdonald", image: "" },
    { age: 21, firstName: "Larsen", lastName: "Shaw", image: "" },
    { age: 89, firstName: "Geneva", lastName: "Wilson", image: "" },
    { age: 38, firstName: "Jami", lastName: "Carney", image: "" },
    { age: 40, firstName: "Dickerson", lastName: "Macdonald", image: "" },
    { age: 21, firstName: "Larsen", lastName: "Shaw", image: "" }
  ];

  private getImgCellName(index: string) {
    return "image" + index;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";

.space {
  height: 20px;
}
</style>
