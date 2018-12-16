<template>
  <div class="search page">
    <Header hasBack
            relative>
      <v-text-field append-icon="search"
                    class="search__input"
                    color="#fff"
                    hide-details
                    single-line
                    v-model="keyword"
                    @input="change"
                    @keyup.enter="submit" />
    </Header>
    <loading v-if="loading"
             :full="true" />
    <div class="search__content"
         v-else-if="list.length > 0">
      <Scroll ref="scroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <SearchSubjectList :list="list" />
      </Scroll>
    </div>
    <SearchHistory v-else-if="searchItems.length > 0 && !keyword"
                   class="search__history"
                   :search-items="searchItems"
                   @click-item="clickHistory"
                   @clear-all="clearHistory" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import SearchSubjectList from '@/components/Search/SubjectList.vue';
import SearchHistory from '@/components/Search/History.vue';
import { debounce } from '@/utils/decorator';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'search',
  components: {
    Header,
    SearchSubjectList,
    SearchHistory,
    Scroll
  }
})
export default class Search extends Vue {
  keyword: string = '';
  searchItems: string[] = [];
  list: Types.ISubject[] = [];

  loading: boolean = false;

  scroll!: Scroll;
  page: number = 1;
  pageSize: number = 10;
  noMore: Boolean = false;

  isPullUpLoad: Boolean = false;
  pullUpLoadObj: Object = {
    threshold: 20
  };

  get start(): number {
    return (this.page - 1) * this.pageSize;
  }

  get searchOptions(): Types.ISearchOptions {
    return {
      keywords: this.keyword,
      max_results: this.pageSize,
      start: this.start,
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

  submit() {
    this.change();
    this.setSearchHistory(this.keyword);
  }

  getSearchHistory(): string[] {
    let str = localStorage.getItem('searchHistory');
    let searchs: string[] = [];
    if (str) {
      searchs = JSON.parse(str);
    }
    return searchs;
  }

  setSearchHistory(keyword: string) {
    let searchs: string[] = this.getSearchHistory();
    if (!keyword || searchs.includes(keyword)) {
      return;
    }

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

  clickHistory(item: string) {
    this.keyword = item;
    this.change();
  }

  back() {
    this.$router.go(-1);
  }

  @debounce(1000)
  async change() {
    this.page = 1;
    this.noMore = false;

    if (this.keyword === '') {
      this.list = [];
      return;
    }

    this.loading = true;
    try {
      await this.fetch();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }

    this.$nextTick(() => {
      this.initScroll();
    });
  }

  async fetch() {
    if (this.noMore) {
      return;
    }

    try {
      const data = await api.search(this.searchOptions);

      const list: Types.ISubject[] = data.list;
      const results: number = data.results;

      if (!results && this.page === 1) {
        this.list = [];
        return;
      }

      if (this.page === 1) {
        this.list.splice(0, this.list.length, ...list);
      } else {
        this.list = [...this.list, ...list];
      }

      this.page++;

      if (this.start > results) {
        this.noMore = true;
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
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
.search {
  &__input {
    padding-top: 0;
  }

  &__content {
    width: 100%;
    height: calc(100vh - 48px);
    padding: 4px;
  }

  &__history {
    margin-top: 12px;
  }
}
</style>
