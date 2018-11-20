<template>
  <div class="page">
    <Header hasBack
            :title="title">
    </Header>
    <div class="comment"
         v-if="!loading">
      <ul class="comment-list">
        <li class="comment-item"
            v-for="item in list"
            :key="item.id">
          <div class="comment-item__side">
            <div class="comment-item__avator">
              <img width="100%"
                   height="100%"
                   :src="item.user.avatar"
                   :alt="item.user.name">
            </div>
          </div>
          <div class="comment-item__content">
            <div class="comment-item__head">
              <div class="comment-item__user">{{ item.user.name }}</div>
              <div class="comment-item__floor">#{{ item.floor }}</div>
              <div class="comment-item__itme">{{ item.time }}</div>
            </div>
            <div class="comment-item__message"
                 v-html="item.content"></div>
            <ul class="comment-sub"
                v-if="item.sub && item.sub.length">
              <li class="comment-sub-item"
                  v-for="sub in item.sub"
                  :key="sub.id">
                <div class="comment-sub-item__head">
                  <div class="comment-sub-item__user">{{ sub.user.name }}</div>
                  <div class="comment-sub-item__time">{{ sub.time }}</div>
                </div>
                <div class="comment-sub-item__message"
                     v-html="sub.content">

                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <Loading v-else
             :full="true"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import Loading from '@/components/Loading.vue';
import api from '@/api';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  components: {
    Header,
    Loading,
    Scroll
  }
})
export default class EpInfo extends Vue {
  id: string = '';
  list: any[] = [];

  title: string = '章节讨论';
  loading: boolean = false;

  async fetch() {
    const epInfo: any[] = await api.getEpInfo(this.id);

    this.list = epInfo;
  }

  async created() {
    this.id = this.$route.params.id;
    this.loading = true;
    try {
      await this.fetch();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="stylus" scoped>
.comment {
  padding: 0 8px;
  font-size: 12px;
}

.comment-item {
  display: flex;
  text-align: left;
  padding: 10px 0;
  border-bottom: 1px solid #efefef;

  &__side {
    flex: 0 0 50px;
    display: flex;
    justify-content: center;
  }

  &__avator {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f09199;
    overflow: hidden;
  }

  &__content {
    flex: 1;
  }

  &__head {
    display: flex;
    font-size: 10px;
    margin-bottom: 8px;
  }

  &__user {
    flex: 1;
    color: #f09199;
  }

  &__floor {
    flex: 0 0 20px;
    margin: 0 6px;
    color: #666;
  }

  &__time {
    flex: 0 0 100px;
    color: #666;
    text-align: right;
  }

  &__message {
    line-height: 2;

    & /deep/ img.code {
      width: 100%;
    }
  }
}

.comment-sub {
  margin-top: 8px;
  padding: 6px;
  background: #f7f7f7;
}

.comment-sub-item {
  margin-bottom: 4px;

  &__head {
    display: flex;
    font-size: 10px;
    margin-bottom: 4px;
  }

  &__user {
    flex: 1;
    color: #5a77e6;
  }

  &__time {
    flex: 0 0 100px;
    color: #666;
    text-align: right;
  }

  &__message {
    line-height: 1.6;
    padding: 4px;

    & /deep/ .quote {
      padding: 2px 8px;
      margin: 8px 0;
      border-left: 2px solid #eaeaea;
      color: #7f8fa4;
    }
  }
}
</style>
