<template>
  <div class="page">
    <Header hasBack
            relative
            :title="title" />
    <div class="blogs">
      <Scroll ref="scroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <SubjectBlog :blogs="blogs"
                     @on-click="enterBlogPage"></SubjectBlog>
      </Scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import SubjectBlog from '@/components/SubjectBlog/index.vue';
import BScroll from 'better-scroll';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  components: {
    Header,
    SubjectBlog,
    Scroll
  }
})
export default class SubjectBlogs extends Vue {
  id: string = '';
  subjectName: string = '';

  page: number = 1;
  blogs: Types.ISubjectBlog[] = [];

  scroll!: Scroll;

  pullUpLoadObj: object = {
    threshold: 200
  };

  isPullingUp: boolean = false;

  noMore: boolean = false;

  get title(): string {
    return this.subjectName || '全部长评';
  }

  async fetch() {
    if (this.noMore) {
      return;
    }

    try {
      const blogs: Types.ISubjectBlog[] = await api.getSubjectBlogsById(
        this.id,
        this.page
      );

      if (!blogs.length) {
        this.noMore = true;
        return;
      }

      this.page++;
      this.blogs = [...this.blogs, ...blogs];
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

  async enterBlogPage(item: Types.ISubjectBlog) {
    const id = item.id;
    this.$router.push({
      name: 'Blog',
      params: {
        id: id + '',
        name: this.subjectName
      }
    });
  }

  async created() {
    this.id = this.$route.params.id;
    this.subjectName = this.$route.params.name;

    await this.fetch();
    this.scroll = this.$refs.scroll as Scroll;
    this.scroll.initScroll();
  }
}
</script>

<style lang="stylus" scoped>
.blogs {
  width: 100%;
  height: calc(100vh - 48px);
  padding: 8px;
}
</style>
