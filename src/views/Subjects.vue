<template>
  <div class="page" v-if="!loading">
    <header>
      <div class="bg" 
           :style="{ backgroundImage: `url(${image})` }"></div>
      <div class="card">
        <div class="card__poster" 
             :style="{ backgroundImage: `url(${image})` }"></div>
        <div class="card__info">
          <div class="card__title">
            <p>{{ subject.name_cn }}</p>
            <p>{{ subject.name }}</p>
          </div>
          <span class="score">{{ score }}</span>
          <div class="card__rating">
            <div class="rating__stars">
              <span v-for="i in 5"
                    :key="i"
                    class="star"
                    :class="starStatus(i, score)"></span>
            </div>
            <div class="total">{{ total }} 人评分</div>
          </div>
        </div>
      </div>
    </header>
    <div class="info">
      <p>{{ subject.air_date }}</p>
      <p>{{ staffs }}</p>
      <div class="summary">
        <h3>剧情简介</h3>
        <div class="content" v-html="subject.summary">
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-else>loading</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import api from '../api';

type Subject = {
  id: number,
  name: string,
  name_cn: string,
  air_date: string,
  rating: any,
  images: any,
  staff: Array<any>,
  summary: string
}

@Component
export default class Subjects extends Vue {
  private subject!: Subject
  private loading: boolean = false

  get score() {
    return this.subject.rating.score || 0;
  }

  get total() {
    return this.subject.rating.total || 0;
  }

  get image() {
    return this.subject.images.large;
  }

  get staffs() {
    const staffs:Array<any> = this.subject.staff;
    return staffs.map(staff => staff.name || staff.name_cn).join(' / ');
  }
  
  starStatus(pos: number, score: number): string {
    const num = 2 * pos;
    if (num <= score) {
      return 'full';
    } else if (num - 1 <= score) {
      return 'half';
    } else {
      return 'gray';
    }
  }
  
  async beforeRouterEach() {
    const id: string = this.$route.params.id;
    try {
      const data = await api.getSubjectById(id);
      console.log(data);
      this.subject = data;
    } catch (error) {
      console.log(error);
    }
  }

