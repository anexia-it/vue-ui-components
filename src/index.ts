import Vue from 'vue';
import AnxAlert from 'ui/src/components/AnxAlert.vue';
import AnxButton from 'ui/src/components/AnxButton.vue';


const Components = {
    install(vue: typeof Vue): void {
        vue.component('AnxAlert', AnxAlert);
        vue.component('AnxButton', AnxButton);
    },
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Components, {});
}

export { AnxAlert, AnxButton };
export default Components;
