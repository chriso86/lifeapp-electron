import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';

export class TimeFrequencyMapper {
	static constructTimeFrequencies(timeFrequencies: TimeFrequency[]): TimeFrequency[] {
		return timeFrequencies.map((timeFrequency: TimeFrequency) => this.constructTimeFrequency(timeFrequency));
	}

	static constructTimeFrequency(timeFrequency: TimeFrequency): TimeFrequency {
		const mappedTimeFrequency = new TimeFrequency(
			timeFrequency.interval,
			timeFrequency.intervalUom
		);

		if (timeFrequency._id) {
			mappedTimeFrequency.setId(timeFrequency._id);
		}

		return mappedTimeFrequency;
	}
}
