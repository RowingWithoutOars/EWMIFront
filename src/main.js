import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
