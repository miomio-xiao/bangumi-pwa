<template>
  <div class="wrapper"
       ref="wrapper">
    <Scroll ref="scroll"
            direction="horizontal"
            eventPassthrough="vertical">
      <ul class="wrapper__content"
          :style="listStyles">
        <li v-for="(item, i) in charactors"
            :key="i"
            class="item">
          <CharactorCard ref="card"
                         :charactor="item"></CharactorCard>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import BScroll from 'better-scroll';
import CharactorCard from './CharactorCard.vue';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'SubjectCharactor',
  components: {
    CharactorCard,
    Scroll
  }
})
export default class SubjectCharactor extends Vue {
  @Prop({ type: Array, default: [] })
  charactors!: Types.ISubjectCharactor[];

  cardWidth: number = 100;

  scroll: Scroll;

  get CardTotalWidth() {
    const width = (this.charactors.length + 1) * this.cardWidth;

    return width + 40;
  }

  get listStyles() {
    return {
      width: this.CardTotalWidth + 'px'
    };
  }

  @Watch('CardTotalWidth')
  value() {
    if (this.scroll) {
      this.scroll.forceUpdate();
    }
  }

  mounted() {
    const cards: Vue[] = this.$refs.card as Vue[];

    if (cards.length) {
      const $el = cards[0].$el;
      this.cardWidth = $el.getBoundingClientRect().width;
    }

    this.$nextTick(() => {
      this.scroll = this.$refs.scroll;
      this.scroll.initScroll();
    });
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100vw;
  min-height: 160px;

  .wrapper__content {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
