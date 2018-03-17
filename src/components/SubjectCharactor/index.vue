<template>
  <div class="wrapper"
       ref="wrapper">
    <ul class="wrapper__content"
        :style="listStyles">
      <li v-for="(item, i) in charactors"
          :key="i"
          class="item">
        <CharactorCard :charactor="item"></CharactorCard>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BScroll from 'better-scroll';

import CharactorCard from './CharactorCard.vue';

@Component({
  components: {
    CharactorCard
  }
})
export default class WeekdayCard extends Vue {
  @Prop({ type: Array, default: [] })
  charactors!: Array<Types.ISubjectCharactor>;

  scroll!: BScroll;

  get listStyles() {
    const width = this.charactors.length * 80 + 100;
    return {
      width: width + 'px'
    };
  }

  mounted() {
    this.$nextTick(() => {
      const wrapper: Element = this.$refs.wrapper as Element;
      this.scroll = new BScroll(wrapper, {
        scrollX: true,
        eventPassthrough: 'vertical',
        click: true
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 160px;
  .wrapper__content {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
