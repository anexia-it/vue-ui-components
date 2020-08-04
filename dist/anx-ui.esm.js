import { Prop, Watch, Emit, Component, Vue } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import 'vue-i18n';

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

var AnxLink = /*@__PURE__*/(function (Vue) {
    function AnxLink () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxLink.__proto__ = Vue;
    AnxLink.prototype = Object.create( Vue && Vue.prototype );
    AnxLink.prototype.constructor = AnxLink;

    

    return AnxLink;
}(Vue));
AnxLink = __decorate([
    Component({})
], AnxLink);
var script$2 = AnxLink;

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"anx-link"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-4dbe6200_0", { source: ".anx-link[data-v-4dbe6200]{color:#77bc1f;outline:0!important;text-decoration:none}.anx-link[data-v-4dbe6200]:hover{color:#77bc1f;cursor:pointer;border-bottom:1px solid #77bc1f}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-4dbe6200";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxIcon = /*@__PURE__*/(function (Vue) {
    function AnxIcon () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) AnxIcon.__proto__ = Vue;
    AnxIcon.prototype = Object.create( Vue && Vue.prototype );
    AnxIcon.prototype.constructor = AnxIcon;

    var prototypeAccessors = { cssProps: { configurable: true } };

    AnxIcon.prototype.getImage = function getImage () {
        var icon = "";
        if (this.img == "") {
            icon = "anexia.svg";
        }
        else {
            if (this.img.includes(".svg")) {
                icon = this.img;
            }
            else {
                icon = this.img + ".svg";
            }
        }
        return require("../assets/icons/" + icon);
    };
    prototypeAccessors.cssProps.get = function () {
        return {
            "--icon-width": this.width
        };
    };

    Object.defineProperties( AnxIcon.prototype, prototypeAccessors );

    return AnxIcon;
}(Vue));
__decorate([
    Prop({ default: "" })
], AnxIcon.prototype, "img", void 0);
__decorate([
    Prop({ default: "" })
], AnxIcon.prototype, "width", void 0);
AnxIcon = __decorate([
    Component({})
], AnxIcon);
var script$3 = AnxIcon;

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('img',{staticClass:"anx-icon",style:(_vm.cssProps),attrs:{"src":_vm.getImage()}})};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-05ed6980_0", { source: "img[data-v-05ed6980]{width:var(--icon-width);flex-shrink:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-05ed6980";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxContent = /*@__PURE__*/(function (Vue) {
    function AnxContent () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxContent.__proto__ = Vue;
    AnxContent.prototype = Object.create( Vue && Vue.prototype );
    AnxContent.prototype.constructor = AnxContent;

    

    return AnxContent;
}(Vue));
__decorate([
    Prop({ default: "h1" })
], AnxContent.prototype, "size", void 0);
AnxContent = __decorate([
    Component({})
], AnxContent);
var script$4 = AnxContent;

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:("anx-title size-" + _vm.size)},[_c('span',[_vm._t("default")],2)])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-2f3a50ee_0", { source: ".anx-title[data-v-2f3a50ee]{text-transform:uppercase;color:#003ca6;margin-bottom:20px}.anx-title.size-h1[data-v-2f3a50ee]{font-size:28px;font-weight:600}.anx-title.size-h2[data-v-2f3a50ee]{font-size:23px;line-height:27.6px;font-weight:600}.anx-title.size-h3[data-v-2f3a50ee]{font-size:18px;line-height:24px;font-weight:600;color:#686868}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-2f3a50ee";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxParagraph = /*@__PURE__*/(function (Vue) {
    function AnxParagraph () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxParagraph.__proto__ = Vue;
    AnxParagraph.prototype = Object.create( Vue && Vue.prototype );
    AnxParagraph.prototype.constructor = AnxParagraph;

    

    return AnxParagraph;
}(Vue));
__decorate([
    Prop({ default: null })
], AnxParagraph.prototype, "title", void 0);
__decorate([
    Prop({ default: "h1" })
], AnxParagraph.prototype, "size", void 0);
__decorate([
    Prop({ default: null })
], AnxParagraph.prototype, "hint", void 0);
AnxParagraph = __decorate([
    Component({
        components: {
            AnxTitle: __vue_component__$4
        }
    })
], AnxParagraph);
var script$5 = AnxParagraph;

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:"anx-paragraph anx-paragraph-" + _vm.size + " " + (_vm.hint !== null ? 'hint ' : '')},[(_vm.title !== null)?_c('anx-title',{staticClass:"anx-paragraph-title",attrs:{"size":_vm.size}},[_vm._v("\n    "+_vm._s(_vm.title)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._t("default")],2)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-64a87f95_0", { source: "@charset \"UTF-8\";.anx-paragraph[data-v-64a87f95]{line-height:24px}.anx-paragraph p[data-v-64a87f95]{margin:0}.anx-paragraph.anx-paragraph-h1[data-v-64a87f95]{margin-bottom:40px}.anx-paragraph.anx-paragraph-h2[data-v-64a87f95]{margin-bottom:30px}.anx-paragraph.anx-paragraph-h3[data-v-64a87f95]{margin-bottom:20px}.anx-paragraph .anx-paragraph-title[data-v-64a87f95]{margin-bottom:unset}.anx-paragraph .anx-paragraph-title[data-v-64a87f95]::after{content:\"\\a—\";white-space:pre}.anx-paragraph.hint[data-v-64a87f95]{color:#b5b5b5;font-size:12px;line-height:14px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-64a87f95";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

var Card = /*@__PURE__*/(function (Vue) {
    function Card () {
        Vue.apply(this, arguments);
    }if ( Vue ) Card.__proto__ = Vue;
    Card.prototype = Object.create( Vue && Vue.prototype );
    Card.prototype.constructor = Card;

    

    return Card;
}(Vue));
__decorate([
    Prop()
], Card.prototype, "title", void 0);
__decorate([
    Prop({ default: null })
], Card.prototype, "linkText", void 0);
__decorate([
    Prop({ default: "#" })
], Card.prototype, "link", void 0);
__decorate([
    Prop({ default: null })
], Card.prototype, "img", void 0);
Card = __decorate([
    Component({
        components: {
            AnxLink: __vue_component__$2,
            AnxIcon: __vue_component__$3,
            AnxParagraph: __vue_component__$5
        }
    })
], Card);
var script$6 = Card;

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"anx-card"},[_c('div',{staticClass:"anx-card-content d-flex"},[_c('anx-icon',{staticClass:"anx-card-icon",attrs:{"img":_vm.img}}),_vm._v(" "),_c('anx-paragraph',{attrs:{"title":_vm.title,"size":"h3"}},[_c('p',[_vm._t("default")],2),_vm._v(" "),(_vm.linkText)?_c('anx-link',{attrs:{"href":_vm.link}},[_vm._v(" "+_vm._s(_vm.linkText))]):_vm._e()],1)],1)])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-1de6ccee_0", { source: ".anx-card[data-v-1de6ccee]{margin-bottom:20px;border-radius:0!important;border:1px solid #d7d7d7}.anx-card .anx-card-content[data-v-1de6ccee]{padding:0 20px 0 20px;margin-top:24px;margin-bottom:17px}.anx-card .anx-card-content .anx-card-icon[data-v-1de6ccee]{margin-top:auto;margin-bottom:auto;margin-right:20px;height:80px;width:80px}@media screen and (max-width:500px){.anx-card .anx-card-content .anx-card-icon[data-v-1de6ccee]{display:none;margin-right:0}}.anx-card .anx-card-content .anx-paragraph[data-v-1de6ccee]{margin-bottom:0}.anx-card .anx-card-content .anx-paragraph a[data-v-1de6ccee]{text-transform:uppercase}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-1de6ccee";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxCheckbox = /*@__PURE__*/(function (Vue) {
    function AnxCheckbox() {
        Vue.apply(this, arguments);
        this.checked = false;
    }

    if ( Vue ) AnxCheckbox.__proto__ = Vue;
    AnxCheckbox.prototype = Object.create( Vue && Vue.prototype );
    AnxCheckbox.prototype.constructor = AnxCheckbox;

    return AnxCheckbox;
}(Vue));
__decorate([
    Prop()
], AnxCheckbox.prototype, "name", void 0);
__decorate([
    Prop({ default: false })
], AnxCheckbox.prototype, "validation", void 0);
AnxCheckbox = __decorate([
    Component({
        components: {
            ValidationProvider: ValidationProvider
        }
    })
], AnxCheckbox);
var script$7 = AnxCheckbox;

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.validation)?_c('ValidationProvider',{attrs:{"name":_vm.name,"rules":"required:true"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var errors = ref.errors;
return [_c('div',{staticClass:"anx-checkbox"},[_c('label',{attrs:{"for":_vm.name}},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:('required:true'),expression:"'required:true'"},{name:"model",rawName:"v-model",value:(_vm.checked),expression:"checked"}],class:errors && errors.length > 0 ? 'is-invalid' : '',attrs:{"id":_vm.name,"name":_vm.name,"type":"checkbox"},domProps:{"value":_vm.name,"checked":Array.isArray(_vm.checked)?_vm._i(_vm.checked,_vm.name)>-1:(_vm.checked)},on:{"change":[function($event){var $$a=_vm.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.name,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.checked=$$a.concat([$$v]));}else {$$i>-1&&(_vm.checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.checked=$$c;}},function($event){return _vm.$emit('input', { checked: _vm.checked, name: _vm.name })}]}}),_vm._v(" "),_c('div',{staticClass:"text"},[_vm._v(_vm._s(_vm.name))])]),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(errors[0]))])])]}}],null,false,3549409042)}):_c('div',{staticClass:"anx-checkbox"},[_c('label',{attrs:{"for":_vm.name}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checked),expression:"checked"}],attrs:{"id":_vm.name,"name":_vm.name,"type":"checkbox"},domProps:{"value":_vm.name,"checked":Array.isArray(_vm.checked)?_vm._i(_vm.checked,_vm.name)>-1:(_vm.checked)},on:{"change":[function($event){var $$a=_vm.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.name,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.checked=$$a.concat([$$v]));}else {$$i>-1&&(_vm.checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.checked=$$c;}},function($event){return _vm.$emit('input', { checked: _vm.checked, name: _vm.name })}]}}),_vm._v(" "),_c('div',{staticClass:"text"},[_vm._v(_vm._s(_vm.name))])])])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-5d85215f_0", { source: ".anx-checkbox[data-v-5d85215f]{margin-bottom:30px}.anx-checkbox label[data-v-5d85215f]{display:ruby-base;margin:0;color:#686868!important;font-size:16px}.anx-checkbox input[data-v-5d85215f]{height:13px!important;width:13px!important;padding:2px!important;border-color:#77bc1f!important;border:1px solid;margin:0 10px 0 0!important;-webkit-appearance:none;-moz-appearance:none;-o-appearance:none;appearance:none;content:\" \";outline:0}.anx-checkbox input[type=checkbox][data-v-5d85215f]::-ms-check{display:none;border-color:#77bc1f!important;background:0 0}.anx-checkbox input[data-v-5d85215f]:checked{color:#fff;border-color:#77bc1f!important;background:#77bc1f url(../assets/icons/check-white.svg) no-repeat center;border:1px solid}.anx-checkbox input[data-v-5d85215f]:disabled{border-color:#b5b5b5!important}.anx-checkbox input.is-invalid[data-v-5d85215f]{border-color:#d50000!important}.anx-checkbox input.is-invalid~.text[data-v-5d85215f]{color:#d50000}.anx-checkbox .text[data-v-5d85215f]{display:inline-block}.anx-checkbox span.error[data-v-5d85215f]{font-size:12px;color:#d50000;padding:0;white-space:nowrap;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = "data-v-5d85215f";
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxContainer = /*@__PURE__*/(function (Vue) {
    function AnxContainer () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxContainer.__proto__ = Vue;
    AnxContainer.prototype = Object.create( Vue && Vue.prototype );
    AnxContainer.prototype.constructor = AnxContainer;

    

    return AnxContainer;
}(Vue));
AnxContainer = __decorate([
    Component({})
], AnxContainer);
var script$8 = AnxContainer;

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"anx-container container"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-0aaa635c_0", { source: ".anx-container[data-v-0aaa635c]{max-width:500px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = "data-v-0aaa635c";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxContent$1 = /*@__PURE__*/(function (Vue) {
    function AnxContent () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxContent.__proto__ = Vue;
    AnxContent.prototype = Object.create( Vue && Vue.prototype );
    AnxContent.prototype.constructor = AnxContent;

    

    return AnxContent;
}(Vue));
__decorate([
    Prop({ default: null })
], AnxContent$1.prototype, "title", void 0);
__decorate([
    Prop({ default: "h1" })
], AnxContent$1.prototype, "size", void 0);
__decorate([
    Prop({ default: null })
], AnxContent$1.prototype, "inverse", void 0);
AnxContent$1 = __decorate([
    Component({
        components: {
            AnxTitle: __vue_component__$4
        }
    })
], AnxContent$1);
var script$9 = AnxContent$1;

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:'anx-content ' + (_vm.inverse !== null ? 'inversed-colors ' : '')},[(_vm.title !== null)?_c('anx-title',{attrs:{"size":_vm.size}},[_vm._v("\n    "+_vm._s(_vm.title)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._t("default")],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-4a961678_0", { source: ".anx-content[data-v-4a961678]{margin-bottom:40px;background-color:#fff;padding:40px}@media (max-width:992px){.anx-content[data-v-4a961678]{padding:20px}}.anx-content.inversed-colors[data-v-4a961678]{background-color:transparent;padding-left:0!important;padding-right:0!important;color:#fff}.anx-content.inversed-colors .anx-title[data-v-4a961678]{color:#fff}.anx-content div[data-v-4a961678]:last-child{margin-bottom:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = "data-v-4a961678";
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxFooter = /*@__PURE__*/(function (Vue) {
    function AnxFooter() {
        Vue.apply(this, arguments);
        this.footerLinks = [];
    }

    if ( Vue ) AnxFooter.__proto__ = Vue;
    AnxFooter.prototype = Object.create( Vue && Vue.prototype );
    AnxFooter.prototype.constructor = AnxFooter;
    AnxFooter.prototype.mounted = function mounted () {
        this.createFooterLinks();
    };
    AnxFooter.prototype.createFooterLinks = function createFooterLinks () {
        var this$1 = this;

        Object.keys(this.$i18n.t("uiplugin.footer.text")).forEach(function (element) {
            this$1.footerLinks.push({
                text: "uiplugin.footer.text." + element,
                link: "uiplugin.footer.link." + element
            });
        });
    };

    return AnxFooter;
}(Vue));
__decorate([
    Prop({ default: "anexia-logo" })
], AnxFooter.prototype, "img", void 0);
AnxFooter = __decorate([
    Component({ components: { AnxIcon: __vue_component__$3 } })
], AnxFooter);
var script$a = AnxFooter;

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"anx-footer"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-12"},[_c('hr'),_vm._v(" "),_c('div',{staticClass:"anx-footer-elements"},[_c('anx-icon',{staticClass:"anx-footer-logo",attrs:{"alt":"anx-footer-logo","img":_vm.img}}),_vm._v(" "),_c('div',{staticClass:"anx-footer-right"},[_c('div',{staticClass:"anx-footer-text"},[_c('div',{staticClass:"anx-footer-text copyright"},[_vm._v("\n                2006 - "+_vm._s(new Date().getFullYear())+" Anexia\n                Internetdienstleistungs GmbH\n              ")]),_vm._v(" "),_vm._l((this.footerLinks),function(link){return _c('a',{key:link.id,attrs:{"href":("" + (link.link))}},[_vm._v("\n                "+_vm._s(_vm.$t(link.text))+"\n              ")])})],2)])],1),_vm._v(" "),_c('anx-icon',{staticClass:"anx-footer-logo",attrs:{"id":"footer-img-mobile","img":_vm.img}})],1)])])])};
var __vue_staticRenderFns__$a = [];

  /* style */
  var __vue_inject_styles__$a = function (inject) {
    if (!inject) { return }
    inject("data-v-26668a80_0", { source: "@charset \"UTF-8\";.anx-footer-logo[data-v-26668a80]{width:64px}@media screen and (max-width:500px){.anx-footer-logo[data-v-26668a80]{display:none}}#footer-img-mobile[data-v-26668a80]{display:none}@media screen and (max-width:500px){#footer-img-mobile[data-v-26668a80]{margin-right:auto;margin-left:auto;display:inherit;margin-bottom:50px}}.anx-footer[data-v-26668a80]{margin-left:auto;margin-right:auto;width:500px;display:flex;height:100px}@media screen and (max-width:500px){.anx-footer[data-v-26668a80]{width:100%}}.anx-footer-elements[data-v-26668a80]{display:flex}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.anx-footer-elements[data-v-26668a80]{flex-direction:column;-ms-flex-direction:column}}.anx-footer-right[data-v-26668a80]{text-align:right;width:100%}@media screen and (max-width:500px){.anx-footer-right[data-v-26668a80]{margin-bottom:20px}}.anx-footer-text[data-v-26668a80]{color:#fff}@media screen and (max-width:500px){.anx-footer-text[data-v-26668a80]{display:block;text-align:center}}.anx-footer-text.copyright[data-v-26668a80]::before{content:\"©\"}.anx-footer-text a[data-v-26668a80]{color:#77bc1f;text-decoration:none}.anx-footer-text a[data-v-26668a80]:not(:last-of-type):after{content:\" | \"}.anx-footer-text a[data-v-26668a80]:hover{color:#64a50a;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}hr[data-v-26668a80]{background-color:#003ca6;height:1px;margin-top:1rem;margin-bottom:20px;border:0;box-sizing:inherit;border-top:1px solid rgba(0,0,0,.1)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$a = "data-v-26668a80";
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxAlert$1 = /*@__PURE__*/(function (Vue) {
    function AnxAlert () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) AnxAlert.__proto__ = Vue;
    AnxAlert.prototype = Object.create( Vue && Vue.prototype );
    AnxAlert.prototype.constructor = AnxAlert;

    AnxAlert.prototype.submit = function submit () {
        return true;
    };
    /**
     * This validates the form manually
     * This is needed, cause the input fields are only validated after first input.
     * If a field is required but has never had any input, the { valid } prop of the observer would be true.
     */
    AnxAlert.prototype.checkValidation = async function checkValidation () {
        var validator = this.$refs[this.name];
        if (await validator.validate()) {
            this.submit();
        }
    };

    return AnxAlert;
}(Vue));
__decorate([
    Prop({ default: null })
], AnxAlert$1.prototype, "submitButton", void 0);
__decorate([
    Prop({ default: "anx-form" })
], AnxAlert$1.prototype, "name", void 0);
__decorate([
    Emit("submit")
], AnxAlert$1.prototype, "submit", null);
AnxAlert$1 = __decorate([
    Component({
        components: {
            AnxButton: __vue_component__$1,
            ValidationObserver: ValidationObserver
        }
    })
], AnxAlert$1);
var script$b = AnxAlert$1;

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ValidationObserver',{ref:_vm.name,scopedSlots:_vm._u([{key:"default",fn:function(ref){
var invalid = ref.invalid;
return [_c('form',{staticClass:"anx-form",attrs:{"id":_vm.name},on:{"submit":function($event){$event.preventDefault();return _vm.checkValidation($event)}}},[_vm._t("default"),_vm._v(" "),(_vm.submitButton !== null)?_c('anx-button',{attrs:{"type":"submit","width":_vm.submitButton.width ? _vm.submitButton.width : '100%',"text":_vm.submitButton.text,"disabled":_vm.submitButton.disabled && invalid}}):_vm._e()],2)]}}],null,true)})};
var __vue_staticRenderFns__$b = [];

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = "data-v-d097642a";
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * This component contains global styles for the ANX application
 * Every content has to be inside this component
 */
