<template>
  <anx-global id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :i18n="$i18n">
      <template v-slot:icon>
        <img
          alt="anx-header-logo"
          v-bind:src="require('./assets/img/anexia-logo.svg')"
        />
      </template>
    </anx-header>
    <div class="space"></div>
    <anx-header
      :menus="items"
      :i18n="$i18n"
      @localeChange="localeChange($event)"
    />

    <anx-container>
      <anx-content inverse first>
        <anx-paragraph>
          You can make a first element of <i>&lt;anx-content&gt;</i> for
          additional infos to begin of the application.
        </anx-paragraph>
      </anx-content>

      <anx-content title="Simple styling">
        <anx-paragraph size="h1">
          This is a simple paragraph. Paragraphs are made for text. A paragraph
          can additionally have a title. This paragraph for example, does not
          have a title.<br /><br />
          You can simply use <strong>inline HTML</strong> and line breaks or
          <span class="attention">formatted texts</span>.<br />
          In general, there are three different sizes for AnxContent,
          AnxParagraph and AnxTitle:<br />

          <br />

          <anx-list :items="['h1', 'h2', 'h3']" icon="check-green" no-padding />

          <br />

          The <strong>&lt;anx-list&gt;</strong> can have the properties
          <strong>icon</strong>, <strong>no-padding</strong> and
          <strong>list-style-type</strong>. The are very self-descriptive.<br />

          <br />

          <anx-list
            :items="['test', 'zwei', 'drei']"
            list-style-type="decimal"
            no-spacing
          />

          <br />
          <span class="f-100">Lorem ipsum dolor sit (weight 100)</span><br />
          <span class="f-200">Lorem ipsum dolor sit (weight 200)</span><br />
          <span class="f-300">Lorem ipsum dolor sit (weight 300)</span><br />
          <span class="f-400">Lorem ipsum dolor sit (weight 400)</span><br />
          <span class="f-500">Lorem ipsum dolor sit (weight 500)</span><br />
          <span class="f-600">Lorem ipsum dolor sit (weight 600)</span><br />
          <span class="f-700">Lorem ipsum dolor sit (weight 700)</span><br />
          <span class="f-800">Lorem ipsum dolor sit (weight 800)</span><br />
          <span class="f-900">Lorem ipsum dolor sit (weight 900)</span><br />

          <anx-hr-line />
        </anx-paragraph>

        <anx-paragraph title="Size h2" size="h2">
          This is a paragraph with size H2 and its content
        </anx-paragraph>

        <anx-paragraph title="Size h2 noline" size="h2" noline>
          This is a paragraph with size H2 and its content.
          <br />The line is now by all h in <i>&lt;anx-paragraph&gt;</i>
          <b> optional</b> (set noline).
        </anx-paragraph>

        <anx-paragraph title="Size h3 noline" size="h3" noline>
          This is a paragraph with size H3 and its content.
          <br />The line is now by all h in <i>&lt;anx-paragraph&gt;</i>
          <b> optional</b> (set noline).
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

        <anx-alert
          v-model="showSuccessAlertAutoClose"
          type="success"
          auto-close
          :auto-close-timeout="5000"
        >
          This is a auto closable alert.<br />
          This alert will automatically be dismissed after
          <strong>5</strong> seconds.
        </anx-alert>

        <anx-paragraph hint>
          Hint: An AnxParagraph can also be set as hint. You just have to add
          the <strong>hint</strong> property to the component
        </anx-paragraph>
      </anx-content>

      <anx-content title="Icons" size="h2">
        <anx-paragraph>
          You can easily include anexia icons in your design using the
          <i>&lt;anx-icon&gt;</i> component. All icons are located in
          /src/assets/icons and are rendered automatically on build and
          registered as plugin. You just have to pass the icon name as
          <strong>icon</strong> property to the
          <i>&lt;anx-icon&gt;</i> component. You can additionally set a
          different width, height and margin for the icons.<br /><br />In
          addition to this, you can also use a the individual icon component
          itself. You can also use <i>&lt;anx-icon-dokument&gt;</i> to render an
          icon.
        </anx-paragraph>
        <anx-icon
          v-for="icon in AnxIcons"
          :key="icon"
          :icon="icon"
          width="50px"
          margin="20px"
        ></anx-icon>
        <br />
        <anx-icon width="30px" margin="20px" />
        <anx-icon-alexa width="50px" margin="20px" />
        <anx-icon-3d width="80px" margin="20px" />
      </anx-content>

      <anx-content title="Tables" size="h2">
        <anx-paragraph title="Simple table" size="h3">
          The table below is a very simple table to demonstrate, how less code
          you need to implement such a table.
        </anx-paragraph>

        <anx-form>
          <anx-checkbox
            v-model="tableOptions.bordered"
            @input="tableOptions.bordered = $event.checked ? true : null"
            name="bordered"
          />
          <anx-checkbox
            v-model="tableOptions.borderless"
            @input="tableOptions.borderless = $event.checked ? true : null"
            name="borderless"
          />
          <anx-checkbox
            v-model="tableOptions.stripped"
            @input="tableOptions.stripped = $event.checked ? true : null"
            name="stripped"
          />
          <anx-checkbox
            v-model="tableOptions.hover"
            @input="tableOptions.hover = $event.checked ? true : null"
            name="hover"
          />
          <anx-checkbox
            v-model="tableOptions.noHeader"
            @input="tableOptions.noHeader = $event.checked ? true : null"
            name="no-header"
          />
        </anx-form>

        <anx-table
          :columns="[
            { name: 'Alter', index: 'age', width: '50px' },
            { name: 'First name', index: 'lastName' },
            { name: 'Last name', index: 'firstName' }
          ]"
          :items="tableItems"
          :bordered="tableOptions.bordered"
          :borderless="tableOptions.borderless"
          :stripped="tableOptions.stripped"
          :hover="tableOptions.hover"
          :noHeader="tableOptions.noHeader"
        />

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
          :items="tableItems"
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
            v-for="(item, i) in tableItems"
            v-slot:[getImgCellName(i)]="{ content }"
          >
            <anx-icon :icon="content" :key="i" width="25px" />
          </template>
        </anx-table>
      </anx-content>

      <anx-content title="Form components" size="h2">
        <!-- Anx Modal -->
        <anx-paragraph size="h3" title="anx-modal">
          This is an example for a <i>&lt;anx-modal&gt;</i>. Just click the
          button and the modal will appear.<br /><br />

          <anx-modal
            v-if="exampleModal"
            title="AnxModal"
            @close="exampleModal = false"
          >
            This is an example <i>&lt;anx-modal&gt;</i>.
          </anx-modal>
          <anx-button
            text="Show Modal >"
            @click="exampleModal = true"
            width="212px"
            btnType="click"
          />
        </anx-paragraph>
        <anx-paragraph>
          This is a example for a button with a longer text. The width can be
          set manually. This is also a example for a <i>confirmation AnxModal</i
          ><br /><br />
          <anx-modal
            confirm="true"
            v-if="exampleConfirmationModal"
            title="Confirmation"
            @close="exampleConfirmationModal = false"
            @confirm="exampleConfirmationModal = false"
          >
            This is an example for a confirmation
            <i>&lt;anx-modal&gt;</i>.<br />
            It will send two events, which can be catched: confirm and close.
          </anx-modal>
          <anx-button
            text="Show Confirmation Modal >"
            width="300px"
            btnType="click"
            @click="exampleConfirmationModal = true"
          />
        </anx-paragraph>

        <!-- Anx Read Only -->
        <anx-paragraph size="h3" title="anx-readonly">
          The <i>&lt;anx-readonly&gt;</i> differs from the
          <i>&lt;anx-input-field&gt;</i> in its design. The purpose of a
          <i>&lt;anx-readonly&gt;</i> is to display some text, that should not
          be modified and can easily be copied. You just have to add the
          <strong>copy-on-click</strong> property to the
          <i>&lt;anx-readonly&gt;</i> element. The first element is copyable on
          click.<br />
          <anx-readonly bold copy-on-click>
            This is a simple <i>&lt;anx-readonly&gt;</i> component with bold
            text. Click me to copy the text!
          </anx-readonly>

          <anx-readonly>
            The following <i>&lt;anx-readonly&gt;</i> component is not bold and
            the text cannot be copied.<br /><br />
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
          </anx-readonly>
        </anx-paragraph>

        <anx-paragraph size="h2" title="Input components (Anx-Form)">
          Every input has to be inside an <i>&lt;anx-form&gt;</i> tag. The
          <i>&lt;anx-form&gt;</i> handles additional validation on submit. If
          all input fields are valid. The <strong>submit</strong> event is being
          emitted.<br /><br /><i>&lt;anx-form&gt;</i> also offers to render a
          submit button. The submit button has to be provided as object. The
          button can dynamically change from disabled to not disabled, whether
          the input is valid or not.<br /><br />
        </anx-paragraph>

        <anx-form
          @submit="submitForm"
          name="ip-form"
          :submit-button="{ text: 'Send >', disabled: false }"
        >
          <anx-paragraph size="h3" title="anx-input">
            The validation rules itself have to be set at the input fields. This
            <i>&lt;anx-input&gt;</i> is an example for how to use rules to
            validate an user input.<br /><br /><i>&lt;anx-input&gt;</i> has
            severl properties to change the label text, the assistive text, ...
            (see AnxInput.vue Props). The value of the
            <i>&lt;anx-input&gt;</i> can easily be fetched using
            <strong>v-model</strong>. The variable in v-model will automatically
            be updated on an input event. You don't have to care about updating
            anything.<br /><br />In this case you have to enter a
            <strong>valid</strong> IP address.
          </anx-paragraph>
          <anx-input
            name="ip"
            label="IP address"
            assistive-text="Enter your local ip address"
            v-model="ip"
            rules="required|ip"
          />

          <anx-paragraph size="h3">
            <i>&lt;anx-input&gt;</i> without validation but with animation.
          </anx-paragraph>
          <anx-input name="mail" label="Mail" v-model="mail" rules="email" />

          <anx-paragraph size="h3">
            <i>&lt;anx-input&gt;</i> can also be set to
            <strong>readonly</strong> by providing the <i>readonly</i> property.
            In this example, the value is binded to the ip field. The readonly
            input-field has no validation!
          </anx-paragraph>
          <anx-input
            name="ip-readonly"
            label="IP ReadOnly"
            readonly
            :value="ip"
          />

          <anx-paragraph size="h3" title="anx-checkbox">
            <i>&lt;anx-checkbox&gt;</i> can have a validation-provider.<br />
            First example with validation (default rule: required true), and the
            second without validation.
          </anx-paragraph>

          <anx-checkbox
            name="Required Checkbox"
            validation="true"
            v-model="checkbox[0]"
          />
          <anx-checkbox name="Checkbox" v-model="checkbox[1]" />
          <anx-checkbox
            name="Checkbox"
            v-model="checkbox[1]"
            :checkedBool="true"
          />
          <anx-paragraph size="h3" title="anx-select">
            <i>&lt;anx-select&gt;</i> can have a specific width (default 100%)
            and hava a prop for the options (array&lt;{value: string, text:
            string}&gt;). Also the anx-select can be validated!
          </anx-paragraph>
          <anx-select width="100%" v-model="selected1" />
          <anx-select
            width="100%"
            id="anx-select"
            validation="true"
            v-model="selected2"
            label="Auswahl treffen required"
          />

          <anx-paragraph size="h3" title="anx-textarea">
            <i>&lt;anx-textarea&gt;</i> can have a specific width (default
            100%), rows (default 4) and a label. It can also be resized.
          </anx-paragraph>

          <anx-textarea width="100%" v-model="text1" />
          <anx-paragraph size="h3">
            This <i>&lt;anx-textarea&gt;</i> has a validation with the default
            rule required. The rule can be changed.
          </anx-paragraph>
          <anx-textarea width="100%" validation="true" v-model="text2" />

          <anx-modal
            v-if="formModal"
            title="Form submit"
            @close="formModal = false"
          >
            <strong>IP: </strong> {{ this.ip }}<br />
            <strong>Select 1: </strong> {{ this.selected1 }}<br />
            <strong>Select 2: </strong> {{ this.selected2 }}<br />
            <strong>Addtiional Text 1: </strong> {{ this.text1 }}<br />
            <strong>Addtiional Text 2: </strong> {{ this.text2 }}<br />
          </anx-modal>
        </anx-form>
      </anx-content>

      <anx-content title="Cards" size="h2">
        <anx-paragraph>
          This <i>&lt;anx-content&gt;</i> is iszed <strong>H2</strong>. The
          title is smaller than the title of the first
          <i>&lt;anx-content&gt;</i>.<br /><br />
          Below this paragraph are two examples for <i>&lt;anx-card&gt;</i>.
        </anx-paragraph>

        <anx-card icon="anexia" title="One card" link="#" link-text="more >">
          This is the text of the card
        </anx-card>

        <anx-card
          icon="dokument"
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

        <anx-paragraph
          inverse
          noline
          no-margin-title
          title="Special Paragraph"
          size="h2"
        >
          This is an <strong>inverse</strong> paragraph. This means that the
          color of the title is inversed.<br />
          This paragraph also has the properties <strong>noline</strong> and
          <strong>no-margin-title</strong>.
        </anx-paragraph>
      </anx-content>
    </anx-container>

    <anx-footer
      :links="[
        { text: 'Impressum', link: '#' },
        { text: 'AGB', link: '#' }
      ]"
    >
      <template v-slot:icon>
        <img
          class="anx-logo-footer"
          alt="anx-logo-footer"
          v-bind:src="require('./assets/img/anexia-logo.svg')"
          width="56px"
          height="23px"
        />
      </template>
    </anx-footer>
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AnxIconsNames } from "@/icons";
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
import AnxReadonly from "@/components/AnxReadonly.vue";
import AnxTable from "@/components/AnxTable.vue";
import AnxTableRow from "@/components/AnxTableRow.vue";
import AnxModal from "@/components/AnxModal.vue";
import AnxForm from "@/components/AnxForm.vue";
import AnxCheckbox from "@/components/AnxCheckbox.vue";
import AnxSelect from "@/components/AnxSelect.vue";
import AnxTextarea from "@/components/AnxTextarea.vue";
import AnxIcon from "@/components/AnxIcon.vue";
import AnxHrLine from "@/components/AnxHrLine.vue";
import AnxList from "@/components/AnxList.vue";

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
    AnxReadonly,
    AnxButton,
    AnxTable,
    AnxTableRow,
    AnxModal,
    AnxForm,
    AnxCheckbox,
    AnxSelect,
    AnxTextarea,
    AnxIcon,
    AnxHrLine,
    AnxList
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
  showSuccessAlertAutoClose = true;
  selected1 = "";
  selected2 = "";
  text1 = "";
  text2 = "";
  checkbox = [];
  mail = "";

  private tableOptions: {
    bordered: boolean | null;
    borderless: boolean | null;
    stripped: boolean | null;
    hover: boolean | null;
    noHeader: boolean | null;
  } = {
    bordered: null,
    borderless: null,
    stripped: null,
    hover: null,
    noHeader: null
  };

  tableItems = [
    {
      age: 40,
      firstName: "Dickerson",
      lastName: "Macdonald",
      image: "anexia"
    },
    {
      age: 21,
      firstName: "Larsen",
      lastName: "Shaw",
      image: "anexia"
    },
    {
      age: 89,
      firstName: "Geneva",
      lastName: "Wilson",
      image: "anexia"
    },
    {
      age: 38,
      firstName: "Jami",
      lastName: "Carney",
      image: "anexia"
    },
    {
      age: 40,
      firstName: "Dickerson",
      lastName: "Macdonald",
      image: "anexia"
    },
    {
      age: 21,
      firstName: "Larsen",
      lastName: "Shaw",
      image: "anexia"
    }
  ];

  /** This is a demo function to demonstrate how to use the @localeChange event of the AnxHeader */
  private localeChange(locale: string): void {
    alert(`locale changed to "${locale}"`);
  }

  private mounted() {
    /** This code demonstrates, that the images can be changed dynamically */
    this.seedTableImages();
    window.setInterval(() => {
      this.seedTableImages();
    }, 4000);
  }

  /** Change the images for the second table randomly */
  private seedTableImages() {
    const images = [
      "like",
      "stern",
      "musik",
      "ip",
      "idee",
      "homeoffice",
      "folder",
      "copy",
      "dollar",
      "dokument",
      "controller"
    ];

    this.tableItems.forEach(object => {
      object.image = images[Math.floor(Math.random() * images.length)];
    });
  }

  /** Returns a list of all anx icons in kebab case */
  get AnxIcons() {
    const icons: Array<string> = [];
    AnxIconsNames.forEach(name => {
      name = name[0].toLowerCase() + name.substring(1);
      icons.push(name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`));
    });
    return icons;
  }

  /** Return the name of the cell for image with an specific index */
  private getImgCellName(index: string) {
    return "image" + index;
  }

  /*example Modal */
  private exampleModal = false;
  private exampleConfirmationModal = false;

  /** Display form Modal */
  private formModal = false;

  /** Show an alert when the form has been submitted */
  private submitForm() {
    this.formModal = true;
  }
}
</script>
<style lang="scss">
.space {
  height: 20px;
}
</style>
