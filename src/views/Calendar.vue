<template>
  <div class="page">
    <v-toolbar dark
               color="pink">
      <h1 class="page__title">{{ title }}</h1>
      <v-spacer></v-spacer>
      <v-btn icon
             to="/search">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <ul class="calendar">
      <li v-for="(calendar, i) in calendars"
          :key="i"
          class="calendar__list">
        <WeekdayCard :calendar="calendar"></WeekdayCard>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '../api';

import WeekdayCard from '@/components/WeekdayCard.vue';

type calendar = {
  items: Array<Object>;
  weekday: Object;
};

@Component({
  components: {
    WeekdayCard
  }
})
export default class Calendar extends Vue {
  private title: string = 'bangumi';
  private calendars: Array<calendar> = [];

  async created() {
    try {
      const data = await api.getCalendars();
      console.log(data);
      this.calendars = data;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  background: #f5f5f5;
  &__list {
    flex: 1;
    margin-bottom: 10px;
    padding: 8px 0;
    background: #fff;
  }
}
</style>
