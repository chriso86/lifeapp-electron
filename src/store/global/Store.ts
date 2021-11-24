import {initialState as routineState} from '@/store/routine-planner/RoutineInitialState';
import {initialState as statisticState} from '@/store/statistics/StatisticInitialState';
import {actions as routineActions, mutations as routineMutations} from '@/store/routine-planner/RoutineModule';
import {actions as statisticActions, mutations as statisticMutations} from '@/store/statistics/StatisticModule';
import {StoreStateInterface} from '@/store';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state: StoreStateInterface = {
	routineModule: routineState,
  statisticModule: statisticState
};

const actions = {
	...routineActions,
  ...statisticActions
};

const mutations = {
	...routineMutations,
  ...statisticMutations
};

export const store = new Vuex.Store({
	actions,
	mutations,
	state
});
