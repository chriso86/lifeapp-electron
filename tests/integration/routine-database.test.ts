import {Routine} from '@/domain/model/routine-planner/Routine';
import {IntervalFrequency} from '@/domain/model/routine-planner/IntervalFrequency';
import {RoutineTimeSettings} from '@/domain/model/routine-planner/RoutineTimeSettings';
import {Week} from '@/domain/model/routine-planner/Week';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import {Time} from '@/domain/model/common/Time';

const uniqueTestName = 'TEST_ROUTINE_010';

describe('TEST ROUTINES DB', () => {
	test('ADD ROUTINE TO DB', async () => {
		const timeSettings = new RoutineTimeSettings(
			new TimeFrequency(1, TimeDurationEnum.Hours),
			new Time(6, 0),
			new Time(21, 0)
		);
		const testRoutine = new Routine(
			uniqueTestName,
			IntervalFrequency.defaultIntervalFrequency,
			Week.defaultWeek,
			true,
			timeSettings,
			[],
			true,
			false
		);
	});
});
