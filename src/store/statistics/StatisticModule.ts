import {ActionContext, ActionTree, MutationTree, Store} from 'vuex';
import {StoreStateInterface} from '@/store';
import {ACTION_GENERATE_OVERVIEW, ACTION_GENERATE_ROUTINE_OVERVIEW} from '@/store/statistics/StatisticActionTypes';
import {PAYLOAD_GENERATE_OVERVIEW, PAYLOAD_GENERATE_ROUTINE_OVERVIEW} from '@/store/statistics/StatisticPayloadTypes';
import {
  MUTATION_GENERATE_OVERVIEW,
  MUTATION_GENERATE_ROUTINE_OVERVIEW
} from '@/store/statistics/StatisticMutationTypes';
import {RoutineStatisticFactory} from '@/store/statistics/RoutineStatisticFactory';

type RoutineContext = ActionContext<StoreStateInterface, StoreStateInterface>;

export const actions: ActionTree<StoreStateInterface, StoreStateInterface> = {
  // General
  [ACTION_GENERATE_OVERVIEW](
    this: Store<StoreStateInterface>,
    {commit}: RoutineContext,
    payload: PAYLOAD_GENERATE_OVERVIEW
  ) {
    commit(MUTATION_GENERATE_OVERVIEW, payload);
  },

  // Routines
  [ACTION_GENERATE_ROUTINE_OVERVIEW](
    this: Store<StoreStateInterface>,
    {commit}: RoutineContext,
    payload: PAYLOAD_GENERATE_ROUTINE_OVERVIEW
  ) {
    commit(MUTATION_GENERATE_ROUTINE_OVERVIEW, payload);
  }
};

export const mutations: MutationTree<StoreStateInterface> = {
  // General
  [MUTATION_GENERATE_OVERVIEW](
    state: StoreStateInterface,
    payload: PAYLOAD_GENERATE_OVERVIEW
  ) {
    state.statisticModule = {
      ...state.statisticModule,
      general: {
        routines: payload.routines.map(r => RoutineStatisticFactory.buildRadarForActivitiesPerDay(r))
      }
    }
  },

  // Routines
  [MUTATION_GENERATE_ROUTINE_OVERVIEW](
    state: StoreStateInterface,
    payload: PAYLOAD_GENERATE_ROUTINE_OVERVIEW
  ) {
    const routine = payload.routine;

    state.statisticModule = {
      ...state.statisticModule,
      activeRoutine: {
        activityDistributionSummary: RoutineStatisticFactory.buildSummaryForActivities(routine),
        activityCategoryDistributionSummary: RoutineStatisticFactory.buildSummaryForActivityCategories(routine),
        polarAreaActivityDistribution: RoutineStatisticFactory.buildPolarAreaForActivities(routine),
        polarAreaActivityCategoryDistribution: RoutineStatisticFactory.buildPolarAreaForActivityCategories(routine)
      }
    };
  }
};
