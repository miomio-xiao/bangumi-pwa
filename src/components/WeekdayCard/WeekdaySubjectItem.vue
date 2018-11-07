<template>
  <div class="item"
       @click="enter">
    <div class="item__poster"
         v-lazy:background-image="image">
    </div>
    <span class="item__title">{{ subject.name_cn || subject.name }}</span>
    <div class="item__rating">
      <template v-if="score">
        <Rate :num="score"></Rate>
        <span class="rating__score">{{ score }}</span>
      </template>
      <span v-else>暂无评分</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';

@Component({
  name: 'WeekdaySubjectItem',
  components: {
    Rate
  }
})
export default class WeekdaySubjectItem extends Vue {
  @Prop()
  subject!: Types.ISubject;

  get score() {
    if (this.subject.rating) {
      return this.subject.rating.score;
    } else {
      return 0;
    }
  }

  get image() {
    if (!this.subject.images) {
      return '';
    }

    return this.subject.images.common || this.subject.images.large;
  }

  starStatus(pos: number, score: number): string {
    const num = 2 * pos;
    if (num <= score) {
      return 'full';
    } else if (num - 1 <= score) {
      return 'half';
    } else {
      return 'gray';
    }
  }

  enter() {
    this.$router.push(`/subject/${this.subject.id}`);
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  margin: 4px;
  text-align: center;
  &__poster {
    width: 100%;
    height: 100px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  &__title {
    display: block;
    max-width: 100%;
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #111;
  }

  &__rating {
    margin-top: 6px;
    font-size: 12px;
    line-height: 14px;
    color: #aaa;
  }
}
</style>
