import {StatisticStore} from '@/store/statistics/StatisticStore';

if (process.env.NODE_ENV === 'development') {
	// Test data
}

export const initialState: StatisticStore = {
  general: {routines: []}
};
