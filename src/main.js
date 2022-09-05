import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import store from './store/index'
import './plugins/base'
import { API } from "../http-common";
import DatetimePicker from 'vuetify-datetime-picker'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
// import ECharts modules manually to reduce bundle size
import VueApexCharts from "vue-apexcharts";
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.use(VueSweetalert2);

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(DatetimePicker)







Vue.use({
    install(Vue) {
        Vue.prototype.$api = API
    }
});
Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
