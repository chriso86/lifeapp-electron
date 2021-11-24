import {ObjectHelper} from '@/infra/common/ObjectHelper';

export class Time {
	/**
	 * The hour value (24 hour by default)
	 * This will be localized by a builder
	 */
	public hour: number;

	/**
	 * The minute value (24 hour by default)
	 * This will be localized by a builder
	 */
	public minutes: number;

	public get time(): string {
		return this.getTimeAsLabel(true);
	}
	public set time(value: string) {
		const splitValue = value
			.replace(' AM', '')
			.replace(' PM', '')
			.split(':');

		if (splitValue && splitValue.length > 1) {
			this.zeroPaddedHour = splitValue[0];
			this.zeroPaddedMinutes = splitValue[1];
		}
	}

	public get zeroPaddedHour(): string {
		return this.zeroPadValue(this.hour);
	}
	public set zeroPaddedHour(hour: string) {
		const hourAsNumber = Number(hour);

		if (isNaN(hourAsNumber) || !isFinite(hourAsNumber) || hourAsNumber > 23 || hourAsNumber < 0) {
			return;
		}

		this.hour = hourAsNumber;
	}

	public get zeroPaddedMinutes(): string {
		return this.zeroPadValue(this.minutes);
	}
	public set zeroPaddedMinutes(minutes: string) {
		const minutesAsNumber = Number(minutes);

		if (isNaN(minutesAsNumber) || !isFinite(minutesAsNumber) || minutesAsNumber > 59 || minutesAsNumber < 0) {
			return;
		}

		this.minutes = minutesAsNumber;
	}

	constructor(
		hour: number,
		minutes: number
	) {
		this.hour = ObjectHelper.isNotNullOrUndefined(hour) ? hour : 6;
		this.minutes = ObjectHelper.isNotNullOrUndefined(minutes) ? minutes : 0;
	}

	public addHours(hour: number) {
		const calculatedHour = this.hour + hour;

		if (calculatedHour > 23) {
			this.hour = 0;
		} else if (calculatedHour < 0) {
			this.hour = 23;
		} else {
			this.hour = calculatedHour;
		}
	}

	public addMinutes(minutes: number) {
		const calculatedMinutes = this.minutes + minutes;

		if (calculatedMinutes > 59) {
			this.minutes = 0;
		} else if(calculatedMinutes < 0) {
			this.minutes = 50;
		} else {
			this.minutes = calculatedMinutes;
		}
	}

	public getTimeWithAddedMinutes(minutes: number): Time {
		const newMinutes = this.minutes + minutes;

		if (newMinutes > 59) {
			const minutesRemainder = newMinutes - 60;

			const newTime = new Time(this.hour + 1, minutesRemainder > 0 ? minutesRemainder : 0);

			if (newTime.hour > 23) {
				newTime.hour = 0;
			}

			return newTime;
		}

		return new Time(this.hour, newMinutes);
	}

	public getTimeAsLabel(withTimeMeasure?: boolean): string {
		return `${this.zeroPadValue(this.hour)}:${this.zeroPadValue(this.minutes)}${withTimeMeasure ? this.getTimeMeasure() : ''}`
	}

	private zeroPadValue(value: number): string {
		return value < 10 ? `0${value}` : `${value}`;
	}

	private getTimeMeasure() {
		const isAm = this.hour <= 12 && this.hour >= 0;

		return isAm ? ' AM' : ' PM';
	}
}
