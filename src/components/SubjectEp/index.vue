<template>
  <div class="wrapper"
       ref="wrapper">
    <Scroll ref="scroll"
            direction="horizontal"
            eventPassthrough="vertical">
      <ul class="wrapper__content"
          :style="listStyles">
        <li v-for="item in epList"
            :key="item.id"
            v-show="item.name"
            @click="$router.push(`/ep/${item.id}`)"
            ref="item"
            class="ep">
          <div class="ep__index">第 {{ item.sort }} 话</div>
          <div class="ep__title ellipsis">{{ item.name_cn }}</div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import BScroll from 'better-scroll';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'SubjectEp',
  components: {
    Scroll
  }
})
export default class SubjectEp extends Vue {
  @Prop({ type: Array, default: [] })
  epList!: Types.ISubjectEpInfo[];

  itemWidth: number = 142;

  scroll: Scroll;

  get itemTotalWidth() {
    const width = this.epList.filter(item => item.name).length * this.itemWidth;

    return width + 40;
  }

  get listStyles() {
    return {
      width: this.itemTotalWidth + 'px'
    };
  }

  @Watch('itemTotalWidth')
  value() {
    if (this.scroll) {
      this.scroll.forceUpdate();
    }
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
.wrapper {
  width: 100vw;
  min-height: 64px;

  .wrapper__content {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  .ep {
    width: 120px;
    height: 64px;
    box-shadow: 0 0 20px #ccc;
    text-align: center;
    vertical-align: top;
    margin: 0 6px;
    padding: 12px 6px;
    text-align: left;

    &__index {
      font-size: 14px;
      color: #323232;
    }

    &__title {
      margin-top: 6px;
      font-size: 12px;
      color: #909090;
    }
  }
}
</style>
