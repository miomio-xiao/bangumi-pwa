<template>
  <v-toolbar dark
             dense
             fixed
             tabs
             scroll-off-screen
             class="home-toolbar"
             color="primary">
    <h1 class="page__title ellipsis">{{ title }}</h1>
    <v-spacer></v-spacer>
    <v-btn icon
           to="/search">
      <v-icon>search</v-icon>
    </v-btn>

    <v-tabs slot="extension"
            v-model="curTab"
            color="primary"
            dense>
      <v-tabs-slider color="secondary"></v-tabs-slider>

      <v-tab v-for="item in tabItems"
             :key="item.value"
             :href="'#' + item.value">
        {{ item.label }}
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'HomeToolbar'
})
export default class HomeToolbar extends Vue {
  @Prop({ type: String, default: 'Bangumi' })
  title?: string;
  @Prop()
  tab!: string;
  @Prop({ type: Array, default: () => [] })
  tabItems!: any[];

  curTab: string = this.tab;

  @Watch('curTab')
  curTabWatch(tab: string) {
    this.$emit('update:tab', tab);
  }
}
</script>
<style lang="stylus" scoped>
.home-toolbar {
  & /deep/ {
    .v-toolbar__content {
      height: 48px !important;
    }

    .v-toolbar__extension {
      height: 48px !important;
    }
  }
}
</style>