var AnxGlobal = /*@__PURE__*/(function (Vue) {
    function AnxGlobal () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxGlobal.__proto__ = Vue;
    AnxGlobal.prototype = Object.create( Vue && Vue.prototype );
    AnxGlobal.prototype.constructor = AnxGlobal;

    

    return AnxGlobal;
}(Vue));
AnxGlobal = __decorate([
    Component({})
], AnxGlobal);
var script$c = AnxGlobal;

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"anx-global"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$c = [];

  /* style */
  var __vue_inject_styles__$c = function (inject) {
    if (!inject) { return }
    inject("data-v-1ded5869_0", { source: "#app,body{font-family:Meta,Arial,Helvetica,sans-serif;font-weight:400}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProBlk.woff) format(\"woff\");font-weight:900}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProBold.woff) format(\"woff\");font-weight:800}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProMedium.woff) format(\"woff\");font-weight:600}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProBook.woff) format(\"woff\");font-weight:500}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProRegular.woff) format(\"woff\");font-weight:400}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProLight.woff) format(\"woff\");font-weight:300}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProThin.woff) format(\"woff\");font-weight:200}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProBlkIt.woff) format(\"woff\");font-weight:900;font-style:italic}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProBoldIt.woff) format(\"woff\");font-weight:800;font-style:italic}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProMedIt.woff) format(\"woff\");font-weight:600;font-style:italic}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProBookIt.woff) format(\"woff\");font-weight:500;font-style:italic}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProRegIt.woff) format(\"woff\");font-weight:400;font-style:italic}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProLightIt.woff) format(\"woff\");font-weight:300;font-style:italic}@font-face{font-family:Meta;src:url(../assets/fonts/meta/FFMetaProThinIt.woff) format(\"woff\");font-weight:200;font-style:italic}/*!\n * Bootstrap Grid v4.5.0 (https://getbootstrap.com/)\n * Copyright 2011-2020 The Bootstrap Authors\n * Copyright 2011-2020 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */html{box-sizing:border-box;-ms-overflow-style:scrollbar}*,::after,::before{box-sizing:inherit}.container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}@media (min-width:1200px){.container{max-width:1140px}}.container-fluid,.container-lg,.container-md,.container-sm,.container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.no-gutters{margin-right:0;margin-left:0}.no-gutters>.col,.no-gutters>[class*=col-]{padding-right:0;padding-left:0}.col,.col-1,.col-10,.col-11,.col-12,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-auto,.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-auto,.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-auto,.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-auto{position:relative;width:100%;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;min-width:0;max-width:100%}.row-cols-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-first{-ms-flex-order:-1;order:-1}.order-last{-ms-flex-order:13;order:13}.order-0{-ms-flex-order:0;order:0}.order-1{-ms-flex-order:1;order:1}.order-2{-ms-flex-order:2;order:2}.order-3{-ms-flex-order:3;order:3}.order-4{-ms-flex-order:4;order:4}.order-5{-ms-flex-order:5;order:5}.order-6{-ms-flex-order:6;order:6}.order-7{-ms-flex-order:7;order:7}.order-8{-ms-flex-order:8;order:8}.order-9{-ms-flex-order:9;order:9}.order-10{-ms-flex-order:10;order:10}.order-11{-ms-flex-order:11;order:11}.order-12{-ms-flex-order:12;order:12}.offset-1{margin-left:8.333333%}.offset-2{margin-left:16.666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.333333%}.offset-5{margin-left:41.666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.333333%}.offset-8{margin-left:66.666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.333333%}.offset-11{margin-left:91.666667%}@media (min-width:576px){.col-sm{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;min-width:0;max-width:100%}.row-cols-sm-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-sm-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-sm-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-sm-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-sm-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-sm-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-sm-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-sm-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-sm-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-sm-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-sm-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-sm-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-sm-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-sm-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-sm-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-sm-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-sm-first{-ms-flex-order:-1;order:-1}.order-sm-last{-ms-flex-order:13;order:13}.order-sm-0{-ms-flex-order:0;order:0}.order-sm-1{-ms-flex-order:1;order:1}.order-sm-2{-ms-flex-order:2;order:2}.order-sm-3{-ms-flex-order:3;order:3}.order-sm-4{-ms-flex-order:4;order:4}.order-sm-5{-ms-flex-order:5;order:5}.order-sm-6{-ms-flex-order:6;order:6}.order-sm-7{-ms-flex-order:7;order:7}.order-sm-8{-ms-flex-order:8;order:8}.order-sm-9{-ms-flex-order:9;order:9}.order-sm-10{-ms-flex-order:10;order:10}.order-sm-11{-ms-flex-order:11;order:11}.order-sm-12{-ms-flex-order:12;order:12}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.333333%}.offset-sm-2{margin-left:16.666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.333333%}.offset-sm-5{margin-left:41.666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.333333%}.offset-sm-8{margin-left:66.666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.333333%}.offset-sm-11{margin-left:91.666667%}}@media (min-width:768px){.col-md{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;min-width:0;max-width:100%}.row-cols-md-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-md-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-md-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-md-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-md-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-md-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-md-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-md-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-md-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-md-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-md-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-md-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-md-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-md-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-md-first{-ms-flex-order:-1;order:-1}.order-md-last{-ms-flex-order:13;order:13}.order-md-0{-ms-flex-order:0;order:0}.order-md-1{-ms-flex-order:1;order:1}.order-md-2{-ms-flex-order:2;order:2}.order-md-3{-ms-flex-order:3;order:3}.order-md-4{-ms-flex-order:4;order:4}.order-md-5{-ms-flex-order:5;order:5}.order-md-6{-ms-flex-order:6;order:6}.order-md-7{-ms-flex-order:7;order:7}.order-md-8{-ms-flex-order:8;order:8}.order-md-9{-ms-flex-order:9;order:9}.order-md-10{-ms-flex-order:10;order:10}.order-md-11{-ms-flex-order:11;order:11}.order-md-12{-ms-flex-order:12;order:12}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.333333%}.offset-md-2{margin-left:16.666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.333333%}.offset-md-5{margin-left:41.666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.333333%}.offset-md-8{margin-left:66.666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.333333%}.offset-md-11{margin-left:91.666667%}}@media (min-width:992px){.col-lg{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;min-width:0;max-width:100%}.row-cols-lg-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-lg-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-lg-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-lg-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-lg-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-lg-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-lg-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-lg-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-lg-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-lg-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-lg-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-lg-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-lg-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-lg-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-lg-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-lg-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-lg-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-lg-first{-ms-flex-order:-1;order:-1}.order-lg-last{-ms-flex-order:13;order:13}.order-lg-0{-ms-flex-order:0;order:0}.order-lg-1{-ms-flex-order:1;order:1}.order-lg-2{-ms-flex-order:2;order:2}.order-lg-3{-ms-flex-order:3;order:3}.order-lg-4{-ms-flex-order:4;order:4}.order-lg-5{-ms-flex-order:5;order:5}.order-lg-6{-ms-flex-order:6;order:6}.order-lg-7{-ms-flex-order:7;order:7}.order-lg-8{-ms-flex-order:8;order:8}.order-lg-9{-ms-flex-order:9;order:9}.order-lg-10{-ms-flex-order:10;order:10}.order-lg-11{-ms-flex-order:11;order:11}.order-lg-12{-ms-flex-order:12;order:12}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.333333%}.offset-lg-2{margin-left:16.666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.333333%}.offset-lg-5{margin-left:41.666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.333333%}.offset-lg-8{margin-left:66.666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.333333%}.offset-lg-11{margin-left:91.666667%}}@media (min-width:1200px){.col-xl{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;min-width:0;max-width:100%}.row-cols-xl-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-xl-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-xl-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-xl-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-xl-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-xl-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-xl-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-xl-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-xl-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-xl-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-xl-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-xl-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-xl-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-xl-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-xl-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-xl-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-xl-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-xl-first{-ms-flex-order:-1;order:-1}.order-xl-last{-ms-flex-order:13;order:13}.order-xl-0{-ms-flex-order:0;order:0}.order-xl-1{-ms-flex-order:1;order:1}.order-xl-2{-ms-flex-order:2;order:2}.order-xl-3{-ms-flex-order:3;order:3}.order-xl-4{-ms-flex-order:4;order:4}.order-xl-5{-ms-flex-order:5;order:5}.order-xl-6{-ms-flex-order:6;order:6}.order-xl-7{-ms-flex-order:7;order:7}.order-xl-8{-ms-flex-order:8;order:8}.order-xl-9{-ms-flex-order:9;order:9}.order-xl-10{-ms-flex-order:10;order:10}.order-xl-11{-ms-flex-order:11;order:11}.order-xl-12{-ms-flex-order:12;order:12}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.333333%}.offset-xl-2{margin-left:16.666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.333333%}.offset-xl-5{margin-left:41.666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.333333%}.offset-xl-8{margin-left:66.666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.333333%}.offset-xl-11{margin-left:91.666667%}}.d-none{display:none!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:-ms-flexbox!important;display:flex!important}.d-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}@media (min-width:576px){.d-sm-none{display:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:-ms-flexbox!important;display:flex!important}.d-sm-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:768px){.d-md-none{display:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:-ms-flexbox!important;display:flex!important}.d-md-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:992px){.d-lg-none{display:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:-ms-flexbox!important;display:flex!important}.d-lg-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:1200px){.d-xl-none{display:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:-ms-flexbox!important;display:flex!important}.d-xl-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media print{.d-print-none{display:none!important}.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:-ms-flexbox!important;display:flex!important}.d-print-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}.flex-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-center{-ms-flex-align:center!important;align-items:center!important}.align-items-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}@media (min-width:576px){.flex-sm-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-sm-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-sm-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-sm-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-sm-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-sm-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-sm-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-sm-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-sm-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-sm-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-sm-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-sm-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-sm-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-sm-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-sm-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-sm-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-sm-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-sm-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-sm-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-sm-center{-ms-flex-align:center!important;align-items:center!important}.align-items-sm-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-sm-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-sm-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-sm-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-sm-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-sm-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-sm-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-sm-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-sm-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-sm-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-sm-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-sm-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-sm-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-sm-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:768px){.flex-md-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-md-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-md-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-md-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-md-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-md-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-md-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-md-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-md-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-md-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-md-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-md-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-md-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-md-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-md-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-md-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-md-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-md-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-md-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-md-center{-ms-flex-align:center!important;align-items:center!important}.align-items-md-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-md-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-md-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-md-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-md-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-md-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-md-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-md-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-md-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-md-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-md-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-md-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-md-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-md-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:992px){.flex-lg-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-lg-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-lg-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-lg-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-lg-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-lg-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-lg-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-lg-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-lg-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-lg-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-lg-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-lg-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-lg-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-lg-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-lg-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-lg-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-lg-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-lg-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-lg-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-lg-center{-ms-flex-align:center!important;align-items:center!important}.align-items-lg-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-lg-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-lg-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-lg-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-lg-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-lg-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-lg-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-lg-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-lg-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-lg-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-lg-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-lg-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-lg-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-lg-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:1200px){.flex-xl-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-xl-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-xl-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-xl-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-xl-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-xl-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-xl-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-xl-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-xl-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-xl-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-xl-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-xl-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-xl-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-xl-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-xl-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-xl-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-xl-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-xl-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-xl-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-xl-center{-ms-flex-align:center!important;align-items:center!important}.align-items-xl-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-xl-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-xl-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-xl-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-xl-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-xl-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-xl-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-xl-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-xl-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-xl-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-xl-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-xl-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-xl-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-xl-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{padding-top:1.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}.m-n2{margin:-.5rem!important}.mt-n2,.my-n2{margin-top:-.5rem!important}.mr-n2,.mx-n2{margin-right:-.5rem!important}.mb-n2,.my-n2{margin-bottom:-.5rem!important}.ml-n2,.mx-n2{margin-left:-.5rem!important}.m-n3{margin:-1rem!important}.mt-n3,.my-n3{margin-top:-1rem!important}.mr-n3,.mx-n3{margin-right:-1rem!important}.mb-n3,.my-n3{margin-bottom:-1rem!important}.ml-n3,.mx-n3{margin-left:-1rem!important}.m-n4{margin:-1.5rem!important}.mt-n4,.my-n4{margin-top:-1.5rem!important}.mr-n4,.mx-n4{margin-right:-1.5rem!important}.mb-n4,.my-n4{margin-bottom:-1.5rem!important}.ml-n4,.mx-n4{margin-left:-1.5rem!important}.m-n5{margin:-3rem!important}.mt-n5,.my-n5{margin-top:-3rem!important}.mr-n5,.mx-n5{margin-right:-3rem!important}.mb-n5,.my-n5{margin-bottom:-3rem!important}.ml-n5,.mx-n5{margin-left:-3rem!important}.m-auto{margin:auto!important}.mt-auto,.my-auto{margin-top:auto!important}.mr-auto,.mx-auto{margin-right:auto!important}.mb-auto,.my-auto{margin-bottom:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}@media (min-width:576px){.m-sm-0{margin:0!important}.mt-sm-0,.my-sm-0{margin-top:0!important}.mr-sm-0,.mx-sm-0{margin-right:0!important}.mb-sm-0,.my-sm-0{margin-bottom:0!important}.ml-sm-0,.mx-sm-0{margin-left:0!important}.m-sm-1{margin:.25rem!important}.mt-sm-1,.my-sm-1{margin-top:.25rem!important}.mr-sm-1,.mx-sm-1{margin-right:.25rem!important}.mb-sm-1,.my-sm-1{margin-bottom:.25rem!important}.ml-sm-1,.mx-sm-1{margin-left:.25rem!important}.m-sm-2{margin:.5rem!important}.mt-sm-2,.my-sm-2{margin-top:.5rem!important}.mr-sm-2,.mx-sm-2{margin-right:.5rem!important}.mb-sm-2,.my-sm-2{margin-bottom:.5rem!important}.ml-sm-2,.mx-sm-2{margin-left:.5rem!important}.m-sm-3{margin:1rem!important}.mt-sm-3,.my-sm-3{margin-top:1rem!important}.mr-sm-3,.mx-sm-3{margin-right:1rem!important}.mb-sm-3,.my-sm-3{margin-bottom:1rem!important}.ml-sm-3,.mx-sm-3{margin-left:1rem!important}.m-sm-4{margin:1.5rem!important}.mt-sm-4,.my-sm-4{margin-top:1.5rem!important}.mr-sm-4,.mx-sm-4{margin-right:1.5rem!important}.mb-sm-4,.my-sm-4{margin-bottom:1.5rem!important}.ml-sm-4,.mx-sm-4{margin-left:1.5rem!important}.m-sm-5{margin:3rem!important}.mt-sm-5,.my-sm-5{margin-top:3rem!important}.mr-sm-5,.mx-sm-5{margin-right:3rem!important}.mb-sm-5,.my-sm-5{margin-bottom:3rem!important}.ml-sm-5,.mx-sm-5{margin-left:3rem!important}.p-sm-0{padding:0!important}.pt-sm-0,.py-sm-0{padding-top:0!important}.pr-sm-0,.px-sm-0{padding-right:0!important}.pb-sm-0,.py-sm-0{padding-bottom:0!important}.pl-sm-0,.px-sm-0{padding-left:0!important}.p-sm-1{padding:.25rem!important}.pt-sm-1,.py-sm-1{padding-top:.25rem!important}.pr-sm-1,.px-sm-1{padding-right:.25rem!important}.pb-sm-1,.py-sm-1{padding-bottom:.25rem!important}.pl-sm-1,.px-sm-1{padding-left:.25rem!important}.p-sm-2{padding:.5rem!important}.pt-sm-2,.py-sm-2{padding-top:.5rem!important}.pr-sm-2,.px-sm-2{padding-right:.5rem!important}.pb-sm-2,.py-sm-2{padding-bottom:.5rem!important}.pl-sm-2,.px-sm-2{padding-left:.5rem!important}.p-sm-3{padding:1rem!important}.pt-sm-3,.py-sm-3{padding-top:1rem!important}.pr-sm-3,.px-sm-3{padding-right:1rem!important}.pb-sm-3,.py-sm-3{padding-bottom:1rem!important}.pl-sm-3,.px-sm-3{padding-left:1rem!important}.p-sm-4{padding:1.5rem!important}.pt-sm-4,.py-sm-4{padding-top:1.5rem!important}.pr-sm-4,.px-sm-4{padding-right:1.5rem!important}.pb-sm-4,.py-sm-4{padding-bottom:1.5rem!important}.pl-sm-4,.px-sm-4{padding-left:1.5rem!important}.p-sm-5{padding:3rem!important}.pt-sm-5,.py-sm-5{padding-top:3rem!important}.pr-sm-5,.px-sm-5{padding-right:3rem!important}.pb-sm-5,.py-sm-5{padding-bottom:3rem!important}.pl-sm-5,.px-sm-5{padding-left:3rem!important}.m-sm-n1{margin:-.25rem!important}.mt-sm-n1,.my-sm-n1{margin-top:-.25rem!important}.mr-sm-n1,.mx-sm-n1{margin-right:-.25rem!important}.mb-sm-n1,.my-sm-n1{margin-bottom:-.25rem!important}.ml-sm-n1,.mx-sm-n1{margin-left:-.25rem!important}.m-sm-n2{margin:-.5rem!important}.mt-sm-n2,.my-sm-n2{margin-top:-.5rem!important}.mr-sm-n2,.mx-sm-n2{margin-right:-.5rem!important}.mb-sm-n2,.my-sm-n2{margin-bottom:-.5rem!important}.ml-sm-n2,.mx-sm-n2{margin-left:-.5rem!important}.m-sm-n3{margin:-1rem!important}.mt-sm-n3,.my-sm-n3{margin-top:-1rem!important}.mr-sm-n3,.mx-sm-n3{margin-right:-1rem!important}.mb-sm-n3,.my-sm-n3{margin-bottom:-1rem!important}.ml-sm-n3,.mx-sm-n3{margin-left:-1rem!important}.m-sm-n4{margin:-1.5rem!important}.mt-sm-n4,.my-sm-n4{margin-top:-1.5rem!important}.mr-sm-n4,.mx-sm-n4{margin-right:-1.5rem!important}.mb-sm-n4,.my-sm-n4{margin-bottom:-1.5rem!important}.ml-sm-n4,.mx-sm-n4{margin-left:-1.5rem!important}.m-sm-n5{margin:-3rem!important}.mt-sm-n5,.my-sm-n5{margin-top:-3rem!important}.mr-sm-n5,.mx-sm-n5{margin-right:-3rem!important}.mb-sm-n5,.my-sm-n5{margin-bottom:-3rem!important}.ml-sm-n5,.mx-sm-n5{margin-left:-3rem!important}.m-sm-auto{margin:auto!important}.mt-sm-auto,.my-sm-auto{margin-top:auto!important}.mr-sm-auto,.mx-sm-auto{margin-right:auto!important}.mb-sm-auto,.my-sm-auto{margin-bottom:auto!important}.ml-sm-auto,.mx-sm-auto{margin-left:auto!important}}@media (min-width:768px){.m-md-0{margin:0!important}.mt-md-0,.my-md-0{margin-top:0!important}.mr-md-0,.mx-md-0{margin-right:0!important}.mb-md-0,.my-md-0{margin-bottom:0!important}.ml-md-0,.mx-md-0{margin-left:0!important}.m-md-1{margin:.25rem!important}.mt-md-1,.my-md-1{margin-top:.25rem!important}.mr-md-1,.mx-md-1{margin-right:.25rem!important}.mb-md-1,.my-md-1{margin-bottom:.25rem!important}.ml-md-1,.mx-md-1{margin-left:.25rem!important}.m-md-2{margin:.5rem!important}.mt-md-2,.my-md-2{margin-top:.5rem!important}.mr-md-2,.mx-md-2{margin-right:.5rem!important}.mb-md-2,.my-md-2{margin-bottom:.5rem!important}.ml-md-2,.mx-md-2{margin-left:.5rem!important}.m-md-3{margin:1rem!important}.mt-md-3,.my-md-3{margin-top:1rem!important}.mr-md-3,.mx-md-3{margin-right:1rem!important}.mb-md-3,.my-md-3{margin-bottom:1rem!important}.ml-md-3,.mx-md-3{margin-left:1rem!important}.m-md-4{margin:1.5rem!important}.mt-md-4,.my-md-4{margin-top:1.5rem!important}.mr-md-4,.mx-md-4{margin-right:1.5rem!important}.mb-md-4,.my-md-4{margin-bottom:1.5rem!important}.ml-md-4,.mx-md-4{margin-left:1.5rem!important}.m-md-5{margin:3rem!important}.mt-md-5,.my-md-5{margin-top:3rem!important}.mr-md-5,.mx-md-5{margin-right:3rem!important}.mb-md-5,.my-md-5{margin-bottom:3rem!important}.ml-md-5,.mx-md-5{margin-left:3rem!important}.p-md-0{padding:0!important}.pt-md-0,.py-md-0{padding-top:0!important}.pr-md-0,.px-md-0{padding-right:0!important}.pb-md-0,.py-md-0{padding-bottom:0!important}.pl-md-0,.px-md-0{padding-left:0!important}.p-md-1{padding:.25rem!important}.pt-md-1,.py-md-1{padding-top:.25rem!important}.pr-md-1,.px-md-1{padding-right:.25rem!important}.pb-md-1,.py-md-1{padding-bottom:.25rem!important}.pl-md-1,.px-md-1{padding-left:.25rem!important}.p-md-2{padding:.5rem!important}.pt-md-2,.py-md-2{padding-top:.5rem!important}.pr-md-2,.px-md-2{padding-right:.5rem!important}.pb-md-2,.py-md-2{padding-bottom:.5rem!important}.pl-md-2,.px-md-2{padding-left:.5rem!important}.p-md-3{padding:1rem!important}.pt-md-3,.py-md-3{padding-top:1rem!important}.pr-md-3,.px-md-3{padding-right:1rem!important}.pb-md-3,.py-md-3{padding-bottom:1rem!important}.pl-md-3,.px-md-3{padding-left:1rem!important}.p-md-4{padding:1.5rem!important}.pt-md-4,.py-md-4{padding-top:1.5rem!important}.pr-md-4,.px-md-4{padding-right:1.5rem!important}.pb-md-4,.py-md-4{padding-bottom:1.5rem!important}.pl-md-4,.px-md-4{padding-left:1.5rem!important}.p-md-5{padding:3rem!important}.pt-md-5,.py-md-5{padding-top:3rem!important}.pr-md-5,.px-md-5{padding-right:3rem!important}.pb-md-5,.py-md-5{padding-bottom:3rem!important}.pl-md-5,.px-md-5{padding-left:3rem!important}.m-md-n1{margin:-.25rem!important}.mt-md-n1,.my-md-n1{margin-top:-.25rem!important}.mr-md-n1,.mx-md-n1{margin-right:-.25rem!important}.mb-md-n1,.my-md-n1{margin-bottom:-.25rem!important}.ml-md-n1,.mx-md-n1{margin-left:-.25rem!important}.m-md-n2{margin:-.5rem!important}.mt-md-n2,.my-md-n2{margin-top:-.5rem!important}.mr-md-n2,.mx-md-n2{margin-right:-.5rem!important}.mb-md-n2,.my-md-n2{margin-bottom:-.5rem!important}.ml-md-n2,.mx-md-n2{margin-left:-.5rem!important}.m-md-n3{margin:-1rem!important}.mt-md-n3,.my-md-n3{margin-top:-1rem!important}.mr-md-n3,.mx-md-n3{margin-right:-1rem!important}.mb-md-n3,.my-md-n3{margin-bottom:-1rem!important}.ml-md-n3,.mx-md-n3{margin-left:-1rem!important}.m-md-n4{margin:-1.5rem!important}.mt-md-n4,.my-md-n4{margin-top:-1.5rem!important}.mr-md-n4,.mx-md-n4{margin-right:-1.5rem!important}.mb-md-n4,.my-md-n4{margin-bottom:-1.5rem!important}.ml-md-n4,.mx-md-n4{margin-left:-1.5rem!important}.m-md-n5{margin:-3rem!important}.mt-md-n5,.my-md-n5{margin-top:-3rem!important}.mr-md-n5,.mx-md-n5{margin-right:-3rem!important}.mb-md-n5,.my-md-n5{margin-bottom:-3rem!important}.ml-md-n5,.mx-md-n5{margin-left:-3rem!important}.m-md-auto{margin:auto!important}.mt-md-auto,.my-md-auto{margin-top:auto!important}.mr-md-auto,.mx-md-auto{margin-right:auto!important}.mb-md-auto,.my-md-auto{margin-bottom:auto!important}.ml-md-auto,.mx-md-auto{margin-left:auto!important}}@media (min-width:992px){.m-lg-0{margin:0!important}.mt-lg-0,.my-lg-0{margin-top:0!important}.mr-lg-0,.mx-lg-0{margin-right:0!important}.mb-lg-0,.my-lg-0{margin-bottom:0!important}.ml-lg-0,.mx-lg-0{margin-left:0!important}.m-lg-1{margin:.25rem!important}.mt-lg-1,.my-lg-1{margin-top:.25rem!important}.mr-lg-1,.mx-lg-1{margin-right:.25rem!important}.mb-lg-1,.my-lg-1{margin-bottom:.25rem!important}.ml-lg-1,.mx-lg-1{margin-left:.25rem!important}.m-lg-2{margin:.5rem!important}.mt-lg-2,.my-lg-2{margin-top:.5rem!important}.mr-lg-2,.mx-lg-2{margin-right:.5rem!important}.mb-lg-2,.my-lg-2{margin-bottom:.5rem!important}.ml-lg-2,.mx-lg-2{margin-left:.5rem!important}.m-lg-3{margin:1rem!important}.mt-lg-3,.my-lg-3{margin-top:1rem!important}.mr-lg-3,.mx-lg-3{margin-right:1rem!important}.mb-lg-3,.my-lg-3{margin-bottom:1rem!important}.ml-lg-3,.mx-lg-3{margin-left:1rem!important}.m-lg-4{margin:1.5rem!important}.mt-lg-4,.my-lg-4{margin-top:1.5rem!important}.mr-lg-4,.mx-lg-4{margin-right:1.5rem!important}.mb-lg-4,.my-lg-4{margin-bottom:1.5rem!important}.ml-lg-4,.mx-lg-4{margin-left:1.5rem!important}.m-lg-5{margin:3rem!important}.mt-lg-5,.my-lg-5{margin-top:3rem!important}.mr-lg-5,.mx-lg-5{margin-right:3rem!important}.mb-lg-5,.my-lg-5{margin-bottom:3rem!important}.ml-lg-5,.mx-lg-5{margin-left:3rem!important}.p-lg-0{padding:0!important}.pt-lg-0,.py-lg-0{padding-top:0!important}.pr-lg-0,.px-lg-0{padding-right:0!important}.pb-lg-0,.py-lg-0{padding-bottom:0!important}.pl-lg-0,.px-lg-0{padding-left:0!important}.p-lg-1{padding:.25rem!important}.pt-lg-1,.py-lg-1{padding-top:.25rem!important}.pr-lg-1,.px-lg-1{padding-right:.25rem!important}.pb-lg-1,.py-lg-1{padding-bottom:.25rem!important}.pl-lg-1,.px-lg-1{padding-left:.25rem!important}.p-lg-2{padding:.5rem!important}.pt-lg-2,.py-lg-2{padding-top:.5rem!important}.pr-lg-2,.px-lg-2{padding-right:.5rem!important}.pb-lg-2,.py-lg-2{padding-bottom:.5rem!important}.pl-lg-2,.px-lg-2{padding-left:.5rem!important}.p-lg-3{padding:1rem!important}.pt-lg-3,.py-lg-3{padding-top:1rem!important}.pr-lg-3,.px-lg-3{padding-right:1rem!important}.pb-lg-3,.py-lg-3{padding-bottom:1rem!important}.pl-lg-3,.px-lg-3{padding-left:1rem!important}.p-lg-4{padding:1.5rem!important}.pt-lg-4,.py-lg-4{padding-top:1.5rem!important}.pr-lg-4,.px-lg-4{padding-right:1.5rem!important}.pb-lg-4,.py-lg-4{padding-bottom:1.5rem!important}.pl-lg-4,.px-lg-4{padding-left:1.5rem!important}.p-lg-5{padding:3rem!important}.pt-lg-5,.py-lg-5{padding-top:3rem!important}.pr-lg-5,.px-lg-5{padding-right:3rem!important}.pb-lg-5,.py-lg-5{padding-bottom:3rem!important}.pl-lg-5,.px-lg-5{padding-left:3rem!important}.m-lg-n1{margin:-.25rem!important}.mt-lg-n1,.my-lg-n1{margin-top:-.25rem!important}.mr-lg-n1,.mx-lg-n1{margin-right:-.25rem!important}.mb-lg-n1,.my-lg-n1{margin-bottom:-.25rem!important}.ml-lg-n1,.mx-lg-n1{margin-left:-.25rem!important}.m-lg-n2{margin:-.5rem!important}.mt-lg-n2,.my-lg-n2{margin-top:-.5rem!important}.mr-lg-n2,.mx-lg-n2{margin-right:-.5rem!important}.mb-lg-n2,.my-lg-n2{margin-bottom:-.5rem!important}.ml-lg-n2,.mx-lg-n2{margin-left:-.5rem!important}.m-lg-n3{margin:-1rem!important}.mt-lg-n3,.my-lg-n3{margin-top:-1rem!important}.mr-lg-n3,.mx-lg-n3{margin-right:-1rem!important}.mb-lg-n3,.my-lg-n3{margin-bottom:-1rem!important}.ml-lg-n3,.mx-lg-n3{margin-left:-1rem!important}.m-lg-n4{margin:-1.5rem!important}.mt-lg-n4,.my-lg-n4{margin-top:-1.5rem!important}.mr-lg-n4,.mx-lg-n4{margin-right:-1.5rem!important}.mb-lg-n4,.my-lg-n4{margin-bottom:-1.5rem!important}.ml-lg-n4,.mx-lg-n4{margin-left:-1.5rem!important}.m-lg-n5{margin:-3rem!important}.mt-lg-n5,.my-lg-n5{margin-top:-3rem!important}.mr-lg-n5,.mx-lg-n5{margin-right:-3rem!important}.mb-lg-n5,.my-lg-n5{margin-bottom:-3rem!important}.ml-lg-n5,.mx-lg-n5{margin-left:-3rem!important}.m-lg-auto{margin:auto!important}.mt-lg-auto,.my-lg-auto{margin-top:auto!important}.mr-lg-auto,.mx-lg-auto{margin-right:auto!important}.mb-lg-auto,.my-lg-auto{margin-bottom:auto!important}.ml-lg-auto,.mx-lg-auto{margin-left:auto!important}}@media (min-width:1200px){.m-xl-0{margin:0!important}.mt-xl-0,.my-xl-0{margin-top:0!important}.mr-xl-0,.mx-xl-0{margin-right:0!important}.mb-xl-0,.my-xl-0{margin-bottom:0!important}.ml-xl-0,.mx-xl-0{margin-left:0!important}.m-xl-1{margin:.25rem!important}.mt-xl-1,.my-xl-1{margin-top:.25rem!important}.mr-xl-1,.mx-xl-1{margin-right:.25rem!important}.mb-xl-1,.my-xl-1{margin-bottom:.25rem!important}.ml-xl-1,.mx-xl-1{margin-left:.25rem!important}.m-xl-2{margin:.5rem!important}.mt-xl-2,.my-xl-2{margin-top:.5rem!important}.mr-xl-2,.mx-xl-2{margin-right:.5rem!important}.mb-xl-2,.my-xl-2{margin-bottom:.5rem!important}.ml-xl-2,.mx-xl-2{margin-left:.5rem!important}.m-xl-3{margin:1rem!important}.mt-xl-3,.my-xl-3{margin-top:1rem!important}.mr-xl-3,.mx-xl-3{margin-right:1rem!important}.mb-xl-3,.my-xl-3{margin-bottom:1rem!important}.ml-xl-3,.mx-xl-3{margin-left:1rem!important}.m-xl-4{margin:1.5rem!important}.mt-xl-4,.my-xl-4{margin-top:1.5rem!important}.mr-xl-4,.mx-xl-4{margin-right:1.5rem!important}.mb-xl-4,.my-xl-4{margin-bottom:1.5rem!important}.ml-xl-4,.mx-xl-4{margin-left:1.5rem!important}.m-xl-5{margin:3rem!important}.mt-xl-5,.my-xl-5{margin-top:3rem!important}.mr-xl-5,.mx-xl-5{margin-right:3rem!important}.mb-xl-5,.my-xl-5{margin-bottom:3rem!important}.ml-xl-5,.mx-xl-5{margin-left:3rem!important}.p-xl-0{padding:0!important}.pt-xl-0,.py-xl-0{padding-top:0!important}.pr-xl-0,.px-xl-0{padding-right:0!important}.pb-xl-0,.py-xl-0{padding-bottom:0!important}.pl-xl-0,.px-xl-0{padding-left:0!important}.p-xl-1{padding:.25rem!important}.pt-xl-1,.py-xl-1{padding-top:.25rem!important}.pr-xl-1,.px-xl-1{padding-right:.25rem!important}.pb-xl-1,.py-xl-1{padding-bottom:.25rem!important}.pl-xl-1,.px-xl-1{padding-left:.25rem!important}.p-xl-2{padding:.5rem!important}.pt-xl-2,.py-xl-2{padding-top:.5rem!important}.pr-xl-2,.px-xl-2{padding-right:.5rem!important}.pb-xl-2,.py-xl-2{padding-bottom:.5rem!important}.pl-xl-2,.px-xl-2{padding-left:.5rem!important}.p-xl-3{padding:1rem!important}.pt-xl-3,.py-xl-3{padding-top:1rem!important}.pr-xl-3,.px-xl-3{padding-right:1rem!important}.pb-xl-3,.py-xl-3{padding-bottom:1rem!important}.pl-xl-3,.px-xl-3{padding-left:1rem!important}.p-xl-4{padding:1.5rem!important}.pt-xl-4,.py-xl-4{padding-top:1.5rem!important}.pr-xl-4,.px-xl-4{padding-right:1.5rem!important}.pb-xl-4,.py-xl-4{padding-bottom:1.5rem!important}.pl-xl-4,.px-xl-4{padding-left:1.5rem!important}.p-xl-5{padding:3rem!important}.pt-xl-5,.py-xl-5{padding-top:3rem!important}.pr-xl-5,.px-xl-5{padding-right:3rem!important}.pb-xl-5,.py-xl-5{padding-bottom:3rem!important}.pl-xl-5,.px-xl-5{padding-left:3rem!important}.m-xl-n1{margin:-.25rem!important}.mt-xl-n1,.my-xl-n1{margin-top:-.25rem!important}.mr-xl-n1,.mx-xl-n1{margin-right:-.25rem!important}.mb-xl-n1,.my-xl-n1{margin-bottom:-.25rem!important}.ml-xl-n1,.mx-xl-n1{margin-left:-.25rem!important}.m-xl-n2{margin:-.5rem!important}.mt-xl-n2,.my-xl-n2{margin-top:-.5rem!important}.mr-xl-n2,.mx-xl-n2{margin-right:-.5rem!important}.mb-xl-n2,.my-xl-n2{margin-bottom:-.5rem!important}.ml-xl-n2,.mx-xl-n2{margin-left:-.5rem!important}.m-xl-n3{margin:-1rem!important}.mt-xl-n3,.my-xl-n3{margin-top:-1rem!important}.mr-xl-n3,.mx-xl-n3{margin-right:-1rem!important}.mb-xl-n3,.my-xl-n3{margin-bottom:-1rem!important}.ml-xl-n3,.mx-xl-n3{margin-left:-1rem!important}.m-xl-n4{margin:-1.5rem!important}.mt-xl-n4,.my-xl-n4{margin-top:-1.5rem!important}.mr-xl-n4,.mx-xl-n4{margin-right:-1.5rem!important}.mb-xl-n4,.my-xl-n4{margin-bottom:-1.5rem!important}.ml-xl-n4,.mx-xl-n4{margin-left:-1.5rem!important}.m-xl-n5{margin:-3rem!important}.mt-xl-n5,.my-xl-n5{margin-top:-3rem!important}.mr-xl-n5,.mx-xl-n5{margin-right:-3rem!important}.mb-xl-n5,.my-xl-n5{margin-bottom:-3rem!important}.ml-xl-n5,.mx-xl-n5{margin-left:-3rem!important}.m-xl-auto{margin:auto!important}.mt-xl-auto,.my-xl-auto{margin-top:auto!important}.mr-xl-auto,.mx-xl-auto{margin-right:auto!important}.mb-xl-auto,.my-xl-auto{margin-bottom:auto!important}.ml-xl-auto,.mx-xl-auto{margin-left:auto!important}}html body{margin:0!important;background-color:#002d6e;color:#686868;font-size:16px}html body .text-uppercase{text-transform:uppercase}html body span.f-100{font-weight:100}html body span.f-200{font-weight:200}html body span.f-300{font-weight:300}html body span.f-400{font-weight:400}html body span.f-500{font-weight:500}html body span.f-600{font-weight:600}html body span.f-700{font-weight:700}html body span.f-800{font-weight:800}html body span.f-900{font-weight:900}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    createInjector,
    undefined,
    undefined
  );

var I18nLangSwitcher = /*@__PURE__*/(function (Vue) {
    function I18nLangSwitcher () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) I18nLangSwitcher.__proto__ = Vue;
    I18nLangSwitcher.prototype = Object.create( Vue && Vue.prototype );
    I18nLangSwitcher.prototype.constructor = I18nLangSwitcher;

    I18nLangSwitcher.prototype.setLocale = function setLocale (locale) {
        this.$i18n.locale = locale;
    };

    return I18nLangSwitcher;
}(Vue));
I18nLangSwitcher = __decorate([
    Component({})
], I18nLangSwitcher);
var script$d = I18nLangSwitcher;

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"language-switcher"},[_c('a',{class:_vm.$i18n.locale === 'de' ? 'selected' : 'not-selected',on:{"click":function($event){return _vm.setLocale('de')}}},[_vm._v("\n      DE\n    ")]),_vm._v("\n    /\n    "),_c('a',{class:_vm.$i18n.locale === 'en' ? 'selected' : 'not-selected',on:{"click":function($event){return _vm.setLocale('en')}}},[_vm._v("\n      EN\n    ")])])])};
var __vue_staticRenderFns__$d = [];

  /* style */
  var __vue_inject_styles__$d = function (inject) {
    if (!inject) { return }
    inject("data-v-1a323c53_0", { source: ".language-switcher[data-v-1a323c53]{color:#77bc1f}.language-switcher a[data-v-1a323c53],.language-switcher a[data-v-1a323c53]:focus,.language-switcher a[data-v-1a323c53]:link,.language-switcher a[data-v-1a323c53]:visited{cursor:pointer;margin:0;color:#fff}.language-switcher .selected[data-v-1a323c53]{cursor:pointer;color:#fff;border-bottom:1px solid #77bc1f}.language-switcher a[data-v-1a323c53]:hover{color:#77bc1f}.language-switcher .not-selected[data-v-1a323c53]{text-decoration:none;color:#77bc1f;cursor:pointer}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$d = "data-v-1a323c53";
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxHeader = /*@__PURE__*/(function (Vue) {
    function AnxHeader () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) AnxHeader.__proto__ = Vue;
    AnxHeader.prototype = Object.create( Vue && Vue.prototype );
    AnxHeader.prototype.constructor = AnxHeader;

    AnxHeader.prototype.mounted = function mounted () {
        var hmenu = document.querySelectorAll(".header-nav-menu > .menu-text.left > a");
        var path = window.location.pathname;
        hmenu.forEach(function (el) {
            if (path[path.length - 1] !== "/") {
                path += "/";
            }
            if (el.getAttribute("href") === path) {
                el.classList.add("active");
            }
        });
        return;
    };

    return AnxHeader;
}(Vue));
__decorate([
    Prop({ default: "anexia-logo" })
], AnxHeader.prototype, "img", void 0);
__decorate([
    Prop({ default: null })
], AnxHeader.prototype, "menus", void 0);
AnxHeader = __decorate([
    Component({
        components: { I18nLangSwitcher: __vue_component__$d, AnxIcon: __vue_component__$3 }
    })
], AnxHeader);
var script$e = AnxHeader;

/* script */
var __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"header"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-12"},[_c('div',{staticClass:"header-container d-flex"},[_c('div',{staticClass:"header-image"},[_c('anx-icon',{attrs:{"alt":"anx-header-logo","img":_vm.img}})],1),_vm._v(" "),(_vm.$i18n)?_c('div',{staticClass:"header-language-nav"},[(!_vm.menus)?_c('div',[_c('I18nLangSwitcher')],1):_vm._e()]):_vm._e()]),_vm._v(" "),_c('hr'),_vm._v(" "),(_vm.menus)?_c('div',{staticClass:"header-nav-menu"},[_c('div',{staticClass:"menu-text left"},_vm._l((_vm.menus),function(menu){return _c('a',{key:menu.id,attrs:{"href":("" + (menu.link))}},[_vm._v("\n              "+_vm._s(menu.menu)+"\n            ")])}),0),_vm._v(" "),(_vm.$i18n)?_c('div',{staticClass:"menu-text right"},[(_vm.menus)?_c('div',[_c('I18nLangSwitcher')],1):_vm._e()]):_vm._e()]):_vm._e()])])])])};
var __vue_staticRenderFns__$e = [];

  /* style */
  var __vue_inject_styles__$e = function (inject) {
    if (!inject) { return }
    inject("data-v-7d6329c5_0", { source: "hr[data-v-7d6329c5]{background-color:#003ca6;height:1px;margin-top:1rem;margin-bottom:20px;border:0;box-sizing:inherit;border-top:1px solid rgba(0,0,0,.1)}.header-container[data-v-7d6329c5]{margin-top:30px;margin-bottom:10px}.header-container .header-language-nav[data-v-7d6329c5]{width:100%;text-align:right;margin:auto 0 auto 0;color:#fff}.header[data-v-7d6329c5]{margin-left:auto;margin-right:auto;width:500px;display:flex}@media screen and (max-width:500px){.header[data-v-7d6329c5]{width:100%}}img[data-v-7d6329c5]{height:45px}a[data-v-7d6329c5]{color:#77bc1f;text-decoration:none}a.active[data-v-7d6329c5]{color:#fff;border-bottom:1px solid #77bc1f}a[data-v-7d6329c5]:hover{text-decoration:none;color:#77bc1f}.header-nav-menu[data-v-7d6329c5]{display:table;margin-bottom:35px;width:100%}@media screen and (max-width:500px){.header-nav-menu[data-v-7d6329c5]{display:flex;flex-direction:column-reverse;padding-top:none}}.header-nav-menu .menu-text a[data-v-7d6329c5]{margin-right:20px}.header-nav-menu .menu-text a[data-v-7d6329c5]:last-of-type{margin-right:0}.header-nav-menu .menu-text.left[data-v-7d6329c5]{float:left;padding-top:0}.header-nav-menu .menu-text.right[data-v-7d6329c5]{float:right;padding-top:0}.header-nav-menu .menu-text.right .active[data-v-7d6329c5]{color:#77bc1f}@media screen and (max-width:500px){.header-nav-menu .menu-text.right[data-v-7d6329c5]{float:left;margin-bottom:20px}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$e = "data-v-7d6329c5";
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxInput = /*@__PURE__*/(function (Vue) {
    function AnxInput() {
        Vue.apply(this, arguments);
        this.active = false;
        this.filled = false;
        this.updateInputField = "";
    }

    if ( Vue ) AnxInput.__proto__ = Vue;
    AnxInput.prototype = Object.create( Vue && Vue.prototype );
    AnxInput.prototype.constructor = AnxInput;

    var prototypeAccessors = { cssProps: { configurable: true } };
    /**Watch the updateInputField variable. When it changed, then it check if
     * the input field should be active or not (User is typing)
     */
    AnxInput.prototype.nameChanged = function nameChanged (newVal) {
        if (newVal.length) {
            this.active = true;
        }
    };
    /**FOR READONLY!
     * Watch the attribute/prop value. When the value change, then it set the updateInputField
     * variabel with the new value (need to be pass to the parent) and set the input-field to filled.
     */
    AnxInput.prototype.valueChanged = function valueChanged () {
        if (this.readonly !== false) {
            this.updateInputField = this.value;
            this.isFilled();
        }
    };
    /**After creation the value will be save in the updateInputField and check if it has the
     * state filled.
     */
    AnxInput.prototype.mounted = function mounted () {
        this.updateInputField = this.value;
        this.isFilled();
    };
    prototypeAccessors.cssProps.get = function () {
        return {
            "--input-width": this.width
        };
    };
    /** Check if the input-field is filled, Set class filled. */
    AnxInput.prototype.isFilled = function isFilled () {
        if (!this.updateInputField.length) {
            this.filled = false;
        }
        else {
            this.filled = true;
        }
    };
    /**When the User click in and out of the field, the state active will be set and
     * the state filled will be checked.
     */
    AnxInput.prototype.inputBlur = function inputBlur () {
        this.active = !this.active;
        this.isFilled();
    };

    Object.defineProperties( AnxInput.prototype, prototypeAccessors );

    return AnxInput;
}(Vue));
__decorate([
    Prop()
], AnxInput.prototype, "name", void 0);
__decorate([
    Prop({ default: "input-text-field" })
], AnxInput.prototype, "id", void 0);
__decorate([
    Prop()
], AnxInput.prototype, "label", void 0);
__decorate([
    Prop()
], AnxInput.prototype, "rules", void 0);
__decorate([
    Prop({ default: "100%" })
], AnxInput.prototype, "width", void 0);
__decorate([
    Prop()
], AnxInput.prototype, "assistiveText", void 0);
__decorate([
    Prop({ default: false })
], AnxInput.prototype, "readonly", void 0);
__decorate([
    Prop({ default: "" })
], AnxInput.prototype, "value", void 0);
__decorate([
    Watch("updateInputField")
], AnxInput.prototype, "nameChanged", null);
__decorate([
    Watch("value")
], AnxInput.prototype, "valueChanged", null);
AnxInput = __decorate([
    Component({
        components: {
            ValidationProvider: ValidationProvider
        }
    })
], AnxInput);
var script$f = AnxInput;

/* script */
var __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.readonly !== false)?_c('div',{staticClass:"anx-input",class:{ filled: _vm.filled },style:(_vm.cssProps)},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.updateInputField),expression:"updateInputField"}],class:_vm.errors && _vm.errors.length > 0 ? 'is-invalid' : '',attrs:{"id":_vm.id,"data-vv-as":_vm.name,"type":"text","name":_vm.name,"hide-details":"true","readonly":"readonly !== false ? true"},domProps:{"value":(_vm.updateInputField)},on:{"blur":_vm.inputBlur,"input":function($event){if($event.target.composing){ return; }_vm.updateInputField=$event.target.value;}}}),_vm._v(" "),_c('label',{attrs:{"for":_vm.id}},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")])]):_c('ValidationProvider',{attrs:{"name":_vm.name,"rules":_vm.rules},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var errors = ref.errors;
return [_c('div',{staticClass:"anx-input",class:{ active: _vm.active, filled: _vm.filled },style:(_vm.cssProps),on:{"click":function($event){_vm.active = true;}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.updateInputField),expression:"updateInputField"},{name:"validate",rawName:"v-validate",value:(_vm.rules),expression:"rules"}],class:errors && errors.length > 0 ? 'is-invalid' : '',attrs:{"id":_vm.id,"data-vv-as":_vm.name,"type":"text","name":_vm.name,"hide-details":"true"},domProps:{"value":(_vm.updateInputField)},on:{"blur":_vm.inputBlur,"input":[function($event){if($event.target.composing){ return; }_vm.updateInputField=$event.target.value;},function($event){return _vm.$emit('input', _vm.updateInputField)}]}}),_vm._v(" "),_c('label',{class:errors && errors.length > 0 ? 'error' : '',attrs:{"for":_vm.id}},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]),_vm._v(" "),(errors.length > 0)?_c('span',{staticClass:"error"},[_vm._v(_vm._s(errors[0]))]):(
        errors.length === 0 && _vm.assistiveText && _vm.assistiveText.length > 0
      )?_c('span',{staticClass:"assistiv"},[_vm._v(_vm._s(_vm.assistiveText))]):_vm._e()])]}}])})};
