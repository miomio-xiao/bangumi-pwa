<template>
  <div :class="cls">
    <v-progress-circular indeterminate
                         :width="3"
                         color="primary" />
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

<style lang="stylus" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;

  &--full {
    width: 100vw;
    height: 100vh;
  }
}
</style>
