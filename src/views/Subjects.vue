<template>
  <div class="page"
       v-if="!loading">
    <v-toolbar dark
               color="pink">
      <v-btn icon
             @click="back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <h1 class="page__title">{{ subject.name_cn }}</h1>
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
      <p>{{ subject.air_date }}</p>
      <p>{{ staffs }}</p>
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
      <div class="blog">
        <h3 class="sub">评论</h3>
        <v-list three-line
                class="blog__list"
                v-if="subject.blog">
          <v-list-tile avatar
                       v-for="(item, index) in subject.blog"
                       :key="index"
                       class="blog__item">
            <v-list-tile-avatar>
              <img :src="item.user.avatar.small">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="blog__title">{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>
                by
                <span class="blog__user">{{ item.user.nickname }}</span>
                <span class="blog__time">{{ item.dateline }}</span>
              </v-list-tile-sub-title>
              <div class="blog__content"
                   v-html="item.summary"></div>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <div class="null-alert"
             v-else>暂无更多信息</div>
      </div>
    </div>
    <v-dialog v-model="showChart"
              fullscreen
              transition="dialog-bottom-transition"
              :overlay="false"
              lazy>
      <subject-chart :subject="subject"></subject-chart>
    </v-dialog>
  </div>
  <div class="loading"
       v-else>
    <v-progress-circular indeterminate
                         :width="3"
                         color="pink"></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rate from '../components/Rate.vue';
import SubjectCharactor from '../components/SubjectCharactor/index.vue';
import SubjectChart from '../components/SubjectChart/index.vue';
import api from '../api';

@Component({
  name: 'subjects',
  components: {
    Rate,
    SubjectChart,
    SubjectCharactor
  }
})
export default class Subjects extends Vue {
  private subject!: Types.ISubject;
  private loading: boolean = false;
  private showChart: boolean = false;
  private showRank: boolean = false;
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

  showSheet() {
    this.showChart = true;
  }

  async beforeRouterEach() {
    const id: string = this.$route.params.id;
    try {
      const data = await api.getSubjectById(id);
      this.subject = data;
    } catch (error) {
      console.log(error);
    }
  }

  async created() {
    this.loading = true;
    const id: string = this.$route.params.id;
    try {
      const data = await api.getSubjectById(id, 'large');
      this.subject = data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  & /deep/ {
    .dialog--fullscreen {
      height: 92%;
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
  &__item {
    height: 120px;
    margin-bottom: 10px;
    line-height: 1.4em;
    & /deep/ .list__tile {
      height: 100%;
    }
  }

  &__title {
    color: rgba(0, 0, 0, 0.87);
  }

  &__user {
    color: #bd4147;
  }

  &__time {
    padding-left: 5px;
    color: #ccc;
  }

  &__content {
    display: -webkit-box;
    white-space: normal;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    padding-top: 4px;
    font-size: 12px;
    line-height: 1.4em;
    height: 70px;
    overflow: hidden;
    color: #777;
  }
}

.sub {
  font-weight: normal;
  padding: 0 0 10px;
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
