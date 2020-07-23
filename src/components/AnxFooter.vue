<template>
  <div class="anx-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <hr />
          <div class="anx-footer-elements">
            <img
              class="anx-footer-logo"
              alt="anx-footer-logo"
              v-bind:src="img"
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
            <img id="footer-img-mobile" v-bind:src="img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxFooter extends Vue {
  @Prop({ default: require("../assets/anexia.svg") }) img!: string;

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

@media screen and (max-width: 500px){
  display: none;
  }
}
#footer-img-mobile {
    display: none;
  @media screen and (max-width: 500px){
    display: inline-block;
  }
}
.anx-footer {
  display: flex;
  height: 100px;
}
.anx-footer-elements {
  display: flex;
}
.anx-footer-right {
  text-align: right;
  width: 100%;
}
.anx-footer-text {
  @media screen and (max-width: 500px){
    margin-bottom: 20px;
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
  margin-bottom: 1rem;
  border: 0;
  box-sizing: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
