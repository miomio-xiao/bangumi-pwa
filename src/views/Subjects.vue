<template>
  <div class="page"
       v-if="!loading">
    <Header hasBack
            :title="subject.name_cn || subject.name" />
    <div class="page__header">
      <div class="page__bg"
           :style="{ backgroundImage: `url(${image})` }"></div>
      <div class="subject">
        <div class="subject__poster"
             :style="{ backgroundImage: `url(${image})` }"></div>
        <div class="subject__info">
          <div class="subject__title">
            <p>{{ subject.name_cn }}</p>
            <p>{{ subject.name }}</p>
          </div>
          <div @click="showSheet">
            <span class="subject__score">{{ score }}</span>
            <div class="subject__rating">
              <Rate :num="score"
                    :size="16" />
              <div class="subject__rating-total">{{ total }} 人评分</div>
            </div>
          </div>
        </div>
        <div class="subject__rank"
             @click="showRank = !showRank"
             v-if="subject.rank">
          <span v-show="showRank">{{ subject.rank }}</span>
        </div>
      </div>
    </div>
    <div class="page__content">
      <p>放送日期: {{ subject.air_date }}</p>
      <p :class="{ staff : !showStaffsDetail }"
         @click="showStaffsDetail = !showStaffsDetail"
         v-html="showStaffsDetail ? staffsDetail : staffs" />
      <div class="summary">
        <h3 class="sub">剧情简介</h3>
        <div class="content"
             v-if="summary"
             :class="{ more: !summaryMore }"
             @click="summaryMore = !summaryMore"
             v-html="summary">
        </div>
        <div class="null-alert"
             v-else>
          暂无更多信息
        </div>
      </div>
      <div class="crt"
           @click="tagMore = !tagMore">
        <h3 class="sub">标签</h3>
        <SubjectTag v-if="tags.length"
                    :tag-list="tags"
                    :class="tagClass"
                    @click-item="enterTagPage" />
      </div>
      <div class="crt">
        <h3 class="sub">角色</h3>
        <SubjectCharactor v-if="subject.crt"
                          :charactors="subject.crt" />
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
      <div class="crt">
        <h3 class="sub">站点</h3>
        <SubjectResource v-if="siteList.length"
                         :site-list="siteList" />
        <div class="null-alert"
             v-else>
          暂无更多信息
        </div>
      </div>
      <div class="crt">
        <h3 class="sub">章节讨论</h3>
        <SubjectEp v-if="subject.eps"
                   :ep-list="subject.eps" />
        <div class="null-alert"
             v-else>
          暂无更多信息
        </div>
      </div>
      <div class="blog">
        <h3 class="sub">
          长评
          <v-icon v-if="subject.blog && subject.blog.length >= 5"
                  style="float: right"
                  @click="enterBlogListPage">keyboard_arrow_right</v-icon>
        </h3>
        <SubjectBlog :blogs="subject.blog"
                     @on-click="enterBlogPage"
                     v-if="subject.blog" />
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
      <div class="comments">
        <h3 class="sub">短评</h3>
        <template v-if="comments.length">
          <SubjectComments :comments="comments" />
          <v-btn block
                 color="secondary"
                 @click="enterCommentPage"
                 dark>
            查看更多短评
          </v-btn>
        </template>
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
    </div>
    <v-dialog v-model="showChart"
              fullscreen
              transition="dialog-bottom-transition"
              content-class="dialog-toolbar--fullscreen"
              lazy>
      <subject-chart :subject="subject" />
    </v-dialog>
  </div>
  <Loading v-else
           :full="true" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';
import Loading from '@/components/Loading.vue';
import Header from '@/components/Header/index.vue';
import SubjectCharactor from '@/components/SubjectCharactor/index.vue';
import SubjectEp from '@/components/SubjectEp/index.vue';
import SubjectResource from '@/components/SubjectResource/index.vue';
import SubjectBlog from '@/components/SubjectBlog/index.vue';
import SubjectComments from '@/components/SubjectComments/index.vue';
import SubjectTag from '@/components/SubjectTag/index.vue';
import SubjectChart from '@/components/SubjectChart/index.vue';
import api from '@/api';

@Component({
  name: 'subject',
  components: {
    Rate,
    Loading,
    Header,
    SubjectChart,
    SubjectCharactor,
    SubjectEp,
    SubjectResource,
    SubjectBlog,
    SubjectTag,
    SubjectComments
  }
})
export default class Subjects extends Vue {
  id: string = '';
  subject: Types.ISubject = {
    id: 0,
    type: '',
    name: '',
    url: '',
    air_date: '',
    images: {}
  };
  comments: Types.ISubjectComment[] = [];
  tags: Types.ITag[] = [];
  siteList: Types.ISubjectResourceInfo[] = [];

  loading: boolean = false;
  showChart: boolean = false;
  showRank: boolean = false;
  showStaffsDetail: boolean = false;
  summaryMore: boolean = false;
  tagMore: boolean = false;

  title: string = '详情';