var __vue_staticRenderFns__$f = [];

  /* style */
  var __vue_inject_styles__$f = function (inject) {
    if (!inject) { return }
    inject("data-v-2fc4305a_0", { source: ".anx-input[data-v-2fc4305a]{color:#686868;display:block;font-family:Meta,Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;line-height:25.6px;max-width:100%;padding-top:20px;position:relative;width:var(--input-width);margin-bottom:30px}.anx-input input[data-v-2fc4305a]{outline:0}.anx-input label[data-v-2fc4305a]{bottom:0;color:#686868;cursor:default;display:block;font-family:Meta,Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;height:45px;left:0;line-height:25.6px;margin-bottom:5px;overflow:hidden;pointer-events:none;right:0;text-align:left;top:24px;white-space:nowrap;width:100%}.anx-input label[data-v-2fc4305a],.anx-input label[data-v-2fc4305a]:after{position:absolute;transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}.anx-input label[data-v-2fc4305a]:after{background-color:#77bc1f;bottom:15px;content:\"\";height:1px;left:45%;visibility:hidden;width:10px}.anx-input input[data-v-2fc4305a]{background-color:transparent;border-radius:0;border:none;border-bottom:1px solid #b5b5b5;color:#686868;cursor:text;display:block;box-sizing:border-box;font-family:Meta,Arial,Helvetica,sans-serif;font-size:16px;font-stretch:100%;font-style:normal;font-weight:400;height:34px!important;line-height:25.6px;margin:0;padding:6px 0;text-align:left;text-indent:0;text-rendering:auto;text-shadow:none;text-size-adjust:100%;text-transform:none;width:100%;word-spacing:0;writing-mode:horizontal-tb;-webkit-appearance:none;-webkit-rtl-ordering:logical}.anx-input input[data-v-2fc4305a]:read-only{border:none!important}.anx-input.active label[data-v-2fc4305a],.anx-input.filled label[data-v-2fc4305a]{color:#77bc1f;font-size:12px;height:65px;line-height:19.2px;top:4px;visibility:visible}.anx-input.active label[data-v-2fc4305a]:after{background-color:#77bc1f;left:0;visibility:visible;width:100%}.anx-input.active input[data-v-2fc4305a]{background-color:transparent;outline:0 none #686868}.anx-input>input.is-invalid[data-v-2fc4305a]{border-bottom:1px solid #d50000!important}.anx-input>input.is-invalid~label[data-v-2fc4305a]{color:#d50000}.anx-input>input.is-invalid[data-v-2fc4305a]:read-only{border:none!important}label.error[data-v-2fc4305a]{color:#d50000!important}label.error[data-v-2fc4305a]::after{background-color:#d50000!important}span.error[data-v-2fc4305a]{font-size:12px;color:#d50000;padding:0;white-space:nowrap}span.assistiv[data-v-2fc4305a]{font-size:12px;color:#d7d7d7;padding:0;white-space:nowrap}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$f = "data-v-2fc4305a";
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxModal = /*@__PURE__*/(function (Vue) {
    function AnxModal () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxModal.__proto__ = Vue;
    AnxModal.prototype = Object.create( Vue && Vue.prototype );
    AnxModal.prototype.constructor = AnxModal;

    

    return AnxModal;
}(Vue));
__decorate([
    Prop({ default: "TITLE" })
], AnxModal.prototype, "title", void 0);
__decorate([
    Prop({ default: true })
], AnxModal.prototype, "hasCloseButton", void 0);
AnxModal = __decorate([
    Component({
        components: {
            AnxButton: __vue_component__$1
        }
    })
], AnxModal);
var script$g = AnxModal;

/* script */
var __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal anx-modal",attrs:{"id":"modal"}},[_c('div',{class:'modal-dialog modal-dialog-scrollable'},[_c('div',{staticClass:"modal-content anx-modal-content"},[_c('div',{staticClass:"modal-header  anx-modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"},on:{"click":function($event){return _vm.$emit('close')}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_vm._v(" "),_c('div',{staticClass:"h2 modal-title heading"},[_vm._v("\n          "+_vm._s(_vm.title)+"\n        ")]),_vm._v(" "),_c('div',{staticClass:"small-line h2"},[_vm._v("\n          —\n        ")])]),_vm._v(" "),_c('div',{staticClass:"modal-body  anx-modal-body"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"modal-footer  anx-modal-footer"},[(_vm.hasCloseButton)?_c('anx-button',{attrs:{"text":this.$i18n.t('uiplugin.modal.closeButton')},on:{"submit":function($event){return _vm.$emit('close')}}}):_vm._e()],1)])])])};
var __vue_staticRenderFns__$g = [];

  /* style */
  var __vue_inject_styles__$g = function (inject) {
    if (!inject) { return }
    inject("data-v-7a0433b8_0", { source: ".anx-button[data-v-7a0433b8]{position:relative!important}.modal[data-v-7a0433b8]{position:fixed;top:0;left:0;z-index:1050;width:100%;height:100%;overflow:hidden;outline:0}.anx-modal .modal-dialog[data-v-7a0433b8]{background-color:#fff;width:500px;margin-left:auto;margin-right:auto;margin-top:178px}.anx-modal .anx-modal-content[data-v-7a0433b8]{position:relative;border-radius:0;border:none!important}.anx-modal .anx-modal-content .anx-modal-header[data-v-7a0433b8]{border-radius:0;color:#fff}.anx-modal .anx-modal-content .anx-modal-body[data-v-7a0433b8]{border-radius:0}.anx-modal .anx-modal-content .anx-modal-footer[data-v-7a0433b8]{border-radius:0}.anx-modal .anx-modal-content .anx-modal-footer .button[data-v-7a0433b8]{margin-right:0!important}.anx-modal .anx-modal-content .anx-modal-footer .button.center[data-v-7a0433b8]{margin:auto!important}.modal[data-v-7a0433b8]{display:inline;background:#00000080}.modal .modal-header[data-v-7a0433b8]{background-color:#003ca6;padding:25px 40px 15px 40px;height:94px;border-bottom:0;display:block;text-align:left}@media screen and (max-width:500px){.modal .modal-header[data-v-7a0433b8]{padding:30px 33px 10px 20px}}.modal .modal-header .modal-title[data-v-7a0433b8]{text-transform:uppercase;font-size:20px}.modal .modal-header button[data-v-7a0433b8]{background-color:transparent;border:none;position:absolute;color:#fff;text-shadow:none;opacity:1;font-weight:ligther;max-width:1px;font-size:medium;right:0;top:0}.modal .modal-header .close[data-v-7a0433b8]{cursor:pointer;padding:0 2rem;margin:0;font-size:34px;line-height:42px}.modal .modal-header .small-line[data-v-7a0433b8]{font-size:20px}.modal .modal-header span[data-v-7a0433b8]{color:#fff;font-size:34px;line-height:42px}.modal .modal-body[data-v-7a0433b8]{margin:40px;padding:0!important}@media screen and (max-width:500px){.modal .modal-body[data-v-7a0433b8]{margin:2.5rem 1.25rem 2.5rem 1.25rem}}.modal .modal-footer[data-v-7a0433b8]{border:none;padding:0 2.5rem 2.5rem 2.5rem;display:flex;justify-content:center}@media screen and (max-width:500px){.modal .modal-footer[data-v-7a0433b8]{padding:0 1.25rem 2.5rem 1.25rem}.modal .modal-footer button[data-v-7a0433b8]{margin:auto}.modal .modal-footer div[data-v-7a0433b8]{width:100%;padding-bottom:2.2rem}}.modal .modal-footer button[data-v-7a0433b8]{position:inherit}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$g = "data-v-7a0433b8";
  /* module identifier */
  var __vue_module_identifier__$g = undefined;
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxReadonly = /*@__PURE__*/(function (Vue) {
    function AnxReadonly () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) AnxReadonly.__proto__ = Vue;
    AnxReadonly.prototype = Object.create( Vue && Vue.prototype );
    AnxReadonly.prototype.constructor = AnxReadonly;

    AnxReadonly.prototype.copy = function copy (event) {
        if (this.copyOnClick !== null) {
            var range = document.createRange();
            range.selectNode(event.target);
            var selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
            document.execCommand("copy");
        }
    };

    return AnxReadonly;
}(Vue));
__decorate([
    Prop({ default: "anx-alert" })
], AnxReadonly.prototype, "name", void 0);
__decorate([
    Prop({ default: null })
], AnxReadonly.prototype, "copyOnClick", void 0);
__decorate([
    Prop({ default: null })
], AnxReadonly.prototype, "bold", void 0);
AnxReadonly = __decorate([
    Component({})
], AnxReadonly);
var script$h = AnxReadonly;

/* script */
var __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"anx-readonly",attrs:{"id":"testanx"},on:{"click":function($event){return _vm.copy($event)}}},[_c('div',{class:'inner-text ' + (_vm.bold !== null ? 'bold ' : '')},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$h = [];

  /* style */
  var __vue_inject_styles__$h = function (inject) {
    if (!inject) { return }
    inject("data-v-c8f4bda6_0", { source: ".anx-readonly[data-v-c8f4bda6]{background-color:#f8f8f8;border:1px solid #d7d7d7;margin:30px 0;width:100%}.anx-readonly .inner-text[data-v-c8f4bda6]{line-height:16px;padding:16px;color:#686868}.anx-readonly .inner-text.bold[data-v-c8f4bda6]{font-weight:800}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$h = "data-v-c8f4bda6";
  /* module identifier */
  var __vue_module_identifier__$h = undefined;
  /* functional template */
  var __vue_is_functional_template__$h = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$h = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxSelect = /*@__PURE__*/(function (Vue) {
    function AnxSelect() {
        Vue.apply(this, arguments);
        this.selected = this.options[0].value;
        this.selectedText = this.options[0].text;
        this.show = false;
        this.error = [];
    }

    if ( Vue ) AnxSelect.__proto__ = Vue;
    AnxSelect.prototype = Object.create( Vue && Vue.prototype );
    AnxSelect.prototype.constructor = AnxSelect;

    var prototypeAccessors = { cssProps: { configurable: true } };
    prototypeAccessors.cssProps.get = function () {
        return {
            width: this.width
        };
    };
    /**
     * Watch the selected variable. When selected is changed, the new value will be verify.
     * option "immediate:true" means, it will be execute before mounted
     * (this is important, for the validation observer)
     */
    AnxSelect.prototype.onSelectedChanged = async function onSelectedChanged (val) {
        if (val && this.validation) {
            await this.verify(val);
        }
    };
    /**
     * Verfiy the selected value and generate the error-message for the custom select.
     */
    AnxSelect.prototype.verify = async function verify (value) {
        var ref = await this.$validator.verify(value, "excluded:null", {
            name: this.label
        });
        var errors = ref.errors;
        this.error = errors;
    };
    /**
     * Reset the error, because after mount it shouldn't show the error message
     */
    AnxSelect.prototype.mounted = function mounted () {
        this.error = [];
    };
    /**
     * Set the variable with the selcted option and emit the input-event
     */
    AnxSelect.prototype.select = function select (option) {
        this.selected = option.value;
        this.selectedText = option.text;
        this.show = false;
        this.$emit("input", this.selected);
    };

    Object.defineProperties( AnxSelect.prototype, prototypeAccessors );

    return AnxSelect;
}(Vue));
__decorate([
    Prop({ default: "anx-select-choice" })
], AnxSelect.prototype, "id", void 0);
__decorate([
    Prop({ default: "Auswahl treffen" })
], AnxSelect.prototype, "label", void 0);
__decorate([
    Prop({
        default: function () {
            return [
                { value: "null", text: "Auswahl treffen" },
                { value: "Auswahl 1", text: "Auswahl 1" },
                { value: "Auswahl 2", text: "Auswahl 2" },
                { value: "Auswahl 3", text: "Auswahl 3" },
                { value: "Auswahl 4", text: "Auswahl 4" }
            ];
        }
    })
], AnxSelect.prototype, "options", void 0);
__decorate([
    Prop({ default: "100%" })
], AnxSelect.prototype, "width", void 0);
__decorate([
    Prop({ default: false })
], AnxSelect.prototype, "validation", void 0);
__decorate([
    Watch("selected", { immediate: false })
], AnxSelect.prototype, "onSelectedChanged", null);
AnxSelect = __decorate([
    Component({
        components: {
            ValidationProvider: ValidationProvider
        }
    })
], AnxSelect);
var script$i = AnxSelect;

/* script */
var __vue_script__$i = script$i;

/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.validation)?_c('ValidationProvider',{attrs:{"name":_vm.label,"rules":"excluded:null"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var errors = ref.errors;
return [_c('div',{staticClass:"anx-select",class:{ is_invalid: _vm.error.length > 0 || errors.length > 0 },style:(_vm.cssProps)},[_c('label',{attrs:{"for":_vm.id + '1'}},[_vm._v(" "+_vm._s(_vm.label))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],staticClass:"select-original",attrs:{"id":_vm.id + '1',"name":_vm.id},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.options),function(option){return _c('option',{key:option.value,domProps:{"value":option.value}},[_vm._v("\n        "+_vm._s(option.text))])}),0),_vm._v(" "),_c('div',{staticClass:"anx-select-div",on:{"click":function($event){_vm.show = !_vm.show;}}},[_vm._v("\n      "+_vm._s(_vm.selectedText)+"\n    ")]),_vm._v(" "),_c('ul',{staticClass:"anx-select-options",class:{ show: _vm.show }},_vm._l((_vm.options),function(option){return _c('li',{key:option.value,class:{ active: _vm.selected === option.value },attrs:{"rel":option.value},on:{"click":function($event){return _vm.select(option)}}},[_vm._v("\n        "+_vm._s(option.text)+"\n      ")])}),0),_vm._v(" "),(_vm.error.length > 0)?_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.error[0]))]):_c('span',{staticClass:"error"},[_vm._v(_vm._s(errors[0]))])])]}}],null,false,1239507568)}):_c('div',{staticClass:"anx-select",style:(_vm.cssProps)},[_c('label',{attrs:{"for":_vm.id + '1'}},[_vm._v(" "+_vm._s(_vm.label))]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected),expression:"selected"}],staticClass:"select-original",attrs:{"id":_vm.id + '1',"name":_vm.id},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.options),function(option){return _c('option',{key:option.value,domProps:{"value":option.value}},[_vm._v("\n      "+_vm._s(option.text))])}),0),_vm._v(" "),_c('div',{staticClass:"anx-select-div",on:{"click":function($event){_vm.show = !_vm.show;}}},[_vm._v("\n    "+_vm._s(_vm.selectedText)+"\n  ")]),_vm._v(" "),_c('ul',{staticClass:"anx-select-options",class:{ show: _vm.show }},_vm._l((_vm.options),function(option){return _c('li',{key:option.value,class:{ active: _vm.selected === option.value },attrs:{"rel":option.value},on:{"click":function($event){return _vm.select(option)}}},[_vm._v("\n      "+_vm._s(option.text)+"\n    ")])}),0)])};
var __vue_staticRenderFns__$i = [];

  /* style */
  var __vue_inject_styles__$i = function (inject) {
    if (!inject) { return }
    inject("data-v-499ea320_0", { source: ".show[data-v-499ea320]{display:block!important}.anx-select[data-v-499ea320]{font-family:Meta,Arial,Helvetica,sans-serif;cursor:pointer;display:inline-block;position:relative;width:var(--select-width);color:#686868;height:25px;margin-bottom:30px;font-size:16px}.anx-select.is_invalid label[data-v-499ea320]{color:#d50000}.anx-select.is_invalid .anx-select-div[data-v-499ea320]{color:#d50000}.anx-select.is_invalid .anx-select-div[data-v-499ea320]:after{background-image:url(../assets/icons/arrow-red-bottom.svg)}.anx-select span.error[data-v-499ea320]{display:block!important;opacity:1;font-size:12px;color:#d50000;padding:0;white-space:nowrap;top:12px;position:relative}.anx-select .select-original[data-v-499ea320]{display:none;visibility:hidden;opacity:0}.anx-select .anx-select-div[data-v-499ea320]{color:#77bc1f;border-bottom:1px solid #b5b5b5;position:absolute;top:0;right:0;bottom:-2px;left:0;background-color:transparent;-moz-transition:all .2s ease-in;-o-transition:all .2s ease-in;-webkit-transition:all .2s ease-in;transition:all .2s ease-in;text-align:right;padding:0 18px;width:var(--select-width)}.anx-select .anx-select-div[data-v-499ea320]:after{background-position:0 0;background-image:url(../assets/icons/arrow-green-bottom.svg);width:12px;height:11px;content:\"\";background-repeat:no-repeat;position:absolute;right:0;top:4px}.anx-select .anx-select-div[data-v-499ea320]:hover{background-color:transparent}.anx-select .anx-select-options[data-v-499ea320]{display:none;position:absolute;top:108%;right:0;left:0;z-index:999;margin:0;padding:0;list-style:none;background-color:#fff;border:1px solid #b5b5b5;border-top:none;width:var(--select-width)}.anx-select .anx-select-options li[data-v-499ea320]{text-align:right;padding-right:18px;padding-top:5px;margin:0;-moz-transition:all .15s ease-in;-o-transition:all .15s ease-in;-webkit-transition:all .15s ease-in;transition:all .15s ease-in;position:relative;height:25px}.anx-select .anx-select-options li.active[data-v-499ea320]:before{content:\"\";width:16px;height:16px;min-width:16px;background-image:url(../assets/icons/check-green.svg);background-repeat:no-repeat;position:absolute;top:5px;margin-left:-20px;background-position:50%}.anx-select .anx-select-options li[data-v-499ea320]:hover{color:#fff;background:#77bc1f}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$i = "data-v-499ea320";
  /* module identifier */
  var __vue_module_identifier__$i = undefined;
  /* functional template */
  var __vue_is_functional_template__$i = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$i = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxTable = /*@__PURE__*/(function (Vue) {
    function AnxTable () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxTable.__proto__ = Vue;
    AnxTable.prototype = Object.create( Vue && Vue.prototype );
    AnxTable.prototype.constructor = AnxTable;

    

    return AnxTable;
}(Vue));
__decorate([
    Prop({ default: false })
], AnxTable.prototype, "scrollable", void 0);
__decorate([
    Prop({ default: null })
], AnxTable.prototype, "height", void 0);
AnxTable = __decorate([
    Component({})
], AnxTable);
var script$j = AnxTable;

/* script */
var __vue_script__$j = script$j;

/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.scrollable)?_c('div',{staticClass:"anx-table-container"},[_c('div',{staticClass:"anx-table-container-scrollable",style:(_vm.height !== null ? ("height: " + _vm.height + ";") : '')},[_vm._t("default")],2),_vm._v(" "),(_vm.scrollable !== null)?_c('div',{staticClass:"scroll-shadow"}):_vm._e()]):_c('div',{staticClass:"anx-table-container"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$j = [];

  /* style */
  var __vue_inject_styles__$j = function (inject) {
    if (!inject) { return }
    inject("data-v-d9e65bae_0", { source: ".anx-table-container[data-v-d9e65bae]{position:relative;margin-bottom:40px}.anx-table-container .anx-table-container-scrollable[data-v-d9e65bae]{overflow-y:auto}.anx-table-container .scroll-shadow[data-v-d9e65bae]{position:absolute;bottom:0;z-index:10;width:100%;height:9px;background:transparent linear-gradient(180deg,transparent,rgba(0,0,0,.1)) 0 0 no-repeat padding-box}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$j = "data-v-d9e65bae";
  /* module identifier */
  var __vue_module_identifier__$j = undefined;
  /* functional template */
  var __vue_is_functional_template__$j = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$j = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxTableRow = /*@__PURE__*/(function (Vue) {
    function AnxTableRow () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxTableRow.__proto__ = Vue;
    AnxTableRow.prototype = Object.create( Vue && Vue.prototype );
    AnxTableRow.prototype.constructor = AnxTableRow;

    

    return AnxTableRow;
}(Vue));
__decorate([
    Prop({ default: {} })
], AnxTableRow.prototype, "item", void 0);
AnxTableRow = __decorate([
    Component({})
], AnxTableRow);
var script$k = AnxTableRow;

/* script */
var __vue_script__$k = script$k;

/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',{staticClass:"anx-table-row"},[_vm._t("default",_vm._l((_vm.item),function(content,name){return _c('td',{key:name},[_vm._v("\n      "+_vm._s(content)+"\n    ")])}))],2)};
var __vue_staticRenderFns__$k = [];

  /* style */
  var __vue_inject_styles__$k = function (inject) {
    if (!inject) { return }
    inject("data-v-f5ca9b76_0", { source: ".anx-table-row[data-v-f5ca9b76]{height:40px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$k = "data-v-f5ca9b76";
  /* module identifier */
  var __vue_module_identifier__$k = undefined;
  /* functional template */
  var __vue_is_functional_template__$k = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$k = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxTableCol = /*@__PURE__*/(function (Vue) {
    function AnxTableCol () {
        Vue.apply(this, arguments);
    }if ( Vue ) AnxTableCol.__proto__ = Vue;
    AnxTableCol.prototype = Object.create( Vue && Vue.prototype );
    AnxTableCol.prototype.constructor = AnxTableCol;

    

    return AnxTableCol;
}(Vue));
__decorate([
    Prop({ default: "" })
], AnxTableCol.prototype, "content", void 0);
AnxTableCol = __decorate([
    Component({})
], AnxTableCol);
var script$l = AnxTableCol;

/* script */
var __vue_script__$l = script$l;

/* template */
var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"anx-table-col"},[_vm._t("default",[_vm._v("\n    "+_vm._s(_vm.content)+"\n  ")])],2)};
var __vue_staticRenderFns__$l = [];

  /* style */
  var __vue_inject_styles__$l = function (inject) {
    if (!inject) { return }
    inject("data-v-369833ce_0", { source: ".anx-table-col[data-v-369833ce]{padding:.438rem .5rem .438rem .5rem;padding-left:8px;font-size:16px;vertical-align:middle}.anx-table-col img[data-v-369833ce]{max-height:20px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$l = "data-v-369833ce";
  /* module identifier */
  var __vue_module_identifier__$l = undefined;
  /* functional template */
  var __vue_is_functional_template__$l = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$l = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxTable$1 = /*@__PURE__*/(function (Vue) {
    function AnxTable () {
        Vue.apply(this, arguments);
    }

    if ( Vue ) AnxTable.__proto__ = Vue;
    AnxTable.prototype = Object.create( Vue && Vue.prototype );
    AnxTable.prototype.constructor = AnxTable;

    AnxTable.prototype.getWidthForColumn = function getWidthForColumn (index) {
        if (this.widths && index in this.widths) {
            return this.widths[index];
        }
        return "auto";
    };
    /** Converts camelCase to Text */
    AnxTable.prototype.camelCaseToText = function camelCaseToText (camelCase) {
        return camelCase.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
            return str.toUpperCase();
        });
    };

    return AnxTable;
}(Vue));
__decorate([
    Prop({ default: null })
], AnxTable$1.prototype, "scrollable", void 0);
__decorate([
    Prop({ default: null })
], AnxTable$1.prototype, "stripped", void 0);
__decorate([
    Prop({ default: null })
], AnxTable$1.prototype, "bordered", void 0);
__decorate([
    Prop({ default: null })
], AnxTable$1.prototype, "hover", void 0);
__decorate([
    Prop({ default: null })
], AnxTable$1.prototype, "height", void 0);
__decorate([
    Prop({ default: null })
], AnxTable$1.prototype, "uppercaseTitle", void 0);
__decorate([
    Prop({ default: [] })
], AnxTable$1.prototype, "items", void 0);
__decorate([
    Prop()
], AnxTable$1.prototype, "widths", void 0);
AnxTable$1 = __decorate([
    Component({
        components: {
            AnxTableContainer: __vue_component__$j,
            AnxTableRow: __vue_component__$k,
            AnxTableCol: __vue_component__$l
        }
    })
], AnxTable$1);
var script$m = AnxTable$1;

/* script */
var __vue_script__$m = script$m;

/* template */
var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('anx-table-container',{attrs:{"scrollable":_vm.scrollable !== null ? true : false,"height":_vm.height !== null ? _vm.height : 'auto'}},[_c('table',{class:'anx-table ' +
        (_vm.stripped !== null ? 'anx-table-striped ' : '') +
        (_vm.bordered !== null ? 'anx-table-bordered ' : '') +
        (_vm.scrollable !== null ? 'anx-table-scrollable ' : '') +
        (_vm.hover !== null ? 'anx-table-hover ' : '')},[_c('thead',{class:_vm.uppercaseTitle !== null ? 'text-uppercase' : ''},[_c('tr',_vm._l((_vm.items[0]),function(item,index){return _c('th',{key:index,attrs:{"scope":"col","width":_vm.getWidthForColumn(index)}},[_vm._v("\n          "+_vm._s(_vm.camelCaseToText(index))+"\n        ")])}),0)]),_vm._v(" "),_c('tbody',_vm._l((_vm.items),function(item,i){return _c('anx-table-row',{key:i,attrs:{"item":item}},_vm._l((item),function(content,name){return _c('anx-table-col',{key:name},[_vm._t(("" + name + i),[_vm._v("\n            "+_vm._s(content)+"\n          ")],{"content":content})],2)}),1)}),1)])])};
var __vue_staticRenderFns__$m = [];

  /* style */
  var __vue_inject_styles__$m = function (inject) {
    if (!inject) { return }
    inject("data-v-4c2441de_0", { source: ".anx-table[data-v-4c2441de]{color:#414141!important;border-collapse:collapse;text-align:left;width:100%;border:none}.anx-table thead[data-v-4c2441de]{background-color:#ececec}.anx-table thead tr th[data-v-4c2441de]{padding:.5rem .5rem .438rem .5rem}.anx-table.anx-table-bordered[data-v-4c2441de]{border:1px solid #ddd!important}.anx-table.anx-table-bordered thead tr th[data-v-4c2441de]{border:1px solid #ddd!important;border-bottom:2px solid #ddd!important}.anx-table.anx-table-scrollable[data-v-4c2441de]{overflow-y:auto}.scroll-shadow[data-v-4c2441de]{position:absolute;bottom:0;z-index:10;width:100%;height:9px;background:transparent linear-gradient(180deg,transparent,rgba(0,0,0,.1)) 0 0 no-repeat padding-box}", map: undefined, media: undefined })
,inject("data-v-4c2441de_1", { source: ".anx-table.anx-table-bordered tbody tr{border:1px solid #ddd!important}.anx-table.anx-table-bordered tbody tr td{border:1px solid #ddd!important}.anx-table.anx-table-striped tbody tr:nth-of-type(odd){background-color:#f8f8f8!important}.anx-table.anx-table-hover tbody tr:hover{background-color:#ececec!important}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$m = "data-v-4c2441de";
  /* module identifier */
  var __vue_module_identifier__$m = undefined;
  /* functional template */
  var __vue_is_functional_template__$m = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$m = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnxTextarea = /*@__PURE__*/(function (Vue) {
    function AnxTextarea() {
        Vue.apply(this, arguments);
        this.message = "";
    }

    if ( Vue ) AnxTextarea.__proto__ = Vue;
    AnxTextarea.prototype = Object.create( Vue && Vue.prototype );
    AnxTextarea.prototype.constructor = AnxTextarea;

    var prototypeAccessors = { cssProps: { configurable: true } };
    prototypeAccessors.cssProps.get = function () {
        return {
            "--textarea-width": this.width
        };
    };

    Object.defineProperties( AnxTextarea.prototype, prototypeAccessors );

    return AnxTextarea;
}(Vue));
__decorate([
    Prop({ default: "anx-textarea" })
], AnxTextarea.prototype, "id", void 0);
__decorate([
    Prop({ default: "Additional Text" })
], AnxTextarea.prototype, "label", void 0);
__decorate([
    Prop({ default: "4" })
], AnxTextarea.prototype, "rows", void 0);
__decorate([
    Prop({ default: false })
], AnxTextarea.prototype, "disabled", void 0);
__decorate([
    Prop({ default: "100%" })
], AnxTextarea.prototype, "width", void 0);
__decorate([
    Prop({ default: false })
], AnxTextarea.prototype, "validation", void 0);
__decorate([
    Prop({ default: "required" })
], AnxTextarea.prototype, "rules", void 0);
AnxTextarea = __decorate([
    Component({
        components: {
            ValidationProvider: ValidationProvider
        }
    })
], AnxTextarea);
var script$n = AnxTextarea;

/* script */
var __vue_script__$n = script$n;

/* template */
var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.validation)?_c('ValidationProvider',{attrs:{"name":"textarea","rules":_vm.rules},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var errors = ref.errors;
return [_c('div',{class:errors && errors.length > 0 ? 'anx-textarea is-invalid' : 'anx-textarea',style:(_vm.cssProps)},[_c('textarea',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.rules),expression:"rules"},{name:"model",rawName:"v-model",value:(_vm.message),expression:"message"}],class:{ filled: _vm.message.length >= 1 },attrs:{"id":_vm.id,"name":_vm.id,"rows":_vm.rows,"disabled":_vm.disabled},domProps:{"value":(_vm.message)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.message=$event.target.value;},function($event){return _vm.$emit('input', _vm.message)}]}}),_vm._v(" "),_c('label',{attrs:{"id":"textarea-label","for":_vm.id}},[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(errors[0]))])])]}}],null,false,1147050558)}):_c('div',{staticClass:"anx-textarea",style:(_vm.cssProps)},[_c('textarea',{directives:[{name:"validate",rawName:"v-validate",value:('required'),expression:"'required'"},{name:"model",rawName:"v-model",value:(_vm.message),expression:"message"}],class:{ filled: _vm.message.length >= 1 },attrs:{"id":_vm.id,"name":_vm.id,"rows":_vm.rows,"disabled":_vm.disabled},domProps:{"value":(_vm.message)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.message=$event.target.value;},function($event){return _vm.$emit('input', _vm.message)}]}}),_vm._v(" "),_c('label',{attrs:{"id":"textarea-label","for":_vm.id}},[_vm._v(_vm._s(_vm.label))])])};
var __vue_staticRenderFns__$n = [];

  /* style */
  var __vue_inject_styles__$n = function (inject) {
    if (!inject) { return }
    inject("data-v-7b8e154e_0", { source: ".anx-textarea[data-v-7b8e154e]{font-family:Meta,Arial,Helvetica,sans-serif;width:var(--textarea-width);display:block;position:relative;padding-top:9px;margin-bottom:30px}@media only screen and (width:1125px),only screen and (width:1200px){.anx-textarea[data-v-7b8e154e]{display:inline-block!important}}.anx-textarea.is-invalid>textarea[data-v-7b8e154e],.anx-textarea.is-invalid>textarea[data-v-7b8e154e]:focus{border:1px solid #d50000}.anx-textarea.is-invalid>textarea:focus~label[data-v-7b8e154e],.anx-textarea.is-invalid>textarea~label[data-v-7b8e154e]{color:#d50000!important}.anx-textarea textarea[data-v-7b8e154e]{width:var(--textarea-width);padding:20px 17px 20px 17px;border:1px solid #b5b5b5;color:#686868!important;font-family:Meta,Arial,Helvetica,sans-serif;font-size:16px;resize:vertical;overflow:auto}.anx-textarea textarea.filled[data-v-7b8e154e],.anx-textarea textarea[data-v-7b8e154e]:focus{border:1px solid #77bc1f;outline:0}.anx-textarea textarea.filled+label[data-v-7b8e154e],.anx-textarea textarea:focus+label[data-v-7b8e154e]{color:#77bc1f!important;margin-left:15px;background-color:#fff;font-size:12px!important;opacity:1!important;z-index:1;transition:all .1s ease;position:absolute;left:0;top:4px;padding:0 2px 0 2px}.anx-textarea textarea.filled placeholder[data-v-7b8e154e],.anx-textarea textarea:focus placeholder[data-v-7b8e154e]{display:none}.anx-textarea textarea+label[data-v-7b8e154e]{color:#686868!important;margin-left:17px;margin-bottom:0;background-color:transparent;font-size:16px!important;opacity:1!important;z-index:1;transition:all .1s ease;left:0;top:24px;position:absolute;pointer-events:none}.anx-textarea textarea[disabled] label[data-v-7b8e154e]{opacity:0!important}.anx-textarea textarea:not([disabled]) label[data-v-7b8e154e]{opacity:1}span.error[data-v-7b8e154e]{font-size:12px;color:#d50000;padding:0;white-space:nowrap;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$n = "data-v-7b8e154e";
  /* module identifier */
  var __vue_module_identifier__$n = undefined;
  /* functional template */
  var __vue_is_functional_template__$n = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$n = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    false,
    createInjector,
    undefined,
    undefined
  );

var Components = {
    AnxAlert: __vue_component__,
    AnxButton: __vue_component__$1,
    AnxCard: __vue_component__$6,
    AnxCheckbox: __vue_component__$7,
    AnxContainer: __vue_component__$8,
    AnxContent: __vue_component__$9,
    AnxFooter: __vue_component__$a,
    AnxForm: __vue_component__$b,
    AnxGlobal: __vue_component__$c,
    AnxHeader: __vue_component__$e,
    AnxIcon: __vue_component__$3,
    AnxInput: __vue_component__$f,
    AnxLink: __vue_component__$2,
    AnxModal: __vue_component__$g,
    AnxParagraph: __vue_component__$5,
    AnxReadonly: __vue_component__$h,
    AnxSelect: __vue_component__$i,
    AnxTable: __vue_component__$m,
    AnxTableCol: __vue_component__$l,
    AnxTableContainer: __vue_component__$j,
    AnxTableRow: __vue_component__$k,
    AnxTextarea: __vue_component__$n,
    AnxTitle: __vue_component__$4
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
