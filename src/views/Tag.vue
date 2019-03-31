<template>
  <div class="page">
    <Header hasBack
            relative
            :title="title" />
    <div class="tag"
         ref="tag"
         v-if="!loading">
      <TagCloud :data="tagCloudData"
                :font-size-mapper="fontSizeMapper"
                @on-word-click="onWordClick" />
    </div>
    <Loading v-else
             :full="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import api from '@/api';
import Loading from '@/components/Loading.vue';
import Header from '@/components/Header/index.vue';
import TagCloud from '@/components/Tag/Cloud.vue';
import Alloyfinger from 'alloyfinger';

interface Word {
  text: string;
  value: number;
  font?: string;
  style?: string;
  weight?: string | number;
  rotate?: number;
  size?: number;
  padding?: number;
  x?: number;
  y?: number;
}

@Component({
  name: 'tag',
  components: {
    Loading,
    Header,
    TagCloud
  }
})
export default class Tag extends Vue {
  title: string = '标签浏览';
  tagList: Types.ITag[] = [];
  loading: boolean = false;
  topNum: number = 0;
  page: number = 1;
  finger: any = null;

  baseSize: number = 12;
  fontSizeMapper: Function = this.fontSizeMapperFn;

  get tagCloudData() {
    return this.tagList.map(({ text, num }) => ({ text, value: num }));
  }

  @Watch('page')
  async pageChange() {
    this.loading = true;
    try {
      await this.fetch();
      if (!this.topNum) {
        this.topNum = this.getTopNum();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.$nextTick(() => {
        this.bindEvent();
      });
    }
  }

  fontSizeMapperFn(word: Word): number {
    return this.baseSize + (word.value / this.topNum) * 50;
  }

  onWordClick(word: Word) {
    this.$router.push({
      path: `tag/${word.text}`,
      query: {
        title: `动画标签： ${word.text}`
      }
    });
  }

  getTopNum(): number {
    if (this.tagList.length) {
      return this.tagList[0].num;
    }

    return 0;
  }

  bindEvent() {
    if (this.finger) {
      this.finger.destroy();
    }

    this.finger = new Alloyfinger(this.$refs.tag, {
      swipe: ({ direction }: { direction: String }) => {
        switch (direction) {
          case 'Right':
            this.page = Math.max(1, this.page - 1);
            break;

          case 'Left':
            this.page++;
          default:
            break;
        }
      }
    });
  }

  mounted() {
    this.pageChange();
  }

  beforeDestroy() {
    if (this.finger) {
      this.finger.destroy();
    }
  }

  async fetch() {
    const data = await api.getTagList({ page: this.page });

    this.tagList.splice(0, this.tagList.length, ...data);
  }
}
</script>
<style lang="stylus" scoped>
.tag {
  height: 100vh;
}
</style>
