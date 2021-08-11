import Vue from "vue";
import UIPlugin from "@anexia/vue-ui-components";

const options = <%= JSON.stringify(options || {}) %>;

Vue.use(UIPlugin, options);