  async created() {
    this.loading = true;
    const id: string = this.$route.params.id;
    try {
      const data = await api.getSubjectById(id, 'large');
      console.log(data);
      this.subject = data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
}

header {
  position: relative;
  width: 100vw;
  height: 200px;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }
  .card {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 4;
    background: rgba(0, 0, 0, 0.75);

    &__poster {
      position: absolute;
      left: 20px;
      bottom: -25px;
      width: 120px;
      height: 176px;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
    &__info {
      position: absolute;
      left: 160px;
      bottom: 0;
      text-align: left;
    }

    &__title {
      font-size: 22px;
      p {
        margin: 10px 0;
        width: 60vw;
        line-height: 1.4em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }

    &__rating {
      display: inline-block;
    }

    .total {
      color: #ccc;
    }

    .score {
      display: inline-block;
      font-size: 48px;
    }
  }

  .rating__stars {
    display: inline-block;
    .star {
      display: inline-block;
      margin-right: 1px;
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
      background-color: transparent;
      background-repeat: no-repeat;
    }
    .full {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAfhJREFUOBGlVD1LHFEUPXfWrzGJO2uhaIQ0iljESgKSpAjBwpXVKikEl6TzD6TwJ4gWaQMBS8WQgCRZ61QpglUgRbQUbMR1XfwodvbmvE1mdt/ssDPBC493733nnrkf7w2QQrSU29D9wY8poJAkkG6hD8O5E+IGgJsHkr8+7hTjdDpsnA0PLkHE4yK2r5iETyYUfdUkkRa96W3VOhLqXv8oFHNhgGCC/Xwc2jFKR0J0966w1IwVp/LasiNGOBTdxV24bhbqenCQRUY9qLzl2CasGEUVdbyA1M5R1wrq/gUqVxUp4tLghCX85D7VlonFksJQ9Un3w5S8c2sy8z3TGtGDRsla8op0vKe3O0UuMRBVDm9N8uX1Zg/3s8+hmU/sGS/wf8kN0UWZP/tgokJCY+jX3ENmWqJ3zNiJonoKXxalcPY9wFqExqmf3fvIuL+SM2WZNX9SCheHAZnZ2++h9FyxufdaQfG6CBznTvQshtDhSyA4jQieRmExhO2gaFBoi5OK8EkYECiqX9jdd1wauP7tbVgrw8a/TzETBpkp1nWZ96sg8+VV8j0j6VF4Dozo3sB4ix0ZypD3iO3r+QvQbfi1KVkobwcBkj//hmp5msSbXHxqlC67bCtDDr2fN/43wYvMaFkK1dOALNjlJa6Z8RuIP0vfAZfVhj/iqoy46fpKwgAAAABJRU5ErkJggg==');
    }
    .half {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAe9JREFUOBGllDtIA0EQhmdvTxBfUbERElBQsDLWPlFsfIGNWAg+Ki3SCha2FoK92NoIPrCwsBYECx+VldjkgSCoZxRR8e7W/zZ3yW0uJlEXwu7O/PNlZmcSojKWOG48SKVSB2VISSslEof1LSTEOGNsEtBwKX1JIFXSHDH5xY529l9AQUARm/NB5n3ngsfiGR7VDwDY6kWi7PZ4PN7j3QvtxYGcLeQH6boesPk1KCmzxDZVU6gqRFwLEdPqiPQGvNw+vNVEwrzrvNZd6atlWVPI9tk0zTTn/MUwjHQ0Gn1z/AwjcYEudhFj3A0osCnAAn5psoQQ5xpgl8VhP8UH7BzAS42NGouArqIsNPXPS9i2vRKJRGKyKYCukU0zYH7+FomsPvCZBmzdic12mY0ZO5i6YWT6+AvoA7RD4XB4z4vJAh0DGzFOyfrq85wldqfMbsDO/DoFKB1cq/ELipwxOQwjpa4g0NbLzRBPLgLaIJAFRWoOuRsyLANI1JsLcU5ynLaQzZZzUX35Wl+XZehRbQeGvCkbJOgG5340K4bHX0ITBgG+9fzIsDmZTLZ5d2dXS+YVbgnCRGLrdP8UlZ13IzBrJwB2ArwBkyUBmqaU7f3gMyFClnROlr3EJtJXLkfZAH2HYTmRSOzij2ETX6A8wzc5maj6k+W68AAAAABJRU5ErkJggg==');
    }
    .gray {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeRJREFUOBGtlDsvBFEUx3d2djfiMbTsQ0NEwTaiQSGiRKWREDofgMJHEAqdSPSE0BC9SiEqWQWSzT4SzSbrsR7Fzo7fEXfNg9klbjI5j/s/vzn3MRMI1DFyudxaPp8/qEMa0GqJ0ul0QzgcvtM0zbAsqzMWi+X9aoJ+kzIXiUSmgLXhinZOcn6jJpDieRvA7tvSX64vMJvNdiAdV3I67c5kMkMq/s76AgHMUqTbC0Oh0II9dvvVQ0mlUs2GYbRWKpU2ij4swA3pylX0ZJrmNPn7crn8oOv6Y7FYfEgmk8+i07gOl0z24js6cUHqCU1uwbksefcfYPJCHeDFx5LpUq7DNp2GZeYPw2KrVuLx+Gp1D4GOATwEZvwGSFdv6Oe48PtSVwVKwCfWB/SEJyZxHaMAcBLYmdI6gJIEGg0Gg1e4tTqVZfawzBsFE+u5h4heyLfYRT/4LERrcs95gNwr+RI8nbsLJWa5I+68B8hbPSJ3kYq/03qAvHVYFShL7phni9hSuU/r0TqA8u9DOGArKvCZzXCKEzyL7O8o4Fs1T4ftHGKXisU6gOzfIKLIp2CnVCr1JhKJHVXAiZ4C7Ae8Ts6UPDfCsUUhJRYLrJGCa+xSNBo9ss8pH+gr/jK/tj0a2ETv2IZ35FSkS7HbzakAAAAASUVORK5CYII=');
    }
  }
}

.info {
  margin-top: 48px;
  padding: 0 10px;
  text-align: left;
  p {
    font-size: 14px;
    line-height: 1.6em;
  }
  .summary {
    margin-top: 12px;
    h3 {
      font-weight: normal;
      padding: 0 0 10px;
      color: #aaa;
    }
    .content {
      font-size: 14px;
      line-height: 1.4em;
    }
  }
}
</style>
