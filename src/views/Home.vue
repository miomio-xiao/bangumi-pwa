<template>
  <div class="home">
    <HomeToolbar :tab.sync="tab"
                 :tab-items="tabItems" />
    <div class="home__content">
      <keep-alive>
        <component :is="tab" />
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeToolbar from '@/components/Home/Toolbar.vue';
import Calendar from '@/views/Calendar.vue';
import Rank from '@/views/Rank.vue';
import Collections from '@/components/Home/Collections.vue';

@Component({
  name: 'home',
  components: {
    HomeToolbar,
    Collections,
    Calendar,
    Rank
  }
})
export default class Home extends Vue {
  tab: string = 'Calendar';
  tabItems: any[] = [
    {
      label: '每日放送',
      value: 'Calendar'
    },
    {
      label: '榜单',
      value: 'Collections'
    }
  ];
}
</script>

<style lang="stylus" scoped>
.home__content {
  margin-top: 100px;
  background: #f5f5f5;
}
</style>

