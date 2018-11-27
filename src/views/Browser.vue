<template>
  <div class="page">
    <Header hasBack
            relative
            :title="title" />
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
import { Component, Vue, Prop } from "vue-property-decorator";
import Header from "@/components/Header/index.vue";
import Loading from "@/components/Loading.vue";
import BrowserList from "@/components/Browser/List.vue";
import api from "@/api";

// @ts-ignore
import Scroll from "@/components/scroll";

@Component({
  name: "Browser",
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

  title: string = "番组列表";
  sort: string = "";
  airtime: string = "";
  type: string = "";
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

  created() {
    this.title = this.$route.query.title || "番组列表";
    this.type = this.$route.query.type || "all";
    this.airtime = this.$route.query.airtime || "";
    this.sort = this.$route.query.sort || "rank";
  }

  async mounted() {
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
