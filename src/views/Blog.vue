<template>
  <div class="page">
    <Header hasBack
            :title="title" />
    <template v-if="!loading">
      <div class="blog">
        <div class="blog__title">{{ blog.title }}</div>
        <div class="blog__hd">
          <div class="avator">
            <img width="100%"
                 height="100%"
                 :src="blog.user.avatar"
                 :alt="blog.user.name">
          </div>
          <div class="name">
            {{ blog.user.name }}
          </div>
          <div class="time">
            {{ blog.time }}
          </div>
        </div>
        <div class="blog__content bgm-message"
             v-html="blog.content"></div>

        <ul class="blog__tag"
            v-if="tags.length">
          <li v-for="tag in tags"
              :key="tag.text">
            <v-chip :color="'#f09199'"
                    small
                    text-color="#fff">
              {{ tag.text }}
            </v-chip>
          </li>
        </ul>
      </div>

      <div class="comments">
        <div class="comments__title">评论</div>
        <Comments :list="comments" />
      </div>
    </template>
    <Loading v-else
             :full="true"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import Comments from '@/components/Comments/index.vue';
import Loading from '@/components/Loading.vue';
import api from '@/api';

@Component({
  name: 'blog',
  components: {
    Header,
    Loading,
    Comments
  }
})
export default class Blog extends Vue {
  subjectName: string = '';
  loading: boolean = false;
  id: string = '';
  blog!: Types.IBlogInfo;
  comments: Types.IComment[] = [];

  get title(): string {
    return this.subjectName || '日志';
  }

  get tags(): Types.IBlogInfoTag[] {
    return this.blog.tag || [];
  }

  async fetchBlogInfo() {
    this.loading = true;
    try {
      const info = await api.getBlogInfo(this.id);

      this.blog = info.blog;
      this.comments = info.comments;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async created() {
    this.id = this.$route.params.id;
    this.subjectName = this.$route.params.name;
    await this.fetchBlogInfo();
  }
}
</script>

<style lang="stylus" scoped>
.page {
  background: #f5f5f5;
}

.blog {
  padding: 10px 8px;
  font-size: 12px;
  background: #fff;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  &__hd {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .avator {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #909090;
      overflow: hidden;
    }

    .name {
      flex: 1;
      margin-left: 8px;
      color: #f73e53;
    }

    .time {
      flex: 0 0 100px;
      color: #909090;
      text-align: right;
    }
  }

  &__content {
    line-height: 1.8;
    color: #323232;
  }

  &__tag {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}

.comments {
  margin-top: 10px;
  padding: 10px 8px;
  background: #fff;

  &__title {
    padding-bottom: 8px;
    font-size: 14px;
    color: #646464;
  }
}
</style>

