import {RoutineStore} from '@/store/routine-planner/RoutineStore';
import {StatisticStore} from '@/store/statistics/StatisticStore';

export interface StoreStateInterface {
	routineModule: RoutineStore;
  statisticModule: StatisticStore;
}
