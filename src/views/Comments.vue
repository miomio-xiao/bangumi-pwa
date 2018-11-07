<template>
  <div class="page">
    <v-toolbar dark
               dense
               color="pink">
      <v-btn icon
             @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <h1 class="page__title">全部吐槽</h1>
    </v-toolbar>
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
import SubjectComments from '@/components/SubjectComments/index.vue';
import BScroll from 'better-scroll';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  components: {
    SubjectComments,
    Scroll
  }
})
export default class SubjectComment extends Vue {
  id: string = '';
  page: number = 1;
  comments: Types.ISubjectComment[] = [];

  scroll!: Scroll;

  pullUpLoadObj: Object = {
    threshold: 200
  };

  noMore: Boolean = false;

  async fetch() {
    if (this.noMore) {
      return;
    }

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
  }

  async onPullingUp() {
    await this.fetch();
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

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

.comment {
  width: 100%;
  height: calc(100vh - 48px);
  padding: 8px;
}
</style>
