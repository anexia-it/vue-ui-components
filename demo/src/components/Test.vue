<template>
  <div>
    <h1>This is a test</h1>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Test extends Vue {}
</script>
