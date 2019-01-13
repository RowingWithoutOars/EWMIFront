import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');

const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const updateData = r => require.ensure([], () => r(require('@/page/updateData')), 'updateData');
const addData = r => require.ensure([], () => r(require('@/page/addData')), 'addData');
const deleData = r=> require.ensure([], () => r(require('@/page/deleData')), 'deleData');


const fyzwlist = r => require.ensure([], () => r(require('@/page/list/fyzwlist')), 'fyzwlist');
const fyzwswllist = r => require.ensure([], () => r(require('@/page/list/fyzwswllist')), 'fyzwswllist');

const fydwlist = r => require.ensure([], () => r(require('@/page/list/fydwlist')), 'fydwlist');
const fydwswllist = r => require.ensure([], () => r(require('@/page/list/fydwswllist')), 'fydwswllist');

const dqlist = r => require.ensure([], () => r(require('@/page/list/dqlist')), 'dqlist');
const dqswllist = r => require.ensure([], () => r(require('@/page/list/dqswllist')), 'dqswllist');


const xkwwswlist = r => require.ensure([], () => r(require('@/page/list/xkwwswlist')), 'xkwwswlist');
const xkwdnlist = r => require.ensure([], () => r(require('@/page/list/xkwdnlist')), 'xkwdnlist');

// const dnsjlist = r => require.ensure([], () => r(require('@/page/list/dnsjlist')), 'dnsjlist');
const szsjlist = r => require.ensure([], () => r(require('@/page/list/szsjlist')), 'szsjlist');



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
            path: '/fyzwlist',
            component: fyzwlist,
            // meta: ['浮游植物', '浮游植物'],
		},
        {
            path: '/fyzwswllist',
            component: fyzwswllist,
            // meta: ['浮游植物', '浮游植物'],
        },{
            path: '/fydwlist',
            component: fydwlist,
            // meta: ['浮游动物', '浮游动物'],
        },{
            path: '/fydwswllist',
            component: fydwswllist,
            // meta: ['浮游动物', '浮游动物'],
        },{
            path: '/dqlist',
            component: dqlist,
            // meta: ['底栖生物', '底栖生物'],
        },{
            path: '/dqswllist',
            component: dqswllist,
            // meta: ['底栖生物', '底栖生物'],
        },{
            path: '/xkwwswlist',
            component: xkwwswlist,
            // meta: ['胥口湾微生物数据', '胥口湾微生物数据'],
        }, {
            path: '/xkwdnlist',
            component: xkwdnlist,
            // meta: ['胥口湾底泥数据', '胥口湾底泥数据'],
        },{
            path: '/szsjlist',
            component: szsjlist,
            // meta: ['胥口湾底泥数据', '胥口湾底泥数据'],
        }, {
			path: '/visitor',
			component: visitor,
			// meta: ['图表', '用户分布'],
		},{
            path: '/statistic',
            component: statistic,
            // meta: ['图表', '统计'],
        },
        {
			path: '/adminSet',
			component: adminSet,
			// meta: ['设置', '管理员设置'],
		},{
			path: '/explain',
			component: explain,
			// meta: ['说明', '说明'],
		}, {
        path: '/addData',
        component: addData,
        meta: ['增加', '增加'],
        }, {
            path: '/updateData',
            component: updateData,
            meta: ['修改', '修改'],
        }, {
            path: '/delData',
            component: deleData,
            meta: ['删除', '删除'],
        }
		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
