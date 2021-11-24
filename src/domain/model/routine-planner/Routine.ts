import {DataDocument} from '@/domain/model/common/DataDocument';
import {RoutineTimeSettings} from '@/domain/model/routine-planner/RoutineTimeSettings';
import {Cell} from '@/domain/model/routine-planner/Cell';
import {TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import {Time} from '@/domain/model/common/Time';
import {DropdownOption} from '@/domain/model/common/DropdownOption';
import {ObjectHelper} from '@/infra/common/ObjectHelper';

export class Routine extends DataDocument {
	/**
	 * The name of the routine
	 */
	public name: string;

	/**
	 * How often should the routine occur?
	 */
	public intervalFrequency: DropdownOption<number>;

	/**
	 * The week number within a month where to start the routine
	 */
	public startWeek: DropdownOption<number>;

	/**
	 * Flag to indicate whether this routine is currently active or disabled
	 */
	public isEnabled: boolean;

	/**
	 * The time specific settings used to draw the routine activity slots
	 * These are critical settings
	 * !!! If these settings are changed the routine activity slots will need to be redrawn !!!
	 */
	public timeSettings: RoutineTimeSettings;

	/**
	 * The list of cells is where the activities are mapped to the routine
	 * Contains information about the activity and date linked
	 */
	public cells: Cell[];

	/**
	 * Sanity getter to check whether this routine has been initialized correctly
	 */
	public constructed(): boolean {
		return !!this.recalculateCells;
	}

	/**
	 * Flag to indicate if push notifications are enabled for this routine
	 */
	public pushNotificationsEnabled: boolean;

	/**
	 * Flag to indicate if email notifications are enabled for this routine
	 */
	public emailNotificationsEnabled: boolean;

	constructor(
		name: string,
		frequency: DropdownOption<number>,
		startWeek: DropdownOption<number>,
		isEnabled: boolean,
		timeSettings: RoutineTimeSettings,
		cells: Cell[],
		pushNotificationsEnabled: boolean,
		emailNotificationsEnabled: boolean
	) {
		super();

		this.name = name || '';
		this.intervalFrequency = frequency;
		this.startWeek = startWeek;
		this.isEnabled = ObjectHelper.isNotNullOrUndefined(isEnabled) ? isEnabled : true;
		this.timeSettings = timeSettings;
		this.pushNotificationsEnabled = pushNotificationsEnabled;
		this.emailNotificationsEnabled = emailNotificationsEnabled;

		if (cells.length) {
			this.cells = cells;
		} else {
			this.recalculateCells();
		}
	}

	recalculateCells(): void {
		const totalMinutes = this.timeSettings.getNumberOfMinutes();
		const timeFrequencyData = this.timeSettings.timeFrequency?.data;
		const interval = (timeFrequencyData && timeFrequencyData.interval) || 1;
		const uom = (timeFrequencyData && timeFrequencyData.intervalUom) || TimeDurationEnum.Hours;
		const multiplier = (uom === TimeDurationEnum.Hours) ? 60 : 1;
		const divisor = interval * multiplier;

		this.cells = [];
		this.addCells(totalMinutes, divisor);
	}

	private addCells(
		totalMinutes: number,
		divisor: number
	) {
		const startDay = 1;
		const endDay = 7;
		const startTime = this.timeSettings.dayStartTime;

		for (let day = startDay; day <= endDay; day++) {
			let time = new Time(startTime.hour, startTime.minutes);
			let remainder = totalMinutes;

			while (remainder > 0) {
				this.cells.push(
					new Cell(
						day,
						time
					)
				);

				if (remainder < divisor) {
					// Last cell making the remainder (decimal cell)
					time = time.getTimeWithAddedMinutes(remainder);
				} else {
					time = time.getTimeWithAddedMinutes(divisor);
				}

				remainder -= divisor;
			}
		}
	}
}
