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
              <span class="subject__name--cn ellipsis">{{ item.name_cn || '' }}</span>
              <span class="subject__name ellipsis">{{ item.name || '' }}</span>
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
export default class SearchSubjectList extends Vue {
  @Prop({ default: () => [] })
  list!: Types.ISubject[];

  enter(id: number | string) {
    this.$router.push(`/subject/${id}`);
  }
}
</script>

<style lang="stylus" scoped>
.subject-list {
  padding-top: 6px;
}

.module {
  margin: 10px 0;

  &__title {
    padding: 5px;
    font-size: 16px;
    color: #323232;
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
    width: 250px;
    margin-left: 12px;
    padding-right: 8px;
    text-align: left;
  }

  &__title {
    text-align: left;
    max-width: 100%;
    font-size: 12px;
    line-height: 1.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  &__name {
    display: block;
    width: 200px;
    font-size: 10px;
    color: #909090;
  }

  &__name--cn {
    display: block;
    width: 200px;
    font-size: 14px;
    color: #323232;
  }

  &__keywords {
    display: -webkit-box;
    white-space: normal;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    margin-top: 8px;
    padding-right: 12px;
    max-height: 6em;
    font-size: 10px;
    line-height: 1.6;
    overflow: hidden;
    color: #646464;
  }

  &__rating {
    font-size: 10px;
    height: 14px;
    line-height: 14px;
    color: #909090;
    margin-top: 15px;
  }

  &__rank {
    position: absolute;
    top: 0;
    right: 12px;
    width: 40px;
    height: 16px;
    border-radius: 10px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #fff;
    background: pink;
  }
}
</style>
