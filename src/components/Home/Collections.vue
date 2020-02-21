<template>
  <div class="collection">
    <div v-ripple
         class="collection-card"
         v-for="item in collectionList"
         :key="item.text"
         @click="enter(item)">
      <div :class="{
             'sc-loading': !item.cover,
             'collection-card__post': true
            }"
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

const dateMap = {
  0: '年度',
  10: '秋季',
  7: '夏季',
  4: '春季',
  1: '冬季'
};

const dateKeys = [0, 10, 7, 4, 1];

type dateKey = keyof typeof dateMap;

function getDateCollectionList(length: number) {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;

  let list = [];
  let keyIdx = 0;

  while (length > 0) {
    const loopKey = dateKeys[keyIdx % dateKeys.length] as dateKey;
    let currentYear = nowYear - ~~(keyIdx / dateKeys.length);

    if (nowMonth > loopKey || currentYear < nowYear) {
      let currentMonth = loopKey;
      const airtime =
        currentMonth === 0
          ? `${currentYear}`
          : `${currentYear}-${currentMonth}`;

      list.push({
        text: `${currentYear} ${dateMap[currentMonth]}番组`,
        href: '/browser',
        params: {
          airtime
        }
      });

      if (currentMonth !== 0) {
        length--;
      }
    }
    keyIdx++;
  }

  return list;
}

@Component({
  name: 'Collections'
})
export default class Collections extends Vue {
  collectionList: CollectionCard[] = [
    ...collectionList,
    ...getDateCollectionList(5)
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

.sc-loading {
  position: relative;
  overflow: hidden;
  background-color: #E2E2E2;

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: sc-loading 1.5s infinite;
  }
}

@keyframes sc-loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
