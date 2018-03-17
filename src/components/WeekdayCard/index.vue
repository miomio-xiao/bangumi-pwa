<template>
  <section class="weekday-card">
    <header>
      <h2 class="weekday__title">{{ title }}</h2>
    </header>
    <div class="wrapper"
         ref="wrapper">
      <ul class="weekday__content"
          :style="listStyles">
        <li v-for="(item, i) in calendar.items"
            :key="i"
            class="item">
          <WeekdaySubjectItem :subject="item"></WeekdaySubjectItem>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BScroll from 'better-scroll';

import WeekdaySubjectItem from './WeekdaySubjectItem.vue';

@Component({
  components: {
    WeekdaySubjectItem
  }
})
export default class WeekdayCard extends Vue {
  @Prop()
  calendar!: Types.ICalendar

  private scroll!: BScroll

  get title() {
    return this.calendar.weekday.en;
  }

  get listStyles() {
    const width = this.calendar.items.length * 120;
    return {
      width: width + 'px'
    }
  }

  mounted() {
    this.$nextTick(() => {
      const wrapper: Element = this.$refs.wrapper as Element;
      this.scroll = new BScroll(wrapper, {
        scrollX: true,
        eventPassthrough: 'vertical',
        click: true
      });
    })
  }
}
</script>

<style lang="scss" scoped>
.weekday-card {
  margin: 0;
  overflow: hidden;
}
header {
  padding: 0 10px;
  border-left: 4px solid pink;
  text-align: left;
  margin: 0 0 15px;
  .weekday__title {
    display: inline-block;
    min-width: 4em;
    margin: 0;
    padding-left: 0;
    padding-bottom: 0;
    font-size: 18px;
    font-weight: normal;
    color: #111;
  }
}
.wrapper {
  width: 100vw;
  height: 160px;
  .weekday__content {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
