import {Activity} from '@/domain/model/routine-planner/Activity';
import {Time} from '@/domain/model/common/Time';
import {DayOfWeekEnum} from '@/domain/enum/DayOfWeekEnum';
import {StringHelper} from '@/infra/common/StringHelper';

export class Cell {
	day: DayOfWeekEnum;
	time: Time;
	activity: Activity | null;

	get cellKey(): string {
		return StringHelper.generateUniqueId();
	}

	constructor(
		day?: DayOfWeekEnum,
		time?: Time
	) {
		this.day = day || DayOfWeekEnum.Monday;
		this.time = time || new Time(6, 0);
	}

	assignActivity(activity: Activity) {
		if (!activity) {
			throw new Error('Could not assign an empty activity to this time slot.');
		}

		this.activity = activity;
	}

	clearActivity() {
		this.activity = null;
	}
}
