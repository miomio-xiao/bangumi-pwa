<template>
  <ul class="tag__list">
    <li class="tag__item"
        v-for="item in tagList"
        :key="item.text">
      <div class="tag__content">
        <div class="tag__text">
          {{ item.text }}
        </div>
        <div class="tag__progress"
             :style="getProgress(item)"></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';

@Component({
  name: 'TagList',
  components: {
    Rate
  }
})
export default class TagList extends Vue {
  @Prop({ type: Array, default: () => [] })
  tagList!: Types.ITag[];

  get topNum(): number {
    if (this.tagList) {
      return this.tagList[0].num;
    }

    return 0;
  }

  getProgress(item: Types.ITag) {
    return {
      width: (item.num / this.topNum) * 100 + '%'
    };
  }
}
</script>

<style lang="stylus" scoped>
.tag {
  &__list {
    color: #646464;
    background: #f5f5f5;
  }

  &__item {
    display: flex;
    height: 48px;
    margin-bottom: 8px;
    padding: 8px 20px 8px 10px;
  }

  &__content {
    flex: 1;
  }

  &__text {
    font-size: 20px;
    padding-bottom: 8px;
  }

  &__progress {
    border-radius: 4px;
    height: 8px;
    background-image: linear-gradient(to right, #f73e53, #ff5722);
  }
}
</style>
