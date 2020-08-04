<template>
  <div class="anx-footer" :style="cssProps">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <hr />
          <div class="anx-footer-elements">
            <anx-icon
              class="anx-footer-logo"
              alt="anx-footer-logo"
              :img="img"
            />

            <div class="anx-footer-right">
              <div class="anx-footer-text">
                <div class="anx-footer-text copyright">
                  2006 - {{ new Date().getFullYear() }} Anexia
                  Internetdienstleistungs GmbH
                </div>
                <!--                    <a>impressum </a>| <a>kontak</a>-->
                <a
                  v-for="link in this.footerLinks"
                  :key="link.id"
                  :href="`${link.link}`"
                >
                  {{ $t(link.text) }}
                </a>
              </div>
            </div>
          </div>
          <anx-icon class="anx-footer-logo" id="footer-img-mobile" :img="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxIcon from "./AnxIcon.vue";

@Component({ components: { AnxIcon } })
export default class AnxFooter extends Vue {
  @Prop({ default: "anexia-logo" }) img!: string;
  /**Specify the width of the Footer 530px => 500px real width (15px padding for mobile)*/
  @Prop({ default: "530px" }) width!: string;

  get cssProps() {
    return {
      "--width": this.width
    };
  }

  private footerLinks: Array<object> = [];
  mounted() {
    this.createFooterLinks();
  }
  private createFooterLinks() {
    Object.keys(this.$i18n.t("uiplugin.footer.text")).forEach(element => {
      this.footerLinks.push({
        text: "uiplugin.footer.text." + element,
        link: "uiplugin.footer.link." + element
      });
    });
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.anx-footer-logo {
  width: 64px;

  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    display: none;
  }
}
#footer-img-mobile {
  display: none;
  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    margin-right: auto;
    margin-left: auto;
    display: inherit;
    margin-bottom: 50px;
  }
}
.anx-footer {
  margin-left: auto;
  margin-right: auto;
  width: var(--width);
  display: flex;
  height: 100px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
.anx-footer-elements {
  display: flex;
}
.anx-footer-right {
  text-align: right;
  width: 100%;
  flex-direction: column;
  -ms-flex-direction: column;
  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    margin-bottom: 20px;
  }
}
.anx-footer-text {
  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    display: block;
    text-align: center;
  }
  color: $anx-primary-white;
  &.copyright::before {
    content: "\00A9";
  }
  a {
    color: $anx-primary-green;
    text-decoration: none;
    &:not(:last-of-type):after {
      content: " | ";
    }
    &:hover {
      color: $anx-dark-green;
      -webkit-transition: all 0.2s ease-in-out;
      -moz-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
    }
  }
}
hr {
  background-color: $anx-primary-blue;
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 20px;
  border: 0;
  box-sizing: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
