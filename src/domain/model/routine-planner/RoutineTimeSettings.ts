import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {Time} from '@/domain/model/common/Time';
import {DropdownOption} from '@/domain/model/common/DropdownOption';

export class RoutineTimeSettings {
	/**
	 * The measure of time used to determine the interval between activity slots in the routine Model
	 * This is a critical field
	 * !!! Resets the Routine activity slots when altered !!!
	 */
	public timeFrequency: DropdownOption<TimeFrequency>;

	/**
	 * The time of day that a user's routine starts
	 */
	public dayStartTime: Time;

	/**
	 * The time of day that a user's routine ends
	 */
	public dayEndTime: Time;


	constructor(
		timeFrequency: TimeFrequency | DropdownOption<TimeFrequency>,
		dayStartTime: Time = new Time(6, 0),
		dayEndTime: Time = new Time(21, 0)
	) {
		if (timeFrequency instanceof TimeFrequency) {
			this.timeFrequency = timeFrequency.mapToDropdownOption();
		} else {
			this.timeFrequency = timeFrequency;
		}

		this.dayStartTime = dayStartTime;
		this.dayEndTime = dayEndTime;
	}

	getNumberOfHours(): number {
		return this.getNumberOfMinutes() / 60;
	}

	getNumberOfMinutes(): number {
		const startTimeInMinutes = (this.dayStartTime.hour * 60) + this.dayStartTime.minutes;
		const endTimeDifference = this.dayEndTime.hour < this.dayStartTime.hour
      ? this.dayEndTime.hour + (24 - this.dayStartTime.hour)
      : this.dayEndTime.hour;
		const endTimeInMinutes = (endTimeDifference * 60) + this.dayEndTime.minutes;
		return endTimeInMinutes - startTimeInMinutes;
	}
}
