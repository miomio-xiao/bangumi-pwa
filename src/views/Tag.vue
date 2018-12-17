<template>
  <div class="page">
    <div class="tag"
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import api from '@/api';
import Loading from '@/components/Loading.vue';
import Header from '@/components/Header/index.vue';
import TagCloud from '@/components/Tag/Cloud.vue';

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

  baseSize: number = 12;
  fontSizeMapper: Function = this.fontSizeMapperFn;

  get tagCloudData() {
    return this.tagList.map(({ text, num }) => ({ text, value: num }));
  }

  get topNum(): number {
    if (this.tagList.length) {
      return this.tagList[0].num;
    }

    return 0;
  }

  fontSizeMapperFn(word: Word): number {
    return this.baseSize + (word.value / this.topNum) * 50;
  }

  onWordClick() {}

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
    const data = await api.getTagList({ page: 1, type: 'all' });

    this.tagList = data;
  }
}
</script>
<style lang="stylus" scoped>
.tag {
  height: 100vh;
}
</style>
