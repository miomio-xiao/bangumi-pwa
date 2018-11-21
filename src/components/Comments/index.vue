<template>
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
          <div class="comment-item__time">{{ item.time }}</div>
        </div>
        <div class="comment-item__message bgm-message"
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
            <div class="comment-sub-item__message bgm-message"
                 v-html="sub.content">

            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Comments'
})
export default class Comments extends Vue {
  @Prop()
  list!: Types.IComment[];
}
</script>

<style lang="stylus" scoped>
.comment-list {
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
    background: #f73e53;
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
    flex: 0 0 80px;
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
