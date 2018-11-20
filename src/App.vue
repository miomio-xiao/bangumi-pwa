<template>
  <v-app id="app"
         v-scroll="onScroll">
    <keep-alive :include="caches">
      <router-view />
    </keep-alive>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import bus from '@/EventBus';
import { debounce } from '@/utils/decorator';

@Component
export default class App extends Vue {
  private caches: Array<string> = ['home', 'calendar'];

  @debounce(200)
  onScroll() {
    let offsetTop = window.pageYOffset || document.documentElement.scrollTop;

    bus.$emit('page-scroll', { offsetTop });
  }
}
</script>


<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
