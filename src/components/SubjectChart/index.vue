<template>
  <div class="chart-area">
    <chart :options="barOptions"
           :init-options="initOptions"
           theme="light"
           ref="rateChart"
           class="chart"></chart>

    <chart :options="pieOptions"
           :init-options="initOptions"
           theme="light"
           ref="collectionChart"
           class="chart"></chart>

    <chart :options="lineOptions"
           :init-options="initOptions"
           v-show="showReviewChart"
           theme="light"
           ref="reviewChart"
           class="chart"></chart>

  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator';
import ChartOptions, { scoreArr, reviewLegend } from './chartOptions';
import api from '@/api';

interface VECharts extends Element {
  showLoading: Function;
  hideLoading: Function;
  mergeOptions: Function;
}

@Component
export default class SubjectChart extends Vue {
  @Prop()
  subject!: Types.ISubject;

  private showReviewChart: Boolean = true;

  private initOptions: Object = { renderer: 'svg' };

  private barOptions: Object = ChartOptions.rateBarOptions;

  private lineOptions: Object = ChartOptions.reviewLineOptions;

  private pieOptions: Object = ChartOptions.collectionPieOptions;

  get subText(): string {
    if (this.subject.rank) {
      return `Bangumi Anime Ranked: #${this.subject.rank}`;
    }
    return '';
  }

  get rateData() {
    if (this.subject) {
      return this.subject.rating.count || {};
    }
    return {};
  }

  get collectionData(): Types.ISubjectCollection {
    if (this.subject) {
      return this.subject.collection || {};
    }
    return {};
  }

  get rateTotal(): number {
    if (this.subject) {
      return this.subject.rating.total || 0;
    }
    return 0;
  }

  getRange(data: Array<number>) {
    const sum = (x: number, y: number): number => x + y;

    const square = (x: number): number => x * x;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const mean = data.reduce(sum) / data.length;
    const deviations = data.map(x => x - mean);
    const stddev = Math.sqrt(
      deviations.map(square).reduce(sum) / (data.length - 1)
    );

    const minAxis = Math.floor(min - stddev) > 0 ? Math.floor(min - stddev) : 0;
    const maxAxis = Math.floor(max + stddev);

    return {
      min,
      max,
      minAxis,
      maxAxis,
      mean,
      stddev
    };
  }

  async getRateData() {
    const rates = this.$refs.rateChart as VECharts;
    rates.showLoading({
      text: '正在加载',
      color: '#E91E63',
      maskColor: 'rgba(255, 255, 255, 0.4)'
    });
    rates.hideLoading();
    rates.mergeOptions({
      series: [
        {
          data: scoreArr.map(v => this.rateData[v] || '-')
        }
      ]
    });
  }

  async getCollectionData() {
    let collectionArr: Array<Types.kvObject> = [
      { name: '想看', value: this.collectionData.wish },
      { name: '看过', value: this.collectionData.collect },
      { name: '在看', value: this.collectionData.doing },
      { name: '搁置', value: this.collectionData.on_hold },
      { name: '抛弃', value: this.collectionData.dropped }
    ];
    const collections = this.$refs.collectionChart as VECharts;
    collections.showLoading({
      text: '正在加载',
      color: '#E91E63',
      maskColor: 'rgba(255, 255, 255, 0.4)'
    });
    collections.hideLoading();
    collections.mergeOptions({
      series: [
        {
          data: collectionArr.sort((a, b) => a.value - b.value)
        }
      ]
    });
  }

  async getReviewData(id: number | string) {
    const review = this.$refs.reviewChart as VECharts;
    try {
      review.showLoading({
        text: '正在加载',
        color: '#E91E63',
        maskColor: 'rgba(255, 255, 255, 0.4)'
      });
      const { people, rank, score, time } = await api.review({ id });

      const peopleRange = this.getRange(people);
      const rankRange = this.getRange(rank);
      const scoreRange = this.getRange(score);
      review.hideLoading();
      review.mergeOptions({
        xAxis: {
          data: time
        },
        yAxis: [
          {
            min: rankRange.minAxis || 1,
            max: rankRange.maxAxis
          },
          {
            min: +(scoreRange.min - scoreRange.stddev).toFixed(2),
            max: +(scoreRange.max + scoreRange.stddev).toFixed(2)
          },
          {
            min: peopleRange.minAxis,
            max: peopleRange.maxAxis
          }
        ],
        series: [
          {
            name: 'rank',
            data: rank
          },
          {
            name: 'score',
            data: score
          },
          {
            name: 'people',
            data: people
          }
        ]
      });
    } catch (error) {
      console.log(error);
      this.showReviewChart = false;
    }
  }

  async mounted() {
    const id = this.$route.params.id;
    this.getRateData();
    this.getCollectionData();
    this.getReviewData(id);
  }
}
</script>

<style lang="stylus">
.chart-area {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  max-width: 100vw;
}
.chart {
  max-width: 100vw;
  min-width: 100vw;
}
</style>
