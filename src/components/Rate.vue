<template>
  <div class="rating__stars">
    <span v-for="i in 5"
          :key="i"
          class="star"
          :style="styles"
          :class="starStatus(i, num)"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Rate extends Vue {
  @Prop({ default: 10 })
  num!: number;
  @Prop({ default: 10 })
  size!: number;

  get styles() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      backgroundSize: `${this.size}px ${this.size}px`
    };
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
}
</script>

<style lang="scss" scoped>
.rating__stars {
  display: inline-block;
  .star {
    display: inline-block;
    margin-right: 1px;
    width: 10px;
    height: 10px;
    background-size: 10px 10px;
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
</style>
