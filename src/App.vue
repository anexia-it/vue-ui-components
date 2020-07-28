<template>
  <anx-global id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :img="require('@/assets/anexia.svg')" />
    <div class="space"></div>
    <anx-header :menus="items" />

    <anx-container>
      <anx-modal v-if="exampleModal" title="test" @close="exampleModal = false">
        DAS ist ein TEst
      </anx-modal>
      <anx-button text="Modal" @submit="showModal" />
      <div class="spacing" style="margin-top:20px; margin-bottom: 20px"></div>

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

        <anx-alert v-model="showSuccessAlert" type="success">
          This is a success message
        </anx-alert>

        <anx-alert v-model="showErrorAlert" type="error">
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
          (images, inline html, ...).<br /><br />The images can be changed
          dynamically. This is demonstrated with an intervall of four seocnds.
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
            v-slot:[getImgCellName(i)]="{ content }"
          >
            <img :src="content" :key="i" />
          </template>
        </anx-table>
      </anx-content>

      <anx-content title="Form components" size="h2">
        <anx-paragraph size="h3">
          Every input has to be inside an <i>&lt;anx-form&gt;</i> tag. The
          <i>&lt;anx-form&gt;</i> handles additional validation on submit. If
          all input fields are valid. The <strong>submit</strong> event is being
          emitted.<br /><br /><i>&lt;anx-form&gt;</i> also offers to render a
          submit button. The submit button has to be provided as object. The
          button dynamically changes from disabled to not disabled, whether the
          input is valid or not.<br /><br />The validation rules itself have to
          be set at the input fields. See <i>&lt;anx-input&gt;</i> for an
          example.
        </anx-paragraph>
        <anx-form
          @submit="submitForm"
          name="ip-form"
          :submit-button="{ text: 'Send >' }"
        >
          <anx-input
            name="ip"
            label="IP address"
            assistive-text="Enter your local ip address"
            v-model="ip"
            rules="required|ip"
          />

          <anx-paragraph size="h3">
            <i>&lt;anx-checkbox&gt;</i> can have a validation-provider.<br />
            First example with validation (default rule: required true), and the
            second without validation.
          </anx-paragraph>

          <anx-checkbox name="Checkbox" validation="true" />
          <anx-checkbox name="Checkbox" />

          <anx-read-only bold>
            This is a simple AnxReadOnly component with bold text. Click me to
            copy the text!
          </anx-read-only>

          <anx-read-only :copy-on-click="false">
            The following AnxReadOnly component is not bold and the text cannot
            be copied.<br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            convallis turpis a elit imperdiet pellentesque in ac tortor.
            Pellentesque non massa eget diam porta scelerisque quis vitae lacus.
            Nam id orci ut enim tempus porta. Nunc nec mi nulla. Praesent et
            semper mi. Integer dignissim diam dictum dui ultricies, vitae
            facilisis ante rhoncus. Sed euismod sapien at cursus tristique.<br /><br />
            Fusce ut tristique augue, vitae blandit sapien. Donec turpis leo,
            interdum at blandit sit amet, vehicula eget turpis. Donec rhoncus
            porta hendrerit. Etiam at ultrices eros. Pellentesque dictum purus
            at odio venenatis, eu malesuada lorem convallis. In quis massa eros.
            Praesent vitae velit vitae lectus dapibus vestibulum a quis leo.
          </anx-read-only>

          <anx-paragraph size="h3">
            <i>&lt;anx-select&gt;</i> can have a specific width (default 100%)
            and hava a prop for the item-list (array).
          </anx-paragraph>
          <anx-select width="100%" />
          <anx-select width="100%" validation="true" />

          <anx-paragraph size="h3">
            <i>&lt;anx-textarea&gt;</i> can have a specific width (default
            100%), rows (default 4) and a lable. It can only be resize.
          </anx-paragraph>

          <anx-textarea width="100%" />
          <anx-paragraph size="h3">
            This anx-textarea have a validation with the default rule required.
            The rule can be changed.
          </anx-paragraph>
          <anx-textarea width="100%" validation="true" />
        </anx-form>
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
import AnxInput from "@/components/AnxInput.vue";
import AnxButton from "@/components/AnxButton.vue";
import AnxReadOnly from "@/components/AnxReadOnly.vue";
import AnxTable from "@/components/AnxTable.vue";
import AnxTableRow from "@/components/AnxTableRow.vue";
import AnxModal from "@/components/AnxModal.vue";
import AnxForm from "@/components/AnxForm.vue";
import AnxCheckbox from "@/components/AnxCheckbox.vue";
import AnxSelect from "@/components/AnxSelect.vue";
import AnxTextarea from "@/components/AnxTextarea.vue";

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
    AnxTableRow,
    AnxModal,
    AnxForm,
    AnxCheckbox,
    AnxSelect,
    AnxTextarea
  }
})
export default class App extends Vue {
  public items: Array<object> = [
    { menu: "Software", link: "/x/" },
    { menu: "Hosting", link: "/y/" }
  ];

  ip = "";
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
    {
      age: 40,
      firstName: "Dickerson",
      lastName: "Macdonald",
      image: require("@/assets/anexia.svg")
    },
    {
      age: 21,
      firstName: "Larsen",
      lastName: "Shaw",
      image: require("@/assets/anexia.svg")
    },
    {
      age: 89,
      firstName: "Geneva",
      lastName: "Wilson",
      image: require("@/assets/anexia.svg")
    },
    {
      age: 38,
      firstName: "Jami",
      lastName: "Carney",
      image: require("@/assets/anexia.svg")
    },
    {
      age: 40,
      firstName: "Dickerson",
      lastName: "Macdonald",
      image: require("@/assets/anexia.svg")
    },
    {
      age: 21,
      firstName: "Larsen",
      lastName: "Shaw",
      image: require("@/assets/anexia.svg")
    }
  ];

  private mounted() {
    /** This code demonstrates, that the images can be changed dynamically */
    this.seedTableImages();
    window.setInterval(() => {
      this.seedTableImages();
    }, 4000);
  }

  /** Change the images for the second table randomly */
  private seedTableImages() {
    this.secondTableItems.forEach(object => {
      if (Math.random() <= 0.5) {
        object.image = require("@/assets/anexia.svg");
      } else {
        object.image = require("@/assets/check-green.svg");
      }
    });
  }

  /** Return the name of the cell for image with an specific index */
  private getImgCellName(index: string) {
    return "image" + index;
  }

  /*example Modal */
  private exampleModal = false;

  private showModal() {
    this.exampleModal = true;
  }

  /** Show an alert when the form has been submitted */
  private submitForm() {
    alert(`Form has been submitted and the entered ip is: ${this.ip}`);
  }
}
</script>
<style lang="scss">
.space {
  height: 20px;
}
</style>
