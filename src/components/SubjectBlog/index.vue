<template>
  <ul class="blog__list">
    <li v-for="(item, index) in blogs"
        :key="index"
        class="blog__item"
        @click="enterBlog(item)">
      <div class="blog__hd">
        <div class="blog__avatar">
          <img width="100%"
               height="100%"
               :src="item.user.avatar.small">
        </div>
        <span class="blog__user">{{ item.user.nickname }}</span>
        <span class="blog__time">{{ item.dateline }}</span>
      </div>
      <div class="blog__title">{{ item.title }}</div>
      <div class="blog__content"
           v-html="item.summary"></div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SubjectBlog extends Vue {
  @Prop({ type: Array, default: [] })
  blogs!: Array<Types.ISubjectBlog>;

  enterBlog(item: Types.ISubjectBlog) {
    this.$emit('on-click', item);
  }
}
</script>

<style lang="stylus" scoped>
.blog {
  &__item {
    max-height: 150px;
    margin-bottom: 15px;
    line-height: 1.4em;
  }

  &__hd {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  &__avatar {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
  }

  &__title {
    font-size: 16px;
    color: #323232;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }

  &__user {
    flex: 1;
    align-self: center;
    padding-left: 10px;
    font-size: 14px;
    color: #000;
  }

  &__time {
    flex: 0 0 auto;
    font-size: 12px;
    color: #909090;
  }

  &__content {
    display: -webkit-box;
    white-space: normal;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    padding-top: 8px;
    font-size: 12px;
    line-height: 1.4em;
    max-height: 90px;
    overflow: hidden;
    color: #646464;
  }
}
</style>
