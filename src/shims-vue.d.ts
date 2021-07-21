import Vue from 'vue'

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "vue/types/vue" {
  interface Vue {
      $anxToast: Record<string, any>;
  }
}
