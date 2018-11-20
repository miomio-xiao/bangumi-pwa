<template>
  <div class="page">
    <Header fixed
            hasSearch />
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

import Header from '@/components/Header/index.vue';
import WeekdayCard from '@/components/WeekdayCard/index.vue';

@Component({
  name: 'calendar',
  components: {
    Header,
    WeekdayCard
  }
})
export default class Calendar extends Vue {
  private title: string = 'bangumi';
  private calendars: Types.ICalendar[] = [];

  async created() {
    try {
      const data = await api.getCalendars();
      this.calendars = data;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="stylus" scoped>
.calendar {
  margin-top: 56px;
  background: #f5f5f5;

  &__list {
    flex: 1;
    margin-bottom: 10px;
    padding: 8px 0;
    background: #fff;
  }
}
</style>
