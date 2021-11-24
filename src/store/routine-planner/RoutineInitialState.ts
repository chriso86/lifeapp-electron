import {Routine} from '@/domain/model/routine-planner/Routine';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {RoutineStore} from '@/store';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {Icon} from '@/domain/model/common/Icon';

const routines: Routine[] = [];
const activities: Activity[] = [];
const timeFrequencies: TimeFrequency[] = [];
const activityCategories: ActivityCategory[] = [];
const icons: Icon[] = [];

if (process.env.NODE_ENV === 'development') {
  // Test data
}

export const initialState: RoutineStore = {
  routines,
  activities,
  timeFrequencies,
  activityCategories,
  icons,
  focusedActivityIconButton: null,
  activeActivity: null
};
