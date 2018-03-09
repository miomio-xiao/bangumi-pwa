<template>
  <div class="subject-list">
    <div class="module">
      <h3 class="module__title">动画</h3>
      <ul class="module__items">
        <li class="subject"
            v-for="item in list"
            :key="item.id"
            @click="enter(item.id)">
          <div class="subject__poster"
               :style="{ backgroundImage: `url(${item.images ? (item.images.large || item.images.common || '') : ''})` }"></div>
          <div class="subject__infos">
            <div class="subject__title">
              <span class="subject__name--cn">{{ item.name_cn || '' }}</span>
              <span class="subject__name">{{ item.name || '' }}</span>
            </div>
            <div class="subject__keywords">
              {{ item.summary }}
            </div>
            <div class="subject__rating"
                 v-if="item.rating">
              <Rate :num="item.rating.score"></Rate>
              <span>{{ item.rating.total }}人</span>
            </div>
            <span class="subject__rank"
                  v-if="item.rank">{{ item.rank }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import Rate from './Rate.vue';

@Component({
  components: {
    Rate
  }
})
export default class SubjectList extends Vue {
  @Prop({type: Array, default: [] }) private list!: Array<any>;

  enter(id: number | string) {
    this.$router.push(`/subject/${id}`);
  }
}
</script>

<style lang="scss" scoped>
$fontSize: 14px;

.subject-list {
  padding-top: 6px;
}

.module {
  margin: 10px 0;
  &__title {
    padding: 5px;
    font-size: 16px;
    color: #555;
    text-align: left;
  }
}

.subject {
  display: flex;
  vertical-align: top;
  width: 100vw;
  padding-bottom: 8px;
  margin: 0 4px 10px 4px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  &__poster {
    flex: 0 0 100px;
    height: 140px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  &__infos {
    position: relative;
    flex: 1;
    margin-left: 12px;
    text-align: left;
  }

  &__title {
    text-align: left;
    max-width: 100%;
    font-size: $fontSize;
    line-height: 1.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  &__name {
    display: block;
    font-size: 14px;
    color: #ccc;
  }

  &__name--cn {
    display: block;
    font-size: 16px;
    color: #111;
  }

  &__keywords {
    margin: 8px 0;
    max-height: 3em;
    overflow: hidden;
  }

  &__rating {
    font-size: 12px;
    line-height: 14px;
    color: #aaa;
  }

  &__rank {
    position: absolute;
    top: 0;
    right: 12px;
    width: 40px;
    height: 18px;
    border-radius: 4px;
    line-height: 18px;
    text-align: center;
    color: #fff;
    background: pink;
  }
}
</style>
