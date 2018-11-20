<template>
  <div class="page">
    <Header hasBack
            :title="title"
            class="header" />
    <div class="comment">
      <Scroll ref="scroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <SubjectComments :comments="comments"></SubjectComments>
      </Scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import SubjectComments from '@/components/SubjectComments/index.vue';
import BScroll from 'better-scroll';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  components: {
    Header,
    SubjectComments,
    Scroll
  }
})
export default class SubjectComment extends Vue {
  id: string = '';
  title: string = '全部短评';
  page: number = 1;
  comments: Types.ISubjectComment[] = [];

  scroll!: Scroll;

  pullUpLoadObj: object = {
    threshold: 200
  };

  isPullingUp: boolean = false;

  noMore: boolean = false;

  async fetch() {
    if (this.noMore) {
      return;
    }

    try {
      const comments: Types.ISubjectComment[] = await api.getSubjectCommentsById(
        this.id,
        this.page
      );

      if (!comments.length) {
        this.noMore = true;
        return;
      }

      this.page++;
      this.comments = [...this.comments, ...comments];
    } catch (error) {
      console.log(error);
    }
  }

  async onPullingUp() {
    if (this.isPullingUp) {
      return;
    }
    
    this.isPullingUp = true;
    
    await this.fetch();

    this.isPullingUp = false;
    
    this.$nextTick(() => {
      this.scroll.forceUpdate();
    });
  }

  async created() {
    this.id = this.$route.params.id;
    await this.fetch();
    this.scroll = this.$refs.scroll as Scroll;
    this.scroll.initScroll();
  }
}
</script>

<style lang="stylus" scoped>
.header {
  position: relative;
  z-index: 9;
}

.comment {
  width: 100%;
  height: calc(100vh - 48px);
  padding: 8px;
}
</style>
