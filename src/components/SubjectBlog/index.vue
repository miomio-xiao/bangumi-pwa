<template>
  <v-list three-line
          class="blog__list">
    <v-list-tile avatar
                 v-for="(item, index) in blogs"
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SubjectBlog extends Vue {
  @Prop({ type: Array, default: [] })
  blogs!: Array<Types.ISubjectBlog>;
}
</script>

<style lang="scss" scoped>
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
</style>