  get score(): number {
    if (this.subject.rating) {
      return this.subject.rating.score || 0;
    }
    return 0;
  }

  get total(): number {
    if (this.subject.rating) {
      return this.subject.rating.total || 0;
    }
    return 0;
  }

  get image(): string {
    return this.subject.images.large || '';
  }

  get staffs(): string {
    const staffs = this.subject.staff;
    if (staffs && staffs.length > 0) {
      return staffs.map(staff => staff.name || staff.name_cn).join(' / ');
    } else {
      return '';
    }
  }

  get staffsDetail(): string {
    const staffs = this.subject.staff;
    if (staffs && staffs.length > 0) {
      return staffs
        .map(staff => {
          const name = staff.name || staff.name_cn;
          const jobs = staff.jobs || [];
          return `${name} : ${jobs.join(' / ')}`;
        })
        .join('</br>');
    } else {
      return '';
    }
  }

  get summary(): string {
    let str: string = this.subject.summary || '';
    return this.changeStr(str);
  }

  get tagClass() {
    return {
      more: !this.tagMore,
      tag: true
    };
  }

  changeStr(str: string): string {
    return str.replace(/\n|\r\n/g, '<br/>');
  }

  back() {
    this.$router.go(-1);
  }

  enterCommentPage() {
    this.$router.push(`/comments/${this.id}`);
  }

  enterBlogListPage() {
    const id = this.id;
    this.$router.push({
      name: 'blogs',
      params: {
        id: id + '',
        name: this.subject.name_cn || this.subject.name
      }
    });
  }

  enterBlogPage(item: Types.ISubjectBlog) {
    const id = item.id;
    this.$router.push({
      name: 'Blog',
      params: {
        id: id + '',
        name: this.subject.name_cn || this.subject.name
      }
    });
  }

  enterTagPage(item: Types.ITag) {
    if (!this.tagMore) {
      return;
    }

    this.tagMore = !this.tagMore;

    this.$router.push({
      path: `/tag/${item.text}`,
      query: {
        title: `动画标签： ${item.text}`
      }
    });
  }

  showSheet() {
    this.showChart = true;
  }

  async fetchTags() {
    this.tags = await api.getSubjectTagsById(this.id);
  }

  async fetchComments() {
    this.comments = await api.getSubjectCommentsById(this.id);
  }

  async fetchSiteList() {
    this.siteList = await api.getSiteList(this.id);
  }

  async fetchSubject() {
    const subject = await api.getSubjectById(this.id, 'large');

    this.subject = subject;
  }

  async init() {
    this.loading = true;
    this.tags = [];
    this.comments = [];
    this.siteList = [];
    this.showChart = false;
    this.showRank = false;
    this.showStaffsDetail = false;
    this.summaryMore = false;
    this.tagMore = false;

    this.id = this.$route.params.id;

    try {
      await this.fetchSubject();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }

    this.fetchComments();
    this.fetchTags();
    this.fetchSiteList();
  }

  activated() {
    const id = this.$route.params.id;
    if (id !== this.id) {
      this.id = id;
      this.init();
    }
  }
}
</script>

<style lang="stylus" scoped>
.page__header {
  position: relative;
  width: 100vw;
  height: 200px;

  .page__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  .subject {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 4;
    background: rgba(0, 0, 0, 0.75);

    &__poster {
      position: absolute;
      left: 20px;
      bottom: -25px;
      width: 120px;
      height: 176px;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }

    &__info {
      position: absolute;
      left: 160px;
      bottom: 0;
      text-align: left;
    }

    &__title {
      font-size: 22px;

      p {
        margin: 10px 0;
        width: 60vw;
        line-height: 1.4em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }

    &__rating {
      display: inline-block;
    }

    &__rank {
      position: absolute;
      right: 16px;
      width: 60px;
      height: 40px;
      font-size: 32px;
      font-style: oblique;
      color: #fff;

      &-total {
        color: #ccc;
      }
    }

    &__score {
      display: inline-block;
      font-size: 48px;
    }
  }
}

.page__content {
  margin-top: 48px;
  padding: 0 10px;
  text-align: left;

  p {
    font-size: 14px;
    line-height: 1.6em;
  }

  .staff {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 25px;
      background: linear-gradient(rgba(255, 255, 255, 0.001), #fff);
      pointer-events: none;
    }
  }

  .summary {
    margin-top: 12px;

    .content {
      font-size: 14px;
      line-height: 1.4em;
      transition: 0.3s ease-in-out;
    }
  }

  .tag {
    margin-top: -20px;
  }

  .crt {
    margin-top: 12px;
  }

  .blog {
    margin-top: 12px;
  }

  .sub {
    font-weight: normal;
    margin: 20px 0;
    padding-left: 10px;
    border-left: 2px solid #ff8b62;
    color: #909090;
  }

  .more {
    position: relative;
    max-height: 80px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 25px;
      background: linear-gradient(rgba(255, 255, 255, 0.001), #fff);
      pointer-events: none;
    }

    &.tag {
      max-height: 90px;
    }
  }
}
</style>
