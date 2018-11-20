<template>
  <ul class="comment__list">
    <li v-for="(item, index) in comments"
        :key="index"
        class="comment__item">
      <div class="comment__hd">
        <div class="comment__avatar">
          <img width="100%"
               height="100%"
               :src="item.avatar">
        </div>
        <span class="comment__title">
          <span class="comment__user">
            {{ item.name }}
          </span>
          <span class="comment__age">
            {{ item.age }}
          </span>
        </span>
        <span class="comment__star"
              v-if="item.starNum">
          <Rate :num="item.starNum"></Rate>
        </span>
      </div>
      <div class="comment__content"
           v-html="item.content"></div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';

@Component({
  name: 'SubjectComment',
  components: {
    Rate
  }
})
export default class SubjectComment extends Vue {
  @Prop()
  private comments!: Types.ISubjectComment[];
}
</script>

<style lang="stylus" scoped>
.comment {
  &__item {
    padding: 10px 0;
    line-height: 1.4em;
  }

  &__hd {
    display: flex;
    padding-bottom: 6px;
  }

  &__avatar {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
  }

  &__title {
    font-size: 12px;
    flex: 1;
    align-self: center;
    padding-left: 10px;
    color: #323232;
  }

  &__age {
    color: #909090;
  }

  &__star {
    flex: 0 0 auto;
    color: #999;
  }

  &__content {
    display: -webkit-box;
    white-space: normal;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-wrap: normal;
    padding-top: 4px;
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    color: #646464;
  }
}
</style>
