<template>
  <v-toolbar dark
             dense
             :fixed="fixToolbar"
             :class="cls"
             color="primary">
    <slot name="left">
      <v-btn v-if="hasBack"
             icon
             @click="back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </slot>
    <slot>
      <h1 class="page__title ellipsis">{{ title }}</h1>
    </slot>
    <v-spacer v-if="$slots.tail"></v-spacer>
    <slot name="tail">
      <v-btn icon
             to="/search"
             v-if="hasSearch">
        <v-icon>search</v-icon>
      </v-btn>
    </slot>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import bus from '@/EventBus';

@Component({
  name: 'Header'
})
export default class Header extends Vue {
  @Prop({ type: String, default: 'bangumi' })
  title?: string;
  @Prop({ type: Boolean, default: false })
  hasBack?: boolean;
  @Prop({ type: Boolean, default: false })
  hasSearch?: boolean;
  @Prop({ type: Boolean, default: false })
  fixed?: boolean;
  @Prop({ type: Number, default: 0 })
  fixHeight?: number;
  @Prop({ type: Boolean, default: false })
  relative?: boolean;

  offsetTop: number = 0;

  get cls(): object {
    return {
      'header--relative': this.relative
    };
  }

  get fixToolbar(): boolean {
    if (this.fixed) {
      return true;
    }

    if (!!this.fixHeight) {
      return this.offsetTop > this.fixHeight;
    }

    return false;
  }

  mounted() {
    bus.$on('page-scroll', this.pageScroll);
  }

  beforeDestroy() {
    bus.$off('page-scroll', this.pageScroll);
  }

  pageScroll({ offsetTop }: { offsetTop: number }) {
    this.offsetTop = offsetTop;
  }

  back() {
    this.$router.go(-1);
  }
}
</script>

<style lang="stylus" scoped>
.header--relative {
  position: relative;
  z-index: 9;
}
</style>
