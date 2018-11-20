<template>
  <div class="search-page">
    <Header hasBack>
      <v-text-field append-icon="search"
                    class="input"
                    hide-details
                    single-line
                    v-model="keyword"
                    @input="change"
                    @keyup.enter="submit" />
    </Header>
    <loading v-if="loading"
             :full="true" />
    <div class="search-content"
         v-else-if="list.length > 0">
      <Scroll ref="scroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <SearchSubjectList :list="list" />
      </Scroll>
    </div>
    <div class="history"
         v-else-if="searchItems.length > 0 && !keyword">
      <div class="history__hd">
        <span class="history__title">历史记录</span>
        <span class="history__clear"
              @click="clearHistory">清除</span>
      </div>
      <ul class="history__items">
        <li class="history__item"
            v-for="(item, i) in searchItems"
            :key="i"
            @click="keyword = item; change()">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import SearchSubjectList from '@/components/SearchSubjectList.vue';
import { debounce } from '@/utils/decorator';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'search',
  components: {
    Header,
    SearchSubjectList,
    Scroll
  }
})
export default class Search extends Vue {
  private keyword: string = '';
  private searchItems: string[] = [];
  private list: Types.ISubject[] = [];

  private loading: boolean = false;

  private scroll!: Scroll;
  private page: number = 1;
  private pageSize: number = 10;
  private noMore: Boolean = false;

  private isPullUpLoad: Boolean = false;
  private pullUpLoadObj: Object = {
    threshold: 20
  };

  get searchOptions(): Types.ISearchOptions {
    return {
      keywords: this.keyword,
      max_results: this.pageSize,
      start: (this.page - 1) * this.pageSize,
      type: 2,
      responseGroup: 'large'
    };
  }

  mounted() {
    this.refreshSearchHistory();
  }

  initScroll() {
    this.scroll = this.$refs.scroll as Scroll;
    if (this.scroll) {
      this.scroll.initScroll();
    }
  }

  @debounce(1000)
  async change() {
    this.page = 1;
    this.loading = true;
    try {
      const data = await api.search(this.searchOptions);
      this.page++;

      if (data.list) {
        this.list.splice(0, this.list.length, ...data.list);
      } else {
        this.list = [];
      }

      this.noMore = !this.list.length;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }

    this.$nextTick(() => {
      this.initScroll();
    });
  }

  submit() {
    this.change();
    this.setSearchHistory(this.keyword);
  }

  getSearchHistory(): Array<string> {
    let str = localStorage.getItem('searchHistory');
    let searchs: Array<string> = [];
    if (str) {
      searchs = JSON.parse(str);
    }
    return searchs;
  }

  setSearchHistory(keyword: string) {
    let searchs: Array<string> = this.getSearchHistory();
    searchs.push(keyword);
    localStorage.setItem('searchHistory', JSON.stringify(searchs));
    this.refreshSearchHistory();
  }

  clearHistory() {
    localStorage.removeItem('searchHistory');
    this.searchItems = [];
  }

  refreshSearchHistory() {
    this.searchItems = this.getSearchHistory();
  }

  back() {
    this.$router.go(-1);
  }

  async fetch() {
    if (this.noMore) {
      return;
    }

    const data = await api.search(this.searchOptions);

    const list: Types.ISubject[] = data.list;

    if (!list.length) {
      this.noMore = true;
      return;
    }

    this.page++;
    this.list = [...this.list, ...list];
  }

  async onPullingUp() {
    if (this.isPullUpLoad) {
      return;
    }

    this.isPullUpLoad = true;
    await this.fetch();
    this.isPullUpLoad = false;

    this.$nextTick(() => {
      this.scroll.forceUpdate();
    });
  }
}
</script>

<style lang="stylus" scoped>
.search-page {
  .input {
    padding-top: 0 !important;
    color: #fff !important;
  }

  .search-content {
    width: 100%;
    height: calc(100vh - 48px);
    padding: 4px;
  }

  .history {
    margin-top: 12px;

    &__hd {
      display: flex;
      font-size: 18px;
      padding: 8px 16px;
      text-align: left;
      color: #909090;
      font-weight: normal;
    }

    &__title {
      flex: 1;
    }

    &__clear {
      flex: 0 0 40px;
    }

    &__item {
      text-align: left;
      padding: 8px 24px;
      margin: 0 6px;
      border-bottom: 1px solid #e5e5e5;
      font-size: 18px;
      color: #323232;
    }
  }
}
</style>
