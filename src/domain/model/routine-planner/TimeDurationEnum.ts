import {DropdownOption} from '@/domain/model/common/DropdownOption';

export enum TimeDurationEnum {
	Hours = 1,
	Minutes = 2
}

export class TimeDuration {
	static dropdownOptions = [
		new DropdownOption(
			TimeDurationEnum.Hours.toString(),
			'Hours',
			TimeDurationEnum.Hours
		),
		new DropdownOption(
			TimeDurationEnum.Minutes.toString(),
			'Minutes',
			TimeDurationEnum.Minutes
		)
	]
}
