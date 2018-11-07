<template>
  <div class="page"
       v-if="!loading">
    <v-toolbar dark
               color="pink">
      <v-btn icon
             @click="back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <h1 class="page__title">{{ subject.name_cn || subject.name }}</h1>
    </v-toolbar>
    <header>
      <div class="bg"
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
            <span class="score">{{ score }}</span>
            <div class="subject__rating">
              <Rate :num="score"
                    :size="16"></Rate>
              <div class="total">{{ total }} 人评分</div>
            </div>
          </div>
        </div>
        <div class="subject__rank"
             @click="showRank = !showRank"
             v-if="subject.rank">
          <span v-show="showRank">{{ subject.rank }}</span>
        </div>
      </div>
    </header>
    <div class="info">
      <p>放送日期: {{ subject.air_date }}</p>
      <p :class="{ staff : !showStaffsDetail }"
         @click="showStaffsDetail = !showStaffsDetail"
         v-html="showStaffsDetail ? staffsDetail : staffs"></p>
      <div class="summary">
        <h3 class="sub">剧情简介</h3>
        <div class="content"
             v-if="summary"
             :class="{ more: !summaryMore }"
             @click="summaryMore = !summaryMore"
             v-html="summary">
        </div>
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
      <div class="crt">
        <h3 class="sub">角色</h3>
        <SubjectCharactor v-if="subject.crt"
                          :charactors="subject.crt"></SubjectCharactor>
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
      <div class="crt">
        <h3 class="sub">站点</h3>
        <SubjectResource v-if="siteList.length"
                         :site-list="siteList"></SubjectResource>
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
      <div class="crt">
        <h3 class="sub">章节</h3>
        <SubjectEp :ep-list="subject.eps"></SubjectEp>
      </div>
      <div class="blog">
        <h3 class="sub">评论</h3>
        <SubjectBlog :blogs="subject.blog"
                     v-if="subject.blog"></SubjectBlog>
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
      <div class="comments">
        <h3 class="sub">吐槽</h3>
        <SubjectComments :comments="comments"></SubjectComments>
        <v-btn block
               color="#ff9dbe"
               @click="enterCommentPage"
               dark>查看更多吐槽</v-btn>
      </div>
    </div>
    <v-dialog v-model="showChart"
              fullscreen
              transition="dialog-bottom-transition"
              lazy>
      <subject-chart :subject="subject"></subject-chart>
    </v-dialog>
  </div>
  <Loading v-else
           :full="true" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';
import Loading from '@/components/Loading.vue';
import SubjectCharactor from '@/components/SubjectCharactor/index.vue';
import SubjectEp from '@/components/SubjectEp/index.vue';
import SubjectResource from '@/components/SubjectResource/index.vue';
import SubjectBlog from '@/components/SubjectBlog/index.vue';
import SubjectComments from '@/components/SubjectComments/index.vue';
import SubjectChart from '@/components/SubjectChart/index.vue';
import api from '@/api';

@Component({
  name: 'subjects',
  components: {
    Rate,
    Loading,
    SubjectChart,
    SubjectCharactor,
    SubjectEp,
    SubjectResource,
    SubjectBlog,
    SubjectComments
  }
})
export default class Subjects extends Vue {
  private id: string = '';
  private subject!: Types.ISubject;
  private comments: Types.ISubjectComment[] = [];
  private siteList: Types.ISubjectResourceInfo[] = [];

  private loading: boolean = false;
  private showComments: boolean = false;
  private showChart: boolean = false;
  private showRank: boolean = false;
  private showStaffsDetail: boolean = false;
  private summaryMore: boolean = false;

  private title: string = '详情';

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

  changeStr(str: string): string {
    return str.replace(/\n|\r\n/g, '<br/>');
  }

  back() {
    this.$router.go(-1);
  }

  enterCommentPage() {
    this.$router.push(`/comments/${this.id}`);
  }

  showSheet() {
    this.showChart = true;
  }

  async fetchComments() {
    this.comments = await api.getSubjectCommentsById(this.id);
  }

  async fetchSiteList() {
    this.siteList = await api.getSiteList(this.id);
  }

  async fetchSubject() {
    this.subject = await api.getSubjectById(this.id, 'large');
  }

  async created() {
    this.loading = true;
    this.id = this.$route.params.id;

    try {
      await this.fetchSubject();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }

    this.fetchComments();
    this.fetchSiteList();
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  & /deep/ {
    .v-dialog--fullscreen {
      height: calc(100% - 56px);
      bottom: 0;
      top: auto;
    }
  }
}

header {
  position: relative;
  width: 100vw;
  height: 200px;
  .bg {
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
      top: 20px;
      right: 16px;
      width: 60px;
      height: 40px;
      font-size: 32px;
      font-style: oblique;
      color: #fff;
    }

    .total {
      color: #ccc;
    }

    .score {
      display: inline-block;
      font-size: 48px;
    }
  }
}

.info {
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
}

.crt {
  margin-top: 12px;
}

.blog {
  margin-top: 12px;
}

.sub {
  font-weight: normal;
  padding: 10px 0;
  color: #aaa;
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
}
</style>
