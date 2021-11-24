import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import RoutinePlanner from '@/views/RoutinePlanner.vue';
import Statistics from '@/views/Statistics.vue';
import Coffee from '@/views/Coffee.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '',
		redirect: '/planner'
	},
	{
		path: '/planner',
		name: 'Routine Planner',
		component: RoutinePlanner
	},
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/coffee',
    name: 'Coffee Time',
    component: Coffee
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
