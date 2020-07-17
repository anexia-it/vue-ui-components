<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="header-container d-flex">
            <div class="header-image">
              <img alt="anx-header-logo" v-bind:src="img" />
            </div>
            <div class="header-language-nav" v-if="langSwitch === true">
              <!-- implement Language Switch -->
              <I18nLangSwitcher />
            </div>
          </div>
          <hr />
          <div class="header-nav-menu" v-if="menus">
            <div class="menu-text left">
              <!--add DTO -->
              <a
                v-for="menu in this.menus"
                :key="menu.id"
                :href="`${menu.link}`"
              >
                {{ menu.menu }}
              </a>
            </div>
             <div class="menu-text right" v-if="langSwitch === true">
              <!-- implement Language Switch -->
              <i18n-lang-switcher />
              <!--<a class="active">en</a>/ <a>de</a>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import I18nLangSwitcher from './I18nLangSwitcher.vue'

@Component({
    components: { I18nLangSwitcher }
})
export default class AnxHeader extends Vue {
  @Prop({ default: false }) langSwitch!: boolean;
  @Prop({ default: require("@/assets/anexia.svg") }) img!: string;
  @Prop({ default: null }) menus!: Array<object>;

  private mounted() {
    return;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/bootstrap-grid.scss";

hr {
  background-color: $anx-primary-blue;
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
      box-sizing: inherit;
  border-top: 1px solid rgba(0,0,0,.1);
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
  // background-color: #002d6e;
  background-color: $anx-dark-blue;
}
img {
  // margin-top: 60px;
  height: 45px;
  // margin-bottom: 30px;
}
a {
  color: $anx-primary-white;
  text-decoration: none;
  &.active {
    color: $anx-primary-white;
    border-bottom: 1px solid $anx-primary-green;
  }
}
a:hover{
  text-decoration: none;
  color: $anx-primary-green;
}

.header-nav-menu {
    display: table;
    padding-top: 17px;
    margin-bottom: 35px;
    width: 100%;

    .menu-text{
        a{
          margin-right: 20px;
        }
        a:last-of-type{
            margin-right: 0;
        }
        &.left{
          float: left;
          padding-top:0;
          @media screen and (max-width: 500px) {
          }
        }
        &.right{
          float: right;
          padding-top:0;
          .active{
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
