<template>
  <div class="page">
    <Header hasBack
            :title="title">
    </Header>
    <div class="comment"
         v-if="!loading">
      <Comments :list="list" />
    </div>
    <Loading v-else
             :full="true"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header/index.vue';
import Loading from '@/components/Loading.vue';
import Comments from '@/components/Comments/index.vue';
import api from '@/api';

@Component({
  name: 'EpInfo',
  components: {
    Header,
    Comments,
    Loading
  }
})
export default class EpInfo extends Vue {
  id: string = '';
  list: Types.IComment[] = [];

  title: string = '章节讨论';
  loading: boolean = false;

  async fetch() {
    const epInfo: Types.IComment[] = await api.getEpInfo(this.id);

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
    background: #909090;
    overflow: hidden;
  }

  &__content {
    flex: 1;
  }

  &__head {
    display: flex;
    align-items: center;
    font-size: 10px;
    margin-bottom: 8px;
  }

  &__user {
    flex: 1;
    font-size: 12px;
    color: #f73e53;
  }

  &__floor {
    flex: 0 0 20px;
    margin: 0 6px;
    text-align: right;
    color: #909090;
  }

  &__time {
    flex: 0 0 75px;
    color: #909090;
    text-align: right;
  }

  &__message {
    line-height: 2;
    color: #323232;
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
    color: #70a0e4;
  }

  &__time {
    flex: 0 0 100px;
    color: #909090;
    text-align: right;
  }

  &__message {
    line-height: 1.6;
    padding: 4px;
    color: #323232;
  }
}
</style>
