<template>
  <div id="app">
    <keep-alive :include="caches">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private caches: Array<string> = ['home', 'calendar'];
}
</script>


<style lang="scss">
@import './assets/common.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
