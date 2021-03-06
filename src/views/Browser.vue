<template>
  <div class="page">
    <Header hasBack
            relative
            :showTitle="showTitle"
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
      <TagInput v-if="isTagType"
                slot="tail"
                :tag-name="tag"
                @searching="onTagInputSearching"
                @change="onTagInputChange" />
    </Header>
    <div class="browser-scroll"
         v-if="!loading">
      <Scroll ref="scroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <BrowserList :list="list"
                     :show-rank="showRank"
                     :show-index="showIndex" />
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
import TagInput from '@/components/Browser/TagInput.vue';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'browser',
  components: {
    Loading,
    Header,
    BrowserList,
    TagInput,
    Scroll
  }
})
export default class Browser extends Vue {
  loading: boolean = false;
  showRank: boolean = true;
  list: Types.IBrowserInfo[] = [];
  browserType: string = '';

  showTitle: boolean = true;
  menu: boolean = false;
  date: string = '';

  query: {
    [key: string]: string;
  } = {};

  tag: string = '';
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

  get isTagType(): boolean {
    return this.browserType === 'tag';
  }

  get showIndex(): boolean {
    return !this.isTagType;
  }

  get params(): any {
    const baseParams = {
      page: this.page,
      airtime: this.airtime,
      sort: this.sort
    };

    const params = this.isTagType
      ? {
          tag: this.tag
        }
      : {
          type: this.type
        };

    return Object.assign(baseParams, params);
  }

  get fetchApi(): Function {
    return this.isTagType ? api.getTagBrowserList : api.getBrowserList;
  }

  submit() {
    this.menu = false;

    this.airtime = this.date;
    this.title = this.date;
    this.init();
  }

  onTagInputSearching (searching: boolean) {
    this.showTitle = !searching;
  }

  onTagInputChange(name: string) {
    this.$router.replace({
      path: `/tag/${name}`,
      query: {
        title: `动画标签： ${name}`
      }
    });
    this.initRouteParams();
    this.init();
  }

  created() {
    this.initRouteParams();
  }

  mounted() {
    this.init();
  }

  initRouteParams () {
    const routeParams = this.$route.params;

    if (routeParams.tag) {
      this.browserType = 'tag';
      this.tag = routeParams.tag;
    }

    this.query = this.$route.query as {
      [key: string]: string;
    };

    this.title = this.query.title || '番组列表';
    this.type = this.query.type || 'all';
    this.airtime = this.query.airtime || '';
    this.sort = this.query.sort || 'rank';

    this.date = this.airtime;
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
      const list: Types.IBrowserInfo[] = await this.fetchApi(this.params);

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
