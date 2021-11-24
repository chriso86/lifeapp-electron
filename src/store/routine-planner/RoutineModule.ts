import {
  ACTION_ADD_ACTIVITY,
  ACTION_ASSIGN_ACTIVITY_TO_CELL,
  ACTION_CLEAR_ACTIVITY_FROM_CELL,
  ACTION_CLEAR_ROUTINES,
  ACTION_DELETE_ACTIVITY,
  ACTION_DELETE_ROUTINE,
  ACTION_ADD_ROUTINE,
  ACTION_RESET_ROUTINE_BOARD,
  ACTION_SET_ACTIVE_ACTIVITY,
  ACTION_SET_ACTIVE_ACTIVITY_ICON_BUTTON,
  ACTION_SET_ACTIVE_ROUTINE,
  ACTION_SET_ACTIVITIES,
  ACTION_SET_ACTIVITY_CATEGORIES,
  ACTION_SET_ROUTINES,
  ACTION_SET_TIME_FREQUENCIES,
  ACTION_TOGGLE_CREATE_ACTIVITY_MODAL,
  ACTION_TOGGLE_DELETE_ROUTINE_PROMPT,
  ACTION_TOGGLE_LOADING_STATE,
  ACTION_TOGGLE_TIME_SETTINGS_MODAL,
  ACTION_UPDATE_ACTIVITY,
  ACTION_UPDATE_ROUTINE,
  MUTATION_ADD_ACTIVITY,
  MUTATION_ASSIGN_ACTIVITY_TO_CELL,
  MUTATION_CLEAR_ACTIVITY_FROM_CELL,
  MUTATION_CLEAR_ROUTINES,
  MUTATION_DELETE_ACTIVITY,
  MUTATION_DELETE_ROUTINE,
  MUTATION_RESET_ROUTINE_BOARD,
  MUTATION_SET_ACTIVE_ACTIVITY,
  MUTATION_SET_ACTIVE_ACTIVITY_ICON_BUTTON,
  MUTATION_SET_ACTIVE_ROUTINE,
  MUTATION_SET_ACTIVITIES,
  MUTATION_SET_ACTIVITY_CATEGORIES,
  MUTATION_SET_ROUTINES,
  MUTATION_SET_TIME_FREQUENCIES,
  MUTATION_TOGGLE_CREATE_ACTIVITY_MODAL,
  MUTATION_TOGGLE_DELETE_ROUTINE_PROMPT,
  MUTATION_TOGGLE_LOADING_STATE,
  MUTATION_TOGGLE_TIME_SETTINGS_MODAL,
  MUTATION_UPDATE_ACTIVITY,
  MUTATION_UPDATE_ROUTINE,
  StoreStateInterface,
  MUTATION_ADD_ROUTINE,
  ACTION_SET_ROUTINE_PAGE_ZONE,
  MUTATION_SET_ROUTINE_PAGE_ZONE,
  ACTION_SET_ICONS,
  MUTATION_SET_ICONS,
  ACTION_TOGGLE_ROUTINE_STATISTICS_MODAL,
  MUTATION_TOGGLE_ROUTINE_STATISTICS_MODAL
} from '@/store';
import {ActionContext, ActionTree, MutationTree, Store} from 'vuex';
import {
  PAYLOAD_ADD_ACTIVITY,
  PAYLOAD_ADD_ROUTINE,
  PAYLOAD_ASSIGN_ACTIVITY_TO_CELL,
  PAYLOAD_CLEAR_ACTIVITY_FROM_CELL,
  PAYLOAD_DELETE_ACTIVITY,
  PAYLOAD_DELETE_ROUTINE,
  PAYLOAD_SET_ACTIVE_ACTIVITY,
  PAYLOAD_SET_ACTIVE_ACTIVITY_ICON_BUTTON,
  PAYLOAD_SET_ACTIVE_ROUTINE,
  PAYLOAD_SET_ACTIVITIES,
  PAYLOAD_SET_ACTIVITY_CATEGORIES, PAYLOAD_SET_ICONS,
  PAYLOAD_SET_ROUTINE_PAGE_ZONE,
  PAYLOAD_SET_ROUTINES,
  PAYLOAD_SET_TIME_FREQUENCIES,
  PAYLOAD_TOGGLE_CREATE_ACTIVITY_MODAL,
  PAYLOAD_TOGGLE_DELETE_ROUTINE_PROMPT,
  PAYLOAD_TOGGLE_LOADING_STATE, PAYLOAD_TOGGLE_ROUTINE_STATISTICS_MODAL,
  PAYLOAD_TOGGLE_TIME_SETTINGS_MODAL,
  PAYLOAD_UPDATE_ACTIVITY,
  PAYLOAD_UPDATE_ROUTINE
} from '@/store/routine-planner/RoutinePayloadTypes';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {ArrayHelper} from '@/infra/common/ArrayHelper';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {Cell} from '@/domain/model/routine-planner/Cell';

