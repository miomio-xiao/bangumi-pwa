<template>
  <ul class="calendar"
      v-if="!loading">
    <li v-for="(calendar, i) in calendars"
        :key="i"
        class="calendar__list">
      <WeekdayCard :calendar="calendar"></WeekdayCard>
    </li>
  </ul>
  <Loading v-else
           :full="true"></Loading>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api';
import Loading from '@/components/Loading.vue';
import WeekdayCard from '@/components/WeekdayCard/index.vue';
import { offset } from '@/utils';

@Component({
  name: 'calendar',
  components: {
    WeekdayCard,
    Loading
  }
})
export default class Calendar extends Vue {
  calendars: Types.ICalendar[] = [];
  loading: boolean = false;

  nowDay: number = new Date().getDay();

  getSortCalendar(data: Types.ICalendar[]): Types.ICalendar[] {
    const index = data.findIndex(
      ({ weekday }) => weekday.id % 7 === this.nowDay
    );
    return offset(data, index);
  }

  async created() {
    this.loading = true;
    try {
      const data = await api.getCalendars();
      this.calendars = this.getSortCalendar(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="stylus" scoped>
.calendar__list {
  margin-bottom: 10px;
  padding: 8px 0;
  background: #fff;
}
</style>
