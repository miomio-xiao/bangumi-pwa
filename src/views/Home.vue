<template>
  <div class="home">
    <Calendar></Calendar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from './Calendar.vue';

@Component({
  name: 'home',
  components: {
    Calendar
  }
})
export default class Home extends Vue {}
</script>
