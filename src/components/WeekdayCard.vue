<template>
  <section class="container">
    <header>
      <h2 class="title">{{ title }}</h2>
    </header>
    <div class="wrapper"
         ref="wrapper">
      <ul class="content"
          :style="listStyles">
        <li v-for="(item, i) in calendar.items"
            :key="i"
            class="item">
          <SubjectItem :subject="item"></SubjectItem>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BScroll from 'better-scroll';

import SubjectItem from '@/components/SubjectItem.vue';

type calendar = {
  items: Array<any>;
  weekday: any;
};

@Component({
  components: {
    SubjectItem
  }
})
export default class WeekdayCard extends Vue {
  @Prop()
  calendar!: calendar

  scroll!: BScroll

  get title() {
    return this.calendar.weekday.en;
  }

  get listStyles() {
    const width = this.calendar.items.length * 100 + 40;
    return {
      width: width + 'px'
    }
  }

  mounted() {
    this.$nextTick(() => {
      const wrapper: Element = this.$refs.wrapper as Element;
      this.scroll = new BScroll(wrapper, {
        scrollX: true,
        click: true
      });
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  overflow: hidden;
}
header {
  padding: 0 10px;
  border-left: 4px solid pink;
  text-align: left;
  margin: 0 0 15px;
  .title {
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
  .content {
    position: relative;
    display: flex;
    justify-content: center;
  }
}
</style>
