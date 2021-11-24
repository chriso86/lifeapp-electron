import {Routine} from '@/domain/model/routine-planner/Routine';
import {Activity} from '@/domain/model/routine-planner/Activity';
import ActivityIconButton from '@/components/ActivityIconButton.vue';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {Icon} from '@/domain/model/common/Icon';

export class RoutineStore {
	/**
	 * User defined routines
	 */
	public routines: Routine[];

	/**
	 * Global activities available for inclusion throughout the routines module
	 */
	public activities: Activity[];

	/**
	 * List of constructed Time Frequencies from DB
	 */
	public timeFrequencies: TimeFrequency[];

	/**
	 * List of constructed Icons from DB
	 */
	public icons: Icon[];

	/**
	 * List of activity categories from DB
	 */
	public activityCategories: ActivityCategory[];

	/**
	 * The active selected Routine being modified
	 */
	public activeRoutine?: Routine;

	/**
	 * The active selected Activity being modified
	 */
	public activeActivity: Activity | null;

	/**
	 * The activity currently selected for populating the ROUTINE BOARD
	 */
	public focusedActivityIconButton: ActivityIconButton | null;

	/**
	 * Flag used to drive the behavior of the modal for the time settings on routine
	 */
	public showTimeSettings?: boolean;

	/**
	 * Flag used to drive the behavior of the prompt for confirming deletion of a routine
	 */
	public showDeleteRoutinePrompt?: boolean;

	/**
	 * Flag used to drive the behavior of the modal for the creation of an Activity
	 */
	public showCreateActivityModal?: boolean;

  /**
   * Flag used to drive the behavior of the modal for Routine statistics
   */
  public showRoutineStatisticsModal?: boolean;

	/**
	 * Flag used to drive the routine page loading state
	 */
	public isLoading?: boolean;

	/**
	 * The HTML Element used to hold the routine page
	 */
	public routinePage?: HTMLElement;
}
