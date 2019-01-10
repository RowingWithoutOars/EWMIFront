import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');

const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const updateData = r => require.ensure([], () => r(require('@/page/updateData')), 'updateData');
const addData = r => require.ensure([], () => r(require('@/page/updateData')), 'addData');


const dnsjlist = r => require.ensure([], () => r(require('@/page/list/dnsjlist')), 'dnsjlist');
const dqlist = r => require.ensure([], () => r(require('@/page/list/dqlist')), 'dqlist');
const fydwlist = r => require.ensure([], () => r(require('@/page/list/fydwlist')), 'fydwlist');
const fyzwlist = r => require.ensure([], () => r(require('@/page/list/fyzwlist')), 'fyzwlist');
const wswqllist = r => require.ensure([], () => r(require('@/page/list/wswqllist')), 'wswqllist');



const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const minChart = r => require.ensure([], () => r(require('@/page/statistics/minChart')), 'minChart');
const statistic = r => require.ensure([], () => r(require('@/page/statistic')), 'statistic');

const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const map = r => require.ensure([], () => r(require('@/page/home/map')), 'map');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		cyd: '',
		children: [{
            path: '',
            component: home,
            meta: [],
		},{
            path: '/updateData',
            component: updateData,
            meta: ['修改数据', '修改数据'],
		}
		,{
            path: '/updateData',
            component: addData,
            meta: ['添加数据', '添加商品'],
        },{
            path: '/fyzwlist',
            component: fyzwlist,
            // meta: ['浮游植物', '浮游植物'],
		},{
            path: '/fydwlist',
            component: fyzwlist,
            // meta: ['浮游动物', '浮游动物'],
        },{
            path: '/dqlist',
            component: dqlist,
            // meta: ['底栖生物', '底栖生物'],
        },{
            path: '/wswqllist',
            component: wswqllist,
            // meta: ['微生物群落', '微生物群落'],
        },{
            path: '/dnsjlist',
            component: dnsjlist,
            // meta: ['底泥数据', '底泥数据'],
        },{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
            path: '/statistic',
            component: statistic,
            meta: ['图表', '统计'],
        },
        // {
        //     path: '/minChart',
        //     component: minChart,
        //     meta: ['图表', '用户分布'],
        // },
        {
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}
		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