type RoutineContext = ActionContext<StoreStateInterface, StoreStateInterface>;

export const actions: ActionTree<StoreStateInterface, StoreStateInterface> = {
	// Load Lists
	[ACTION_SET_ROUTINES](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ROUTINES
	) {
		commit(MUTATION_SET_ROUTINES, payload);
	},

	[ACTION_SET_ACTIVITIES](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ACTIVITIES
	) {
		commit(MUTATION_SET_ACTIVITIES, payload);
	},

	[ACTION_SET_ACTIVITY_CATEGORIES](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ACTIVITY_CATEGORIES
	) {
		commit(MUTATION_SET_ACTIVITY_CATEGORIES, payload);
	},

	[ACTION_SET_TIME_FREQUENCIES](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_TIME_FREQUENCIES
	) {
		commit(MUTATION_SET_TIME_FREQUENCIES, payload);
	},

	[ACTION_SET_ICONS](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ICONS
	) {
		commit(MUTATION_SET_ICONS, payload);
	},


	// Routines
	[ACTION_ADD_ROUTINE](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_ADD_ROUTINE
	) {
		commit(MUTATION_ADD_ROUTINE, payload);
	},

	[ACTION_DELETE_ROUTINE](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_DELETE_ROUTINE
	) {
		commit(MUTATION_DELETE_ROUTINE, payload);
	},

	[ACTION_UPDATE_ROUTINE](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_UPDATE_ROUTINE
	) {
		commit(MUTATION_UPDATE_ROUTINE, payload);
	},

	[ACTION_CLEAR_ROUTINES](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext
	) {
		commit(MUTATION_CLEAR_ROUTINES);
	},


	// Activities
	[ACTION_ADD_ACTIVITY](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_ADD_ACTIVITY
	) {
		commit(MUTATION_ADD_ACTIVITY, payload);
	},

	[ACTION_DELETE_ACTIVITY](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_DELETE_ACTIVITY
	) {
		commit(MUTATION_DELETE_ACTIVITY, payload);
	},

	[ACTION_UPDATE_ACTIVITY](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_UPDATE_ACTIVITY
	) {
		commit(MUTATION_UPDATE_ACTIVITY, payload);
	},


	// Focusing Items
	[ACTION_SET_ACTIVE_ROUTINE](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ACTIVE_ROUTINE
	) {
		commit(MUTATION_SET_ACTIVE_ROUTINE, payload);
	},

	[ACTION_SET_ACTIVE_ACTIVITY](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ACTIVE_ACTIVITY
	) {
		commit(MUTATION_SET_ACTIVE_ACTIVITY, payload);
	},

	[ACTION_SET_ACTIVE_ACTIVITY_ICON_BUTTON](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ACTIVE_ACTIVITY_ICON_BUTTON
	) {
		commit(MUTATION_SET_ACTIVE_ACTIVITY_ICON_BUTTON, payload);
	},


	// Routine Board
	[ACTION_RESET_ROUTINE_BOARD](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext
	) {
		commit(MUTATION_RESET_ROUTINE_BOARD);
	},

	[ACTION_ASSIGN_ACTIVITY_TO_CELL](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_ASSIGN_ACTIVITY_TO_CELL
	) {
		commit(MUTATION_ASSIGN_ACTIVITY_TO_CELL, payload);
	},

	[ACTION_CLEAR_ACTIVITY_FROM_CELL](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_CLEAR_ACTIVITY_FROM_CELL
	) {
		commit(MUTATION_CLEAR_ACTIVITY_FROM_CELL, payload);
	},


	// Modal and Loading States
	[ACTION_TOGGLE_TIME_SETTINGS_MODAL](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_TOGGLE_TIME_SETTINGS_MODAL
	) {
		commit(MUTATION_TOGGLE_TIME_SETTINGS_MODAL, payload);
	},

	[ACTION_TOGGLE_DELETE_ROUTINE_PROMPT](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_TOGGLE_DELETE_ROUTINE_PROMPT
	) {
		commit(MUTATION_TOGGLE_DELETE_ROUTINE_PROMPT, payload);
	},

	[ACTION_TOGGLE_CREATE_ACTIVITY_MODAL](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_TOGGLE_CREATE_ACTIVITY_MODAL
	) {
		commit(MUTATION_TOGGLE_CREATE_ACTIVITY_MODAL, payload);
	},

  [ACTION_TOGGLE_ROUTINE_STATISTICS_MODAL](
    this: Store<StoreStateInterface>,
    {commit}: RoutineContext,
    payload: PAYLOAD_TOGGLE_ROUTINE_STATISTICS_MODAL
  ) {
    commit(MUTATION_TOGGLE_ROUTINE_STATISTICS_MODAL, payload);
  },

	[ACTION_TOGGLE_LOADING_STATE](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_TOGGLE_LOADING_STATE
	) {
		commit(MUTATION_TOGGLE_LOADING_STATE, payload);
	},


	// HTML Element Setters
	[ACTION_SET_ROUTINE_PAGE_ZONE](
		this: Store<StoreStateInterface>,
		{commit}: RoutineContext,
		payload: PAYLOAD_SET_ROUTINE_PAGE_ZONE
	) {
		commit(MUTATION_SET_ROUTINE_PAGE_ZONE, payload);
	}
};

