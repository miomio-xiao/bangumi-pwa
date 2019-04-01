<template>
  <section class="weekday-card">
    <header>
      <h2 class="weekday__title">{{ title }}</h2>
    </header>
    <div class="wrapper">
      <Scroll ref="scroll"
              direction="horizontal"
              eventPassthrough="vertical">
        <ul class="weekday__content"
            :style="listStyles">
          <li v-for="(item, i) in calendar.items"
              :key="i"
              class="item">
            <WeekdaySubjectItem :subject="item"></WeekdaySubjectItem>
          </li>
        </ul>
      </Scroll>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import WeekdaySubjectItem from './WeekdaySubjectItem.vue';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'WeekdayCard',
  components: {
    WeekdaySubjectItem,
    Scroll
  }
})
export default class WeekdayCard extends Vue {
  @Prop()
  calendar!: Types.ICalendar;

  scroll!: Scroll;

  get title() {
    return this.calendar.weekday.cn;
  }

  get listStyles() {
    const width = this.calendar.items.length * 120;
    return {
      width: width + 'px'
    };
  }

  mounted() {
    this.$nextTick(() => {
      this.scroll = this.$refs.scroll;
      this.scroll.initScroll();
    });
  }
}
</script>

<style lang="stylus" scoped>
.weekday-card {
  margin: 0;
  overflow: hidden;
}

header {
  padding: 0 10px;
  border-left: 4px solid $primary-color;
  text-align: left;
  margin: 0 0 10px;

  .weekday__title {
    display: inline-block;
    min-width: 4em;
    margin: 0;
    padding-left: 0;
    padding-bottom: 0;
    font-size: 14px;
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
