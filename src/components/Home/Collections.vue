<template>
  <div class="collection">
    <div v-ripple
         class="collection-card"
         v-for="item in list"
         :key="item.text"
         @click="enter(item)">
      <div class="collection-card__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface CollectionCard {
  text: string;
  href: string;
  params?: {
    airtime?: string;
    type?: string;
    sort?: string;
  };
}

@Component({
  name: "Collections"
})
export default class Collections extends Vue {
  list: CollectionCard[] = [
    {
      text: "TOP 100",
      href: "/rank"
    },
    {
      text: "2018 年度番组",
      href: "/browser",
      params: {
        airtime: "2018"
      }
    },
    {
      text: "2018 秋季番组",
      href: "/browser",
      params: {
        airtime: "2018-10"
      }
    },
    {
      text: "2018 夏季番组",
      href: "/browser",
      params: {
        airtime: "2018-7"
      }
    }
  ];

  enter(item: CollectionCard) {
    const query: any = item.params || {};
    query.title = item.text;
    this.$router.push({ path: item.href, query });
  }
}
</script>

<style lang="stylus" scoped>
.collection {
  padding: 6px;
}

.collection-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  border-radius: 2px;
  padding: 4px 8px 12px 8px;
  height: 120px;
  background-image: linear-gradient(to bottom right, #f73e53, #ff8b62);

  &:nth-of-type(1) {
    background-image: linear-gradient(to bottom right, #f73e53, #ff5722);
  }

  &:nth-of-type(2n) {
    background-image: linear-gradient(to bottom right, #f73e53, #f09199);
  }

  &__title {
    font-size: 24px;
    color: #fff;
    font-weight: 400;
  }
}
</style>
