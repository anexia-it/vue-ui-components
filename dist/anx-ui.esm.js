import { Prop, Watch, Emit, Component, Vue } from 'vue-property-decorator';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var AnxAlert = /*@__PURE__*/(function (Vue) {
    function AnxAlert() {
        Vue.apply(this, arguments);
        /** Variables for anx-alert */
        this.visibility = true;
        this.fadeOut = false;
        this.fadeIn = false;
    }

    if ( Vue ) AnxAlert.__proto__ = Vue;
    AnxAlert.prototype = Object.create( Vue && Vue.prototype );
    AnxAlert.prototype.constructor = AnxAlert;
    /** Watcher for show changes */
    AnxAlert.prototype.onShowChanged = function onShowChanged (val) {
        if (val) {
            this.showAction();
        }
        else {
            this.hideAction();
        }
    };
    /** Emit the dismiss event */
    AnxAlert.prototype.input = function input (val) {
        return val;
    };
    /** Set visibility when mounting */
    AnxAlert.prototype.mounted = function mounted () {
        this.visibility = this.value;
    };
    /** Show the alert */
    AnxAlert.prototype.showAction = function showAction () {
        var this$1 = this;

        if (this.animations) {
            this.fadeIn = true;
            window.setTimeout(function () {
                this$1.fadeIn = false;
                this$1.visibility = true;
            }, 1000);
        }
        else {
            this.visibility = true;
        }
    };
    /** Hide the alert */
    AnxAlert.prototype.hideAction = function hideAction () {
        var this$1 = this;

        if (this.animations) {
            this.fadeOut = true;
            window.setTimeout(function () {
                this$1.fadeOut = false;
                this$1.visibility = false;
            }, 1000);
        }
        else {
            this.visibility = false;
        }
    };

    return AnxAlert;
}(Vue));
__decorate([
    Prop({ default: "anx-alert" })
], AnxAlert.prototype, "name", void 0);
__decorate([
    Prop({ default: null })
], AnxAlert.prototype, "value", void 0);
__decorate([
    Prop({ default: true })
], AnxAlert.prototype, "animations", void 0);
__decorate([
    Prop({ default: "error" })
], AnxAlert.prototype, "type", void 0);
__decorate([
    Watch("value")
], AnxAlert.prototype, "onShowChanged", null);
__decorate([
    Emit("input")
], AnxAlert.prototype, "input", null);
AnxAlert = __decorate([
    Component({})
], AnxAlert);
var script = AnxAlert;

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:'anx-alert ' +
      "anx-alert-" + _vm.type + " " +
      (_vm.visibility ? 'visible ' : 'hidden ') +
      (_vm.fadeIn ? 'fade-in ' : '') +
      (_vm.fadeOut ? 'fade-out ' : ''),attrs:{"id":_vm.name}},[_c('div',{staticClass:"message"},[_c('span',[_vm._t("default")],2)]),_vm._v(" "),_c('div',{staticClass:"dismiss",on:{"click":function($event){return _vm.input(!_vm.visibility)}}},[_vm._v("×")])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-738f9474_0", { source: ".anx-alert[data-v-738f9474]{margin-bottom:30px;display:flex;opacity:1}.anx-alert.fade-out[data-v-738f9474]{opacity:0!important;transition:opacity .5s ease-in-out;-webkit-transition:opacity .5s ease-in-out;-moz-transition:opacity .5s ease-in-out;-ms-transition:opacity .5s ease-in-out;-o-transition:opacity .5s ease-in-out}.anx-alert.fade-in[data-v-738f9474]{opacity:1!important;transition:opacity .5s ease-in-out;-webkit-transition:opacity .5s ease-in-out;-moz-transition:opacity .5s ease-in-out;-ms-transition:opacity .5s ease-in-out;-o-transition:opacity .5s ease-in-out}.anx-alert.hidden[data-v-738f9474]{opacity:0}.anx-alert.hidden[data-v-738f9474]:not(.fade-in){display:none}.anx-alert .message[data-v-738f9474]{padding:16px;line-height:16px}.anx-alert .dismiss[data-v-738f9474]{line-height:12px;font-size:24px;height:12px;width:12px;align-self:center;margin:auto;margin-right:16px}.anx-alert .dismiss[data-v-738f9474]:hover{cursor:pointer}.anx-alert.anx-alert-error[data-v-738f9474]{border:1px solid #d50000;background-color:#fef7f7;color:#d50000}.anx-alert.anx-alert-success[data-v-738f9474]{border:1px solid #77bc1f;background-color:#fbfdf8;color:#77bc1f}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-738f9474";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxButton = /*@__PURE__*/(function (Vue) {
    function AnxButton () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) AnxButton.__proto__ = Vue;
    AnxButton.prototype = Object.create( Vue && Vue.prototype );
    AnxButton.prototype.constructor = AnxButton;

    var prototypeAccessors = { cssProps: { configurable: true } };

    prototypeAccessors.cssProps.get = function () {
        return {
            "--button-width": this.width
        };
    };

    Object.defineProperties( AnxButton.prototype, prototypeAccessors );

    return AnxButton;
}(Vue));
__decorate([
    Prop({ default: "submit" })
], AnxButton.prototype, "btnType", void 0);
__decorate([
    Prop({ default: "anx-button" })
], AnxButton.prototype, "className", void 0);
__decorate([
    Prop({ default: "button" })
], AnxButton.prototype, "text", void 0);
__decorate([
    Prop({ default: "136px" })
], AnxButton.prototype, "width", void 0);
AnxButton = __decorate([
    Component({})
], AnxButton);
var script$1 = AnxButton;

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{class:_vm.className,style:(_vm.cssProps),attrs:{"type":_vm.btnType},on:{"click":function($event){return _vm.$emit(_vm.btnType)}}},[_vm._v("\n  "+_vm._s(_vm.text)+"\n")])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-fb10378c_0", { source: "button[data-v-fb10378c]{width:var(--button-width);height:2.5em;padding-top:2px;border:none;font-size:16px;vertical-align:middle;outline:0 none;padding:0 2em;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:Meta,Arial,Helvetica,sans-serif}.anx-button[data-v-fb10378c]{z-index:100;position:relative;backface-visibility:hidden;-webkit-backface-visibility:hidden;-moz-osx-font-smoothing:grayscale;color:#fff;font-weight:none;-webkit-transition:color .3s;transition:color .3s;transition-timing-function:cubic-bezier(.75,0,.125,1);text-align:center;background-color:transparent;border:1px solid transparent;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.anx-button[data-v-fb10378c]:after,.anx-button[data-v-fb10378c]:before{content:\"\";z-index:-1;border-radius:inherit;pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:opacity .3s,-webkit-transform .3s;transition:transform .3s,opacity .3s;transition:transform .3s,opacity .3s,-webkit-transform .3s;transition-timing-function:cubic-bezier(.75,0,.125,1)}.anx-button[data-v-fb10378c]:before{border:1px solid #77bc1f;opacity:0;-webkit-transform:scale3d(1.2,1.2,1);transform:scale3d(1.2,1.2,1)}.anx-button[data-v-fb10378c]:after{background:#77bc1f}.anx-button[data-v-fb10378c]:visited{color:#77bc1f;text-decoration:none}.anx-button[data-v-fb10378c]:not(:disabled){cursor:pointer}.anx-button[data-v-fb10378c]:not(:disabled):hover{color:#77bc1f;text-decoration:none}.anx-button[data-v-fb10378c]:not(:disabled):hover:before{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}.anx-button[data-v-fb10378c]:not(:disabled):hover:after{opacity:0;-webkit-transform:scale3d(.8,.8,1);transform:scale3d(.8,.8,1)}.btn-outline[data-v-fb10378c]{color:#77bc1f!important;border:1px solid #77bc1f!important;background-color:transparent;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.btn-outline[data-v-fb10378c]:before{background-color:#77bc1f;border:none!important}.btn-outline[data-v-fb10378c]:after{background:0 0!important}.btn-outline[data-v-fb10378c]:visited{color:#fff;text-decoration:none}.btn-outline[data-v-fb10378c]:hover{color:#fff!important;text-decoration:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-fb10378c";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

var Components = {
    AnxAlert: __vue_component__,
    AnxButton: __vue_component__$1,
};

/*import VueI18n from "vue-i18n";
import dePlugin from "./locales/de.json";
import enPlugin from "./locales/en.json";*/
var UIPlugin = {
    install: function install(Vue) {
        // Register all components, that have been loaded
        for (var name in Components) {
            Vue.component(name, Components[name]);
        }
        // TODO: implement i18n for nuxt and vue
        /*if (Object.hasOwnProperty.call(Vue.prototype.$nuxt, "_i18n")) {
          seti18n(Vue.prototype.$nuxt._i18n);
        } else {
          Vue.prototype.$nuxt._i18n = false;
        }

        function seti18n(i18n: VueI18n) {
          const deConsumer = i18n.getLocaleMessage("de");
          const enConsumer = i18n.getLocaleMessage("en");

          const de = {
            ...deConsumer,
            ...dePlugin
          };

          const en = {
            ...enConsumer,
            ...enPlugin
          };

          i18n.setLocaleMessage("de", de);
          i18n.setLocaleMessage("en", en);
        }*/
    },
};

export default UIPlugin;
export { Components };
//# sourceMappingURL=anx-ui.esm.js.map