export const mutations: MutationTree<StoreStateInterface> = {
	// Load Lists
	[MUTATION_SET_ROUTINES](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ROUTINES
	) {
		state.routineModule.routines = payload.routines;
	},

	[MUTATION_SET_ACTIVITIES](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ACTIVITIES
	) {
		state.routineModule.activities = payload.activities;
	},

	[MUTATION_SET_ACTIVITY_CATEGORIES](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ACTIVITY_CATEGORIES
	) {
		state.routineModule.activityCategories = payload.activityCategories;
	},

	[MUTATION_SET_TIME_FREQUENCIES](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_TIME_FREQUENCIES
	) {
		state.routineModule.timeFrequencies = payload.timeFrequencies;
	},

	[MUTATION_SET_ICONS](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ICONS
	) {
		state.routineModule.icons = payload.icons;
	},


	// Routines
	[MUTATION_ADD_ROUTINE](
		state: StoreStateInterface,
		payload: PAYLOAD_ADD_ROUTINE
	) {
		state.routineModule = {
			...state.routineModule,
			routines: [
				...state.routineModule.routines,
				payload.routine
			].sort((a: Routine, b: Routine) =>
				ArrayHelper.naturalSort(a.dateCreated, b.dateCreated))
		};
	},

	[MUTATION_DELETE_ROUTINE](
		state: StoreStateInterface,
		payload: PAYLOAD_DELETE_ROUTINE
	) {
		state.routineModule = {
			...state.routineModule,
			routines: [
				...state.routineModule.routines
					.filter(i => i._id !== payload.routineId)
			].sort((a: Routine, b: Routine) =>
				ArrayHelper.naturalSort(a.dateCreated, b.dateCreated))
		};
	},

	[MUTATION_UPDATE_ROUTINE](
		state: StoreStateInterface,
		payload: PAYLOAD_UPDATE_ROUTINE
	) {
		const routineProps = payload;
		const routine = state.routineModule.activeRoutine;

		// I know this is bad, but it's the only way
		Object.assign(routine, routineProps);

		if (routine) {
			state.routineModule = {
				...state.routineModule,
				routines: [
					...state.routineModule.routines
						.filter(i => i._id !== routine._id),
					routine
				].sort((a: Routine, b: Routine) =>
					ArrayHelper.naturalSort(a.dateCreated, b.dateCreated))
			};
		}
	},

	[MUTATION_CLEAR_ROUTINES](
		state: StoreStateInterface
	) {
		// Clear routines from store ONLY (NOT DB)
		state.routineModule = {
			...state.routineModule,
			routines: []
		};
	},


	// Activities
	[MUTATION_ADD_ACTIVITY](
		state: StoreStateInterface,
		payload: PAYLOAD_ADD_ACTIVITY
	) {
		state.routineModule = {
			...state.routineModule,
			activities: [
				...state.routineModule.activities,
				payload.activity
			].sort((a: Activity, b: Activity) =>
				ArrayHelper.naturalSort(a.dateCreated, b.dateCreated))
		};
	},

	[MUTATION_DELETE_ACTIVITY](
		state: StoreStateInterface,
		payload: PAYLOAD_DELETE_ACTIVITY
	) {
		state.routineModule = {
			...state.routineModule,
			activities: [
				...state.routineModule.activities
					.filter(a => a._id !== payload.activityId)
			]
		};
	},

	[MUTATION_UPDATE_ACTIVITY](
		state: StoreStateInterface,
		payload: PAYLOAD_UPDATE_ACTIVITY
	) {
		const activityProps = payload;
		const activity = state.routineModule.activeActivity;

		// I know this is bad, but it's the only way
		Object.assign(activity, activityProps);

		if (activity) {
			state.routineModule = {
				...state.routineModule,
				activities: [
					...state.routineModule.activities
						.filter(i => i._id && i._id !== activity._id),
					activity
				].sort((a: Activity, b: Activity) =>
					ArrayHelper.naturalSort(a.dateCreated, b.dateCreated))
			};
		}
	},


	// Focusing Items
	[MUTATION_SET_ACTIVE_ROUTINE](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ACTIVE_ROUTINE
	) {
		state.routineModule = {
			...state.routineModule,
			activeRoutine: payload.routine
		};
	},

	[MUTATION_SET_ACTIVE_ACTIVITY](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ACTIVE_ACTIVITY
	) {
		state.routineModule = {
			...state.routineModule,
			activeActivity: payload.activity
		};
	},

	[MUTATION_SET_ACTIVE_ACTIVITY_ICON_BUTTON](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ACTIVE_ACTIVITY_ICON_BUTTON
	) {
		state.routineModule = {
			...state.routineModule,
			focusedActivityIconButton: payload.activityIconButton
		};
	},


	// Routine Board
	[MUTATION_RESET_ROUTINE_BOARD](
		state: StoreStateInterface
	) {
		const activeRoutine = state.routineModule.activeRoutine;

		if (activeRoutine) {
			state.routineModule = {
				...state.routineModule,
				routines: [
					...state.routineModule.routines.map((r: Routine) => {
						if (r._id === activeRoutine._id) {
							r.recalculateCells();
						}

						return r;
					})
				]
			};
		}
	},

	[MUTATION_ASSIGN_ACTIVITY_TO_CELL](
		state: StoreStateInterface,
		payload: PAYLOAD_ASSIGN_ACTIVITY_TO_CELL
	) {
		const activeRoutine = state.routineModule.activeRoutine;

		if (activeRoutine) {
			state.routineModule = {
				...state.routineModule,
				routines: [
					...state.routineModule.routines.map((r: Routine) => {
						if (r._id === activeRoutine._id) {
							r.cells = [
								...r.cells.map((c: Cell) => {
									if (c.day === payload.cell.day &&
										c.time.hour === payload.cell.time.hour &&
										c.time.minutes === payload.cell.time.minutes) {
										c.assignActivity(payload.activity);
									}

									return c;
								})
							];
						}

						return r;
					})
				]
			};
		}
	},

	[MUTATION_CLEAR_ACTIVITY_FROM_CELL](
		state: StoreStateInterface,
		payload: PAYLOAD_CLEAR_ACTIVITY_FROM_CELL
	) {
		const activeRoutine = state.routineModule.activeRoutine;

		if (activeRoutine) {
			state.routineModule = {
				...state.routineModule,
				routines: [
					...state.routineModule.routines.map((r: Routine) => {
						if (r._id === activeRoutine._id) {
							r.cells = [
								...r.cells.map((c: Cell) => {
									if (c.day === payload.cell.day &&
										c.time.hour === payload.cell.time.hour &&
										c.time.minutes === payload.cell.time.minutes) {
										c.clearActivity();
									}

									return c;
								})
							];
						}

						return r;
					})
				]
			};
		}
	},


	// Modal and Loading States
	[MUTATION_TOGGLE_TIME_SETTINGS_MODAL](
		state: StoreStateInterface,
		payload: PAYLOAD_TOGGLE_TIME_SETTINGS_MODAL
	) {
		state.routineModule = {
			...state.routineModule,
			showTimeSettings: payload.isOpen
		};
	},

	[MUTATION_TOGGLE_DELETE_ROUTINE_PROMPT](
		state: StoreStateInterface,
		payload: PAYLOAD_TOGGLE_DELETE_ROUTINE_PROMPT
	) {
		state.routineModule = {
			...state.routineModule,
			showDeleteRoutinePrompt: payload.isOpen
		};
	},

  [MUTATION_TOGGLE_CREATE_ACTIVITY_MODAL](
    state: StoreStateInterface,
    payload: PAYLOAD_TOGGLE_CREATE_ACTIVITY_MODAL
  ) {
    state.routineModule = {
      ...state.routineModule,
      showCreateActivityModal: payload.isOpen
    };
  },

  [MUTATION_TOGGLE_ROUTINE_STATISTICS_MODAL](
    state: StoreStateInterface,
    payload: PAYLOAD_TOGGLE_ROUTINE_STATISTICS_MODAL
  ) {
    state.routineModule = {
      ...state.routineModule,
      showRoutineStatisticsModal: payload.isOpen
    };
  },

	[MUTATION_TOGGLE_LOADING_STATE](
		state: StoreStateInterface,
		payload: PAYLOAD_TOGGLE_LOADING_STATE
	) {
		state.routineModule = {
			...state.routineModule,
			isLoading: payload.isLoading
		};
	},


	// HTML Element Setters
	[MUTATION_SET_ROUTINE_PAGE_ZONE](
		state: StoreStateInterface,
		payload: PAYLOAD_SET_ROUTINE_PAGE_ZONE
	) {
		state.routineModule = {
			...state.routineModule,
			routinePage: payload.element
		};
	}
};
