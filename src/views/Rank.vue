<template>
  <div class="rank">
    <ul class="rank__list"
        v-if="!loading">
      <li class="rank__item"
          v-ripple
          v-for="(item, index) in rankList"
          @click="enter(item.id)"
          :key="item.id">
        <div class="rank__index">No. {{ index + 1 }}</div>
        <div class="rank__content">
          <div class="avator"
               v-lazy:background-image="getCover(item)">
          </div>
          <div class="rank__detail">
            <div class="rank__title">{{ item.name || item.oName }}</div>
            <div class="rank__info">{{ item.info }}</div>
            <div class="rank__rating">
              <template v-if="item.rate">
                <Rate :num="item.rate"></Rate>
                <div class="rank__rate">
                  {{ item.rate }}
                </div>
              </template>
              <div class="rank__num">{{ getRateNumText(item) }}</div>
            </div>
          </div>
        </div>
        <div class="rank__no"
             v-if="showRank && item.rank">{{ item.rank }}</div>
      </li>
    </ul>
    <Loading v-else
             :full="true"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import api from '@/api';
import Loading from '@/components/Loading.vue';
import Rate from '@/components/Rate.vue';

@Component({
  name: 'Rank',
  components: {
    Loading,
    Rate
  }
})
export default class Rank extends Vue {
  @Prop({ type: Boolean, default: false })
  showRank?: boolean;

  rankList: Types.IBrowserInfo[] = [];
  loading: boolean = false;

  async mounted() {
    this.loading = true;
    try {
      await this.fetch();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async fetch() {
    const data = await api.getTopRanks(100);

    this.rankList = data;
  }

  getCover(item: Types.IBrowserInfo): string {
    return item.cover.replace(/(cover\/)(.*?)(\/)/, '$1c$3');
  }

  getRateNumText(item: Types.IBrowserInfo): string {
    if (item.rateNum) {
      return `（${item.rateNum}人评分）`;
    }

    return '';
  }

  enter(id: number) {
    this.$router.push(`/subject/${id}`);
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/mixins';

.rank {
  &__list {
    background: #f5f5f5;
  }

  &__item {
    position: relative;
    margin-bottom: 6px;
    background: #fff;
    padding: 4px 8px 12px 8px;
  }

  &__index {
    display: inline-block;
    margin-bottom: 10px;
    padding: 0 8px;
    line-height: 20px;
    font-size: 10px;
    text-align: center;
    color: #fff;
    background: #ff8b62;
    border-radius: 6px;
  }

  &__content {
    display: flex;
  }

  .avator {
    flex: 0 0 80px;
    width: 80px;
    height: 100px;
    background: #fff;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  &__detail {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 220px;
    padding: 4px 6px 0 12px;
    font-size: 12px;
  }

  &__title {
    font-size: 16px;
    color: #323232;
    font-weight: bold;
  }

  &__info {
    flex: 1;
    margin: 8px 0;
    font-size: 12px;
    color: #646464;
    line-camp(16, 2);
  }

  &__rating {
    flex: 0 0 24px;
    display: flex;
    align-items: center;
    vertical-align: bottom;

    &-icon {
      & /deep/ .v-icon {
        padding: 0;
      }
    }
  }

  &__rate {
    font-size: 14px;
    padding-left: 6px;
  }

  &__num {
    padding-left: 10px;
    color: #909090;
  }

  &__no {
    position: absolute;
    top: 10px;
    right: 12px;
    width: 40px;
    border-radius: 10px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    background: pink;
  }
}
</style>
