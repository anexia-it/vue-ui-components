<template>
  <ValidationProvider
    v-if="validation"
    v-slot="{ errors }"
    :name="id"
    rules="included:Auswahl 2"
  >
    <div class="anx-select" :style="cssProps">
      <label :for="id + '1'"> {{ labelText }}</label>
      <select
        class="select-original"
        :id="id + '1'"
        :name="id"
        v-validate="'included:Auswahl 2'"
        data-vv-as="selected"
        v-model="selected"
      >
        <option v-for="item in items" :key="item" :value="item">
          {{ item }}</option
        >
      </select>
      <div class="anx-select-div" @click="show = !show">
        {{ selected }}
      </div>
      <ul class="anx-select-options" :class="{ show: show }">
        <li
          v-for="item in items"
          :key="item"
          :rel="item"
          :class="{ active: selected === item }"
          @click="select(item)"
        >
          {{ item }}
        </li>
      </ul>
      <span class="error">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
  <div v-else class="anx-select" :style="cssProps">
    <label :for="id + '1'"> {{ labelText }}</label>
    <select class="select-original" :id="id + '1'" :name="id">
      <option v-for="item in items" :key="item" :value="item">
        {{ item }}</option
      >
    </select>
    <div class="anx-select-div" @click="show = !show">
      {{ selected }}
    </div>
    <ul class="anx-select-options" :class="{ show: show }">
      <li
        v-for="item in items"
        :key="item"
        :rel="item"
        :class="{ active: selected === item }"
        @click="select(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxSelect extends Vue {
  @Prop({ default: "anx-select-choice" }) id!: string;
  @Prop({ default: "Auswahl treffen" }) labelText!: string;
  @Prop({
    type: Array,
    default: function() {
      return ["Auswahl 1", "Auswahl 2", "Auswahl 3", "Auswahl 4"];
    }
  })
  items!: string[];
  @Prop({ default: "100%" }) width!: string;
  @Prop({ default: false }) validation!: boolean;

  private selected = "";
  private show = false;

  get cssProps() {
    return {
      width: this.width
    };
  }

  public mounted() {
    this.select(this.items[0]);
  }

  public select(item: string) {
    this.selected = item;
    this.show = false;
    this.$emit("change", this.selected);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.show {
  display: block !important;
}

.anx-select {
  font-family: MetaWebPro, Helvetica Neue, Helvetica, Arial, sans-serif;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: var(--select-width);
  color: $anx-lightest-grey-dark;
  height: 25px;
  margin-bottom: $form-components-spacing;
  font-size: 16px;
}

.anx-select .select-original {
  display: none;
  visibility: hidden;
  opacity: 0;
}

.anx-select .anx-select-div {
  color: $anx-primary-green;
  border-bottom: 1px solid $anx-second-grey-light;
  position: absolute;
  top: 0;
  right: 0;
  bottom: -2px;
  left: 0;
  background-color: transparent;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  text-align: right;
  padding: 0 18px;
  width: var(--select-width);
}
.anx-select .anx-select-div:after {
  background-position: 0 0;
  background-image: url(../assets/arrow-green-bottom.svg);
  width: 12px;
  height: 11px;
  content: "";
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  top: 4px;
}
.anx-select .anx-select-div:hover {
  background-color: transparent;
}
.anx-select .anx-select-options {
  display: none;
  position: absolute;
  top: 111%;
  right: 0;
  left: 0;
  z-index: 999;
  margin: 0 0 0 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid $anx-second-grey-light;
  border-top: none;
  width: var(--select-width);
}
.anx-select .anx-select-options li {
  text-align: right;
  padding-right: 18px;
  padding-top: 5px;
  margin: 0;
  -moz-transition: all 0.15s ease-in;
  -o-transition: all 0.15s ease-in;
  -webkit-transition: all 0.15s ease-in;
  transition: all 0.15s ease-in;
  position: relative;
  height: 25px;
}
.anx-select .anx-select-options li.active:before {
  content: "";
  width: 16px;
  height: 16px;
  min-width: 16px;
  background-image: url(../assets/check-green.svg);
  background-repeat: no-repeat;
  position: absolute;
  top: 5px;
  margin-left: -20px;
  background-position: 50%;
}
.anx-select .anx-select-options li:hover {
  color: #fff;
  background: $anx-primary-green;
}
</style>
