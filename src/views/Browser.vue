<template>
  <div class="page">
    <Header hasBack
            relative
            :title="title">
      <v-menu ref="menu"
              v-if="this.airtime"
              slot="tail"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px">
        <v-icon slot="activator">more_vert</v-icon>
        <v-date-picker v-model="date"
                       type="month"
                       locale="zh-cn"
                       no-title
                       scrollable>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="primary"
                 @click="menu = false">取消</v-btn>
          <v-btn flat
                 color="primary"
                 @click="submit">确定</v-btn>
        </v-date-picker>
      </v-menu>
    </Header>
    <div class="browser-scroll"
         v-if="!loading">
      <Scroll ref="scroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <BrowserList :list="list"
                     showRank
                     showIndex />
      </Scroll>
    </div>
    <Loading v-else
             :full="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import Loading from '@/components/Loading.vue';
import BrowserList from '@/components/Browser/List.vue';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'Browser',
  components: {
    Loading,
    Header,
    BrowserList,
    Scroll
  }
})
export default class Browser extends Vue {
  loading: boolean = false;
  showRank: boolean = true;
  list: Types.IBrowserInfo[] = [];

  menu: boolean = false;
  date: string = '';

  query: {
    [key: string]: string;
  } = {};

  title: string = '';
  type: string = '';
  airtime: string = '';
  sort: string = '';

  page: number = 1;
  noMore: Boolean = false;

  scroll!: Scroll;
  isPullUpLoad: Boolean = false;
  pullUpLoadObj: Object = {
    threshold: 20
  };

  get params(): any {
    return {
      page: this.page,
      airtime: this.airtime,
      sort: this.sort,
      type: this.type
    };
  }

  submit() {
    this.menu = false;

    this.airtime = this.date;
    this.title = this.date;
    this.init();
  }

  created() {
    this.query = this.$route.query as {
      [key: string]: string;
    };

    this.title = this.query.title || '番组列表';
    this.type = this.query.type || 'all';
    this.airtime = this.query.airtime || '';
    this.sort = this.query.sort || 'rank';

    this.date = this.airtime;
  }

  mounted() {
    this.init();
  }

  async init() {
    this.list = [];
    this.page = 1;
    this.noMore = false;

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
      const list: Types.IBrowserInfo[] = await api.getBrowserList(this.params);

      if (!list.length) {
        this.noMore = true;
        return;
      }

      this.page++;
      this.list = [...this.list, ...list];
    } catch (error) {
      console.log(error);
    }
  }

  initScroll() {
    this.scroll = this.$refs.scroll as Scroll;
    if (this.scroll) {
      this.scroll.initScroll();
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
.browser-scroll {
  height: calc(100vh - 48px);
  margin-top: 10px;
  padding: 2px;
}
</style>
