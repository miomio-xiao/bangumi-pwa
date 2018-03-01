<template>
  <div class="search-page">
    <v-toolbar dark
               color="pink">
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-text-field append-icon="search"
                    hide-details
                    dark
                    single-line
                    v-model="keyword"
                    @input="change"></v-text-field>
    </v-toolbar>
    <SubjectList v-if="list.length > 0"
                 :list="list"></SubjectList>
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
  private list: Array<any> = [];
  @debounce(1000)
  async change() {
    const keyword = this.keyword;
    try {
      const data = await Api.search(keyword);
      console.log(data);
      this.list = data.list;
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    this.keyword = 'k-on';
    this.change();
  }
}
</script>

<style lang="scss" scoped>
.search-page {
}
</style>
