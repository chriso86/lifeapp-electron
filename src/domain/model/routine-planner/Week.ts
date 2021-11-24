import {DropdownOption} from '@/domain/model/common/DropdownOption';

export class Week {
	public static weeks = [1, 2, 3, 4];

	public static dropdownOptions = [
		{id: '1', description: 'First week', data: 1},
		{id: '2', description: 'Second week', data: 2},
		{id: '3', description: 'Third week', data: 3},
		{id: '4', description: 'Fourth week', data: 4}
	];

	public static get defaultWeek(): DropdownOption<number> {
		return this.dropdownOptions[0];
	}

	public static getDropdownOptionForWeekNo(weekNo: number) {
		const week = this.dropdownOptions.find(option => option.data === weekNo);

		if (!week) {
			throw new Error('Could not find a dropdown option matching week number: ' + weekNo);
		}

		return week;
	}
}
