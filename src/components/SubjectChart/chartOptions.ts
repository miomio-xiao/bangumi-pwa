import { LinearGradient } from 'echarts/lib/util/graphic';
export const scoreArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const reviewLegend: Array<string> = ['people', 'rank', 'score'];

export default class ChartOptions {
  static rateBarOptions: Object = {
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

  static reviewLineOptions: Object = {
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

  static collectionPieOptions: Object = {
    title: {
      text: '收藏情况',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '收藏情况',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [],
        // roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(0, 0, 0, .6)'
            },
            formatter: '{b} : {c}'
          }
        },

        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(0, 0, 0, .6)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        padding: [20, 20, 20, 20],
        itemStyle: {
          normal: {
            // color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => {
          return Math.random() * 200;
        }
      }
    ]
  };
}
