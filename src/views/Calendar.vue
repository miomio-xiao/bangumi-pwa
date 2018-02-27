<template>
  <div class="container">
    <ul class="calendar">
      <li v-for="(calendar, i) in calendars"
          :key="i"
          class="list">
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
}
.list {
  flex: 1;
  margin-bottom: 10px;
  padding: 8px 0;
  background: #fff;
}
</style>
