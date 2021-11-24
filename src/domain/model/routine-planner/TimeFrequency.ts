import {DataDocument} from '@/domain/model/common/DataDocument';
import {TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import {DropdownOption} from '@/domain/model/common/DropdownOption';

export class TimeFrequency extends DataDocument {
	/**
	 * The measure of time used to determine the interval between activity slots in the routine Model
	 * This is a critical field
	 * !!! Resets the Routine activity slots when altered !!!
	 */
	public interval?: number;

	/**
	 * The unit of measurement to apply to the interval
	 * E.g. Minute(s) or Hour(s)
	 */
	public intervalUom?: TimeDurationEnum;

	public get description(): string {
		return `${this.interval} ${this.getTimeFrequencyMeasurement()}`;
	}

	constructor(
		interval?: number,
		intervalUom: TimeDurationEnum = TimeDurationEnum.Hours
	) {
		super();

		this.interval = interval || 1;
		this.intervalUom = intervalUom;
	}

	public getTimeFrequencyMeasurement() {
		switch (this.intervalUom) {
			case TimeDurationEnum.Hours:
				return 'Hours';
			case TimeDurationEnum.Minutes:
				return 'Minutes';
		}

		return '';
	}

	public mapToDropdownOption(): DropdownOption<TimeFrequency> {
		return new DropdownOption<TimeFrequency>(
			this._id,
			this.description,
			this
		);
	}
}
