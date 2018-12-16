<template>
  <div class="wrapper"
       ref="wrapper">
    <Scroll ref="scroll"
            direction="horizontal"
            eventPassthrough="vertical">
      <ul class="wrapper__content"
          ref="list"
          :style="listStyles">
        <li v-for="site in siteList"
            :key="site.key"
            class="site">
          <a :href="site.url"
             class="site__link">
            <v-chip :color="colorMap[site.key] || '#f09199'"
                    text-color="#fff">{{ site.title }}</v-chip>
          </a>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BScroll from 'better-scroll';

// @ts-ignore
import Scroll from '@/components/scroll';

@Component({
  name: 'SubjectResource',
  components: {
    Scroll
  }
})
export default class SubjectResource extends Vue {
  @Prop({ type: Array, default: () => [] })
  siteList!: Types.ISubjectResourceInfo[];

  scroll: Scroll;

  colorMap = {
    offical: '#888888',

    bangumi: '#f09199',
    saraba1st: '#76cec9',

    acfun: '#fd4c5b',
    bilibili: '#f25d8e',
    tucao: '#e71158',
    sohu: '#d6000a',
    youku: '#1ebeff',
    tudou: '#ff6600',
    qq: '#ff820f',
    iqiyi: '#00be06',
    letv: '#e42112',
    pptv: '#00a0e9',
    kankan: '#24baf1',
    mgtv: '#ff5f00',
    nicovideo: '#060102',
    netflix: '#e50914',

    dmhy: '#224477',
    nyaa: '#99daa9'
  };

  get listStyles() {
    const width = this.siteList.length * 100;
    return {
      width: width + 'px'
    };
  }

  mounted() {
    this.$nextTick(() => {
      this.scroll = this.$refs.scroll;
      this.scroll.initScroll();
    });
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100vw;
  min-height: 32px;
  .wrapper__content {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  .site {
    font-size: 12px;

    &__link {
      text-decoration: none;
    }
  }
}
</style>
