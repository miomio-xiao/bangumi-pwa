<template>
  <div class="page">
    <Header hasBack
            fixed
            :title="title" />
    <div class="rank"
         v-if="!loading">
      <BrowserList :list="rankList"
                   show-rank
                   show-index />
    </div>
    <Loading v-else
             :full="true"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import api from '@/api';
import Loading from '@/components/Loading.vue';
import Header from '@/components/Header/index.vue';
import BrowserList from '@/components/Browser/List.vue';

@Component({
  name: 'rank',
  components: {
    Loading,
    Header,
    BrowserList
  }
})
export default class Rank extends Vue {
  title: string = 'Top 100';
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
}
</script>
<style lang="stylus" scoped>
.rank {
  padding-top: 58px;
}
</style>
