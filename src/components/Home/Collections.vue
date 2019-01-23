<template>
  <div class="collection">
    <div v-ripple
         class="collection-card"
         v-for="item in collectionList"
         :key="item.text"
         @click="enter(item)">
      <div class="collection-card__post"
           :style="getPostStyle(item)">
      </div>
      <div class="collection-card__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import api from '@/api';

interface CollectionCard {
  text: string;
  href: string;
  params?: {
    airtime?: string;
    type?: string;
    sort?: string;
  };

  cover?: string;
}

const collectionList: CollectionCard[] = [
  {
    text: '标签浏览',
    href: '/tag',
    cover: '//lain.bgm.tv/pic/cover/l/9e/3c/12426_AoHT9.jpg'
  },
  {
    text: 'TOP 100',
    href: '/rank',
    cover: '',
    params: {
      airtime: ''
    }
  }
];

@Component({
  name: 'Collections'
})
export default class Collections extends Vue {
  collectionList: CollectionCard[] = [
    ...collectionList,
    {
      text: '2018 冬季番组',
      href: '/browser',
      params: {
        airtime: '2019-1'
      },
      cover: ''
    },
    {
      text: '2018 年度番组',
      href: '/browser',
      params: {
        airtime: '2018'
      },
      cover: ''
    },
    {
      text: '2018 秋季番组',
      href: '/browser',
      params: {
        airtime: '2018-10'
      },
      cover: ''
    },
    {
      text: '2018 夏季番组',
      href: '/browser',
      params: {
        airtime: '2018-7'
      },
      cover: ''
    },
    {
      text: '2018 春季番组',
      href: '/browser',
      params: {
        airtime: '2018-4'
      },
      cover: ''
    },
    {
      text: '2017 冬季番组',
      href: '/browser',
      params: {
        airtime: '2018-1'
      },
      cover: ''
    }
  ];

  get airtimeCollectionList(): CollectionCard[] {
    return this.collectionList.filter(
      item => item.params && item.params.hasOwnProperty('airtime')
    );
  }

  getPostStyle(item: CollectionCard) {
    if (item.cover) {
      return { backgroundImage: `url(${item.cover})` };
    }

    return {};
  }

  enter(item: CollectionCard) {
    const query: any = item.params || {};
    query.title = item.text;
    this.$router.push({ path: item.href, query });
  }

  async fetch() {
    const airtimeList = this.airtimeCollectionList.map(item => {
      const params = item.params || {};
      return params.airtime || '';
    });

    const browserCollectionList = await api.getBrowserCollection(
      airtimeList,
      1
    );

    for (let [index, item] of Object.entries(this.airtimeCollectionList)) {
      const topList: Types.IBrowserInfo[] = browserCollectionList[index];

      if (topList && topList.length && !item.cover) {
        item.cover = topList[0].cover.replace(/(cover\/)(.*?)(\/)/, '$1l$3');
      }
    }
  }

  created() {
    this.fetch();
  }
}
</script>

<style lang="stylus" scoped>
.collection {
  padding: 6px;
}

.collection-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 12px;
  border-radius: 2px;
  padding: 4px 8px 12px 8px;
  height: 150px;

  &__post {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 0 0 120px;
    background-color: #efefef;
    background-size: cover;
    background-position: center;
  }

  &__title {
    padding: 4px 0 0 6px;
    font-size: 16px;
    color: #464646;
    background: #fafafa;
  }
}
</style>
