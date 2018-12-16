<template>
  <div class="history">
    <div class="history__hd">
      <span class="history__title">搜索记录</span>
      <v-icon class="history__clear"
              @click="clearHistory">
        delete
      </v-icon>
    </div>
    <ul class="history__items">
      <li class="history__item"
          v-for="item in searchItems"
          :key="item"
          @click="clickHistory(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SearchHistory extends Vue {
  @Prop({ type: Array, default: () => [] })
  searchItems!: string[];

  clearHistory() {
    this.$emit('clear-all');
  }

  clickHistory(item: string) {
    this.$emit('click-item', item);
  }
}
</script>

<style lang="stylus" scoped>
.history {
  &__hd {
    display: flex;
    font-size: 12px;
    padding: 8px 16px 0 16px;
    text-align: left;
    color: #909090;
    font-weight: normal;
  }

  &__title {
    flex: 1;
  }

  &__clear {
    font-size: 16px;
    flex: 0 0 20px;
    color: #909090;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  &__item {
    margin: 6px;
    padding: 4px 10px;
    border-radius: 1px;
    font-size: 12px;
    color: #232323;
    background: #efefef;
  }
}
</style>
