<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="header-container d-flex">
            <div class="header-image">
              <anx-icon alt="anx-header-logo" :icon="img" />
            </div>
            <div class="header-language-nav" v-if="$i18n">
              <div v-if="!menus">
                <I18nLangSwitcher />
              </div>
            </div>
          </div>
          <hr />
          <div class="header-nav-menu" v-if="menus">
            <div class="menu-text left">
              <!--add DTO -->
              <a v-for="menu in menus" :key="menu.id" :href="`${menu.link}`">
                {{ menu.menu }}
              </a>
            </div>
            <div class="menu-text right" v-if="$i18n">
              <div v-if="menus">
                <I18nLangSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxIcon from "./AnxIcon.vue";
import I18nLangSwitcher from "./I18nLangSwitcher.vue";

@Component({
  components: { I18nLangSwitcher, AnxIcon }
})
export default class AnxHeader extends Vue {
  @Prop({ default: "anexia-logo" }) img!: string;
  @Prop({ default: null }) menus!: Array<object>;

  private mounted() {
    const hmenu = document.querySelectorAll(
      ".header-nav-menu > .menu-text.left > a"
    );

    let path = window.location.pathname;
    hmenu.forEach(el => {
      if (path[path.length - 1] !== "/") {
        path += "/";
      }
      if ((el as HTMLElement).getAttribute("href") === path) {
        el.classList.add("active");
      }
    });

    return;
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

hr {
  background-color: $anx-primary-blue;
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 20px;
  border: 0;
  box-sizing: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.header-container {
  margin-top: 30px;
  margin-bottom: 10px;
  .header-language-nav {
    width: 100%;
    text-align: right;
    margin: auto 0 auto 0;
    color: $anx-primary-white;
  }
}

.header {
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  display: flex;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
img {
  height: 45px;
}
a {
  color: $anx-primary-green;
  text-decoration: none;
  &.active {
    color: $anx-primary-white;
    border-bottom: 1px solid $anx-primary-green;
  }
}
a:hover {
  text-decoration: none;
  color: $anx-primary-green;
}

.header-nav-menu {
  display: table;
  // padding-top: 17px;
  margin-bottom: 35px;
  width: 100%;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column-reverse;
    padding-top: none;
  }
  .menu-text {
    a {
      margin-right: 20px;
    }
    a:last-of-type {
      margin-right: 0;
    }
    &.left {
      float: left;
      padding-top: 0;
      @media screen and (max-width: 500px) {
      }
    }
    &.right {
      float: right;
      padding-top: 0;
      .active {
        color: $anx-primary-green;
      }
      @media screen and (max-width: 500px) {
        float: left;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
