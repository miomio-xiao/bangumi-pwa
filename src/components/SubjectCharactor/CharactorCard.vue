<template>
  <div class="charactor">
    <div class="charactor__poster"
         v-lazy:background-image="image">
    </div>
    <span class="charactor__name">{{ charactor.name }}</span>
    <span class="charactor__name"
          v-if="charactor.name_cn && charactor.name !== charactor.name_cn">{{ charactor.name_cn }}</span>
    <div class="charactor__actor">
      CV:
      <span>{{ cv || '暂无信息' }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CharactorCard extends Vue {
  @Prop({ type: Object, default: [] })
  charactor!: Types.ISubjectCharactor;

  get cv(): string {
    if (this.charactor.actors) {
      return this.charactor.actors[0].name;
    }
    return '';
  }

  get image(): string {
    return this.charactor.images.grid || '';
  }
}
</script>

<style lang="scss" scoped>
.charactor {
  display: inline-block;
  vertical-align: top;
  width: 80px;
  margin: 4px;
  text-align: center;
  &__poster {
    width: 100%;
    height: 80px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  &__name {
    display: block;
    max-width: 100%;
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #111;
  }

  &__actor {
    margin-top: 6px;
    font-size: 12px;
    line-height: 14px;
    color: #aaa;
  }
}
</style>
