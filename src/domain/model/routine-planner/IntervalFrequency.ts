import {DropdownOption} from '@/domain/model/common/DropdownOption';

export class IntervalFrequency {
	public static dropdownOptions = [
		{id: '1', description: 'Weekly', data: 1},
		{id: '2', description: 'BiWeekly', data: 2},
		{id: '3', description: 'Monthly', data: 3}
	];

	public static get defaultIntervalFrequency(): DropdownOption<number> {
		return this.dropdownOptions[0];
	}
}
