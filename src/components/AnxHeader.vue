<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="header-image">
            <img alt="anx-header-logo" v-bind:src="img" />
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxHeader extends Vue {
  @Prop({ default: require("@/assets/anexia.svg") }) img!: string;
}
</script>

<style scoped lang="scss">
.header {
  background-color: #002d6e;
}
img {
  margin-top: 60px;
  height: 45px;
  margin-bottom: 30px;
}
</style>
