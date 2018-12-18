<template>
  <div class="subject-tag">
    <ul class="subject-tag__items">
      <li class="subject-tag__item"
          v-for="item in tagList"
          :key="item.text"
          @click="clickTag(item)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SubjectTag extends Vue {
  @Prop({ type: Array, default: () => [] })
  tagList!: Types.ITag[];

  clickTag(item: Types.ITag) {
    this.$emit('click-item', item);
  }
}
</script>

<style lang="stylus" scoped>
.subject-tag {
  &__items {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  &__item {
    margin: 6px;
    padding: 4px 10px;
    border-radius: 1px;
    font-size: 12px;
    background: #ff8b62;
    color: #fff;
  }
}
</style>
