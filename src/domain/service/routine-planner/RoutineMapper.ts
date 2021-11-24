import {Routine} from '@/domain/model/routine-planner/Routine';
import {CellMapper} from '@/domain/service/routine-planner/CellMapper';
import {RoutineTimeSettings} from '@/domain/model/routine-planner/RoutineTimeSettings';
import {DropdownOption} from '@/domain/model/common/DropdownOption';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {TimeFrequencyMapper} from '@/domain/service/routine-planner/TimeFrequencyMapper';
import {Time} from '@/domain/model/common/Time';

export class RoutineMapper {
	static constructRoutines(routines: Routine[]): Routine[] {
		return routines.map((routine: Routine) => this.constructRoutine(routine));
	}

	static constructRoutine(routine: Routine) {
		const timeFrequency = routine.timeSettings.timeFrequency;
		const dayStartTime = routine.timeSettings.dayStartTime;
		const dayEndTime = routine.timeSettings.dayEndTime;
		const timeSettings = new RoutineTimeSettings(
			new DropdownOption<TimeFrequency>(
				timeFrequency ? timeFrequency.id : '',
				timeFrequency ? timeFrequency.description : '',
				TimeFrequencyMapper.constructTimeFrequency(timeFrequency.data)
			),
			new Time(dayStartTime.hour, dayStartTime.minutes),
			new Time(dayEndTime.hour, dayEndTime.minutes)
		);

		const intervalFrequency = routine.intervalFrequency;
		const startWeek = routine.startWeek;

		const mappedRoutine = new Routine(
			routine.name,
			new DropdownOption<number>(
				intervalFrequency.id,
				intervalFrequency.description,
				intervalFrequency.data
			),
			new DropdownOption<number>(
				startWeek.id,
				startWeek.description,
				startWeek.data
			),
			routine.isEnabled,
			timeSettings,
			CellMapper.constructCells(routine.cells),
			routine.pushNotificationsEnabled,
			routine.emailNotificationsEnabled
		);

		if (routine._id) {
			mappedRoutine.setId(routine._id);
		}

		return mappedRoutine;
	}
}
