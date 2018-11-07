<template>
  <div :class="cls">
    <v-progress-circular indeterminate
                         :width="3"
                         color="pink" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ default: false })
  full!: boolean;

  get cls(): Object {
    return {
      loading: true,
      'loading--full': this.full
    };
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

.loading {
  @include flex-center();

  &--full {
    width: 100vw;
    height: 100vh;
  }
}
</style>
