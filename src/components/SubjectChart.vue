<template>
  <div class="chart-area">
    <chart :options="barOptions"
           :init-options="initOptions"
           theme="light"
           ref="rateChart"
           class="chart"></chart>
    <chart :options="lineOptions"
           :init-options="initOptions"
           theme="light"
           ref="reviewChart"
           class="chart"></chart>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator';
import { LinearGradient } from 'echarts/lib/util/graphic';
import api from '../api';

interface VECharts extends Element {
  showLoading: Function;
  hideLoading: Function;
  mergeOptions: Function;
}

const scoreArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const reviewLegend = ['people', 'rank', 'score'];

@Component
export default class SubjectChart extends Vue {
  @Prop() subject!: Types.ISubject;

  private initOptions: Object = { renderer: 'svg' };

  private barOptions: Object = {
    color: ['#3398DB'],
    xAxis: {
      type: 'category',
      data: scoreArr,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      name: '评分人数(人)',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        type: 'bar',
        data: [],
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      }
    ]
  };

  private lineOptions: Object = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: reviewLegend
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: [
      {
        type: 'value',
        name: 'rank',
        offset: 5,
        nameLocation: 'start',
        inverse: true,
        axisLine: {
          lineStyle: {}
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: 'score',
        offset: 10,
        axisLine: {
          show: false,
          lineStyle: {}
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        show: false,
        type: 'value',
        name: 'people',
        axisLine: {
          lineStyle: {}
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        type: 'line',
        symbolSize: 0,
        yAxisIndex: 0,
        data: []
      },
      {
        type: 'line',
        symbolSize: 0,
        smooth: true,
        yAxisIndex: 1,
        data: []
      },
      {
        type: 'line',
        symbolSize: 0,
        smooth: true,
        yAxisIndex: 2,
        data: []
      }
    ]
  };

  get subText() {
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

  async getRateData(id: number | string) {
    const rate = this.$refs.rateChart as VECharts;
    try {
      rate.showLoading({
        text: '正在加载',
        color: '#E91E63',
        maskColor: 'rgba(255, 255, 255, 0.4)'
      });
      rate.hideLoading();
      rate.mergeOptions({
        series: [
          {
            data: scoreArr.map(v => this.rateData[v] || '-')
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
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
    }
  }

  async mounted() {
    const id = this.$route.params.id;
    this.getRateData(id);
    this.getReviewData(id);
  }
}
</script>

<style lang="scss">
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
