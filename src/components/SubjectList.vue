<template>
  <div class="subject-list">
    <div class="module">
      <h3 class="module__title">title</h3>
      <ul class="module__items">
        <li class="subject"
            v-for="item in list">
          <div class="subject__poster"></div>
          <div class="subject__infos">
            <div class="subject__title">
              <span class="subject__name--cn">cnName</span>
              <span class="subject__name">name</span>
            </div>
            <div class="subject__keywords">
              keywords
            </div>
            <div class="subject__rating"
                 v-if="item.rating">
              <Rate :num="item.rating.score"></Rate>
              <span>{{ item.rating.total }}</span>
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

  created() {
    console.log(this.list);
  }
}
</script>

<style lang="scss" scoped>
$fontSize: 14px;

.subject {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  margin: 4px;
  text-align: center;
  &__poster {
    width: 100%;
    height: 100px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    border: 2px solid pink;
  }

  &__title {
    display: block;
    max-width: 100%;
    margin-top: 6px;
    font-size: $fontSize;
    line-height: $fontSize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #111;
  }

  &__rating {
    margin-top: 6px;
    font-size: 12px;
    line-height: 14px;
    color: #aaa;
  }
}
</style>
