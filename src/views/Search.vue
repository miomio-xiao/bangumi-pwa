<template>
  <div class="search-page">
    <v-toolbar dark
               color="pink">
      <v-btn icon 
             @click="back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-text-field append-icon="search"
                    hide-details
                    dark
                    single-line
                    v-model="keyword"
                    @input="change"
                    @keyup.enter="submit"></v-text-field>
    </v-toolbar>
    <SubjectList v-if="list.length > 0"
                 :list="list"></SubjectList>
    <div class="history"
         v-else-if="searchItems.length > 0 && !keyword">
      <div class="history__hd">
        <span class="history__title">历史记录</span>
        <span class="history__clear"
              @click="clearHistory">清除</span>
      </div>
      <ul class="history__items" >
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
import SubjectList from '../components/SubjectList.vue';
import { debounce } from '../utils/decorator';
import Api from '../api';

@Component({
  components: {
    SubjectList
  }
})
export default class Search extends Vue {
  private keyword: string = '';
  private searchItems: Array<string> = [];
  private list: Array<any> = [];

  @debounce(1000)
  async change() {
    const keyword = this.keyword;
    try {
      const data = await Api.search(keyword);
      if (data.list) {
        this.list = data.list;
      } else {
        this.list = [];
      }
    } catch (error) {
      console.log(error);
    }
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

  mounted() {
    this.refreshSearchHistory();
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  .history {
    margin-top: 12px;
    &__hd {
      display: flex;
      font-size: 18px;
      padding: 8px 16px;
      text-align: left;
      color: #ccc;
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
      color: #111;
    }
  }
}
</style>
