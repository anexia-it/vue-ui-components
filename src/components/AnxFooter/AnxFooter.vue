<template>
  <div class="anx-footer-container" id="anx-footer">
    <div class="anx-footer" :style="cssProps">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <anx-hr-line
              color="blue"
              :margin-top="marginTop"
              margin-bottom="20px"
            />
            <div class="anx-footer-elements">
              <div class="anx-footer-desktop">
                <slot name="icon">
                  <anx-icon
                    v-if="icon != null"
                    class="anx-footer-logo"
                    alt="anx-footer-logo"
                    height="40px"
                    :icon="icon"
                  />
                </slot>
              </div>

              <div class="anx-footer-right">
                <div class="anx-footer-text">
                  <!-- @slot use this slot to overwrite the default text for the footer -->
                  <slot>
                    <div class="anx-footer-text copyright">
                      <span v-if="showCopyrightDate">
                        {{ copyrightDateFrom }} - {{ new Date().getFullYear() }}
                      </span>
                      {{ companyName }}
                    </div>
                    <anx-link
                      v-for="(link, i) in links"
                      :key="i"
                      :href="link.link"
                    >
                      {{ link.text }}
                    </anx-link>
                  </slot>
                </div>
              </div>
            </div>
            <div class="anx-footer-mobile">
              <!-- @slot use this slot to manipulate the icon in the footer -->
              <slot name="icon">
                <anx-icon
                  v-if="icon != null"
                  class="anx-footer-logo"
                  alt="anx-footer-logo"
                  height="40px"
                  :icon="icon"
                />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxIcon from "../AnxIcon/AnxIcon.vue";
import AnxHrLine from "../AnxHrLine/AnxHrLine.vue";
import AnxLink from "../AnxLink/AnxLink.vue";

/**
 * The *anx-footer* is a simple footer that is displayed on the bottom of the page
 */
@Component({ components: { AnxIcon, AnxHrLine, AnxLink } })
export default class AnxFooter extends Vue {
  /** The links for the footer */
  @Prop({ default: null }) links!: Array<{ text: string; link: string }> | null;

  /** The icon for the footer. If you want to use images, use the named slot "icon". When providing *null*, no icon is rendered */
  @Prop({ default: "anexia" }) icon!: string | null;

  /**Specify the width of the Footer. Due to the padding, the provided width is not the actual width (530px => 500px real width)*/
  @Prop({ default: "530px" }) width!: string;

  /** This is the margin top for the footer */
  @Prop({ default: "0px" }) marginTop!: string;

  /** This is the name of the company that will be displayed in the footer */
  @Prop({ default: "Anexia Internetdienstleistungs GmbH" })
  companyName!: string;

  /** Show a copyright note in the footer */
  @Prop({ default: true }) showCopyrightDate!: boolean;

  /** The founding date for the copyright note */
  @Prop({ default: 2006 }) copyrightDateFrom!: number;

  get cssProps() {
    return {
      "--width": this.width
    };
  }

  private footerLinks: Array<object> = [];

  /** The current state of the footer, if it is fixed to bottom or not */
  private bottom = false;

  /** If the document height is to less, the footer should be fixed to the bottom of the page */
  private setFooter() {
    const footer = document.getElementById("anx-footer") as HTMLElement;

    /** Check if the footer has been found and is on the page */
    if (footer) {
      /** If the footer is fixed to bottom, the height has to be added to document.body.scrollHeight */
      let documentHeight = document.body.scrollHeight;
      if (this.bottom) documentHeight += footer.scrollHeight;

      /** Compare the height of the document with the actual window height */
      if (documentHeight < window.innerHeight) {
        footer.classList.add("bottom");
        this.bottom = true;
      } else {
        footer.classList.remove("bottom");
        this.bottom = false;
      }
    }
  }

  private mounted() {
    this.setFooter();
    /** Set footer on window resize */
    window.addEventListener("resize", this.setFooter);
    /** Additionally add a listener for height change of document.body */
    this.onElementHeightChange(document.body, this.setFooter);
  }

  /** Custom function to listen on height change of elements */
  private onElementHeightChange(elm: HTMLElement, callback: () => void) {
    let lastHeight = elm.clientHeight,
      newHeight;
    (function run() {
      newHeight = elm.clientHeight;
      if (lastHeight != newHeight) callback();
      lastHeight = newHeight;

      window.setTimeout(run, 100);
    })();
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/_variables.scss";

.anx-footer-container.bottom {
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.anx-footer-mobile,
.anx-footer-desktop {
  img {
    min-width: 64px;
  }
}

.anx-footer-logo {
  width: 64px;
  max-height: 40px;

  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    display: none;
  }
}
.anx-footer-mobile {
  display: none;
  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    margin-right: auto;
    margin-left: auto;
    display: inherit;
    margin-bottom: 50px;
    text-align: center;
  }
}
.anx-footer-desktop {
  @media screen and (max-width: 500px),
    (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    display: none;
  }
}
.anx-footer {
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;
  width: var(--width);
  display: flex;
  height: 100%;
  padding-bottom: 20px;
  @media screen and (max-width: 500px) {
    width: 100%;
    padding-bottom: 0px;
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
    color: $anx-secondary-color;
    text-decoration: none;
    &:not(:last-of-type):after {
      content: " | ";
    }
    &:hover {
      color: $anx-secondary-color-dark;
      -webkit-transition: all 0.2s ease-in-out;
      -moz-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
    }
  }
}
hr {
  background-color: $anx-primary-color;
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 20px;
  border: 0;
  box-sizing: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
