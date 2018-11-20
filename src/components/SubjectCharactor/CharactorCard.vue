<template>
  <div class="charactor">
    <div class="charactor__poster"
         v-lazy:background-image="image">
    </div>
    <span class="charactor__name">{{ charactor.name_cn || charactor.name }}</span>
    <div class="charactor__actor">
      CV:
      <span>{{ cv || '暂无信息' }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'CharactorCard'
})
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
    if (this.charactor.images) {
      return (
        this.charactor.images.large ||
        this.charactor.images.small ||
        this.charactor.images.grid ||
        ''
      );
    }

    return '';
  }
}
</script>

<style lang="stylus" scoped>
.charactor {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  margin: 4px;
  text-align: center;

  &__poster {
    width: 100px;
    height: 150px;
    overflow: hidden;
    background-size: contain;
    background-position: center;
  }

  &__name {
    display: block;
    max-width: 100%;
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.2em;
    overflow: hidden;
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
