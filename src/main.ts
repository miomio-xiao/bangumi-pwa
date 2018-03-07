import Vue from 'vue';
import Vuetify from 'vuetify';

import ECharts from 'vue-echarts/components/ECharts.vue';
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/theme/light'

import App from './App.vue';
import router from './router';
import './registerServiceWorker.ts';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.component('chart', ECharts);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
