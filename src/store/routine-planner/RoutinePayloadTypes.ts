import {Routine} from '@/domain/model/routine-planner/Routine';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {Cell} from '@/domain/model/routine-planner/Cell';
import ActivityIconButton from '@/components/ActivityIconButton.vue';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {Icon} from '@/domain/model/common/Icon';

// Load Lists
export type PAYLOAD_SET_TIME_FREQUENCIES = { timeFrequencies: TimeFrequency[] };
export type PAYLOAD_SET_ROUTINES = { routines: Routine[] };
export type PAYLOAD_SET_ACTIVITIES = { activities: Activity[] };
export type PAYLOAD_SET_ACTIVITY_CATEGORIES = { activityCategories: ActivityCategory[] };
export type PAYLOAD_SET_ICONS = { icons: Icon[] };

// Routine
export type PAYLOAD_ADD_ROUTINE = { routine: Routine };
export type PAYLOAD_DELETE_ROUTINE = { routineId: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PAYLOAD_UPDATE_ROUTINE = { [key: string]: any };

// Activity
export type PAYLOAD_ADD_ACTIVITY = { activity: Activity };
export type PAYLOAD_DELETE_ACTIVITY = { activityId: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PAYLOAD_UPDATE_ACTIVITY = { [key: string]: any };

// Focusing Items
export type PAYLOAD_SET_ACTIVE_ROUTINE = { routine: Routine };
export type PAYLOAD_SET_ACTIVE_ACTIVITY = { activity: Activity | null };
export type PAYLOAD_SET_ACTIVE_ACTIVITY_ICON_BUTTON = { activityIconButton: ActivityIconButton | null };

// Routine Board
export type PAYLOAD_ASSIGN_ACTIVITY_TO_CELL = { cell: Cell; activity: Activity };
export type PAYLOAD_CLEAR_ACTIVITY_FROM_CELL = { cell: Cell };

// Modal and Loading States
export type PAYLOAD_TOGGLE_TIME_SETTINGS_MODAL = { isOpen: boolean };
export type PAYLOAD_TOGGLE_DELETE_ROUTINE_PROMPT = { isOpen: boolean };
export type PAYLOAD_TOGGLE_CREATE_ACTIVITY_MODAL = { isOpen: boolean };
export type PAYLOAD_TOGGLE_ROUTINE_STATISTICS_MODAL = { isOpen: boolean };
export type PAYLOAD_TOGGLE_LOADING_STATE = { isLoading: boolean };

// HTML Element Setters
export type PAYLOAD_SET_ROUTINE_PAGE_ZONE = { element: HTMLElement };

