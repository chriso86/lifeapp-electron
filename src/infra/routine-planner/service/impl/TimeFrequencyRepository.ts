import {BaseRepository} from '@/infra/common/Service/Impl/BaseRepository';
import {Database} from '@/infra/Database';
import {injectable} from 'inversify-props';
import TimeFrequencyRepositoryInterface from '@/infra/routine-planner/service/TimeFrequencyRepositoryInterface';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {TimeFrequencyMapper} from '@/domain/service/routine-planner/TimeFrequencyMapper';
import {Observable, Subscriber} from 'rxjs';

@injectable()
export class TimeFrequencyRepository extends BaseRepository<TimeFrequency> implements TimeFrequencyRepositoryInterface {
	constructor() {
		super(Database.$timefrequencyDb);
	}

	getAllTimeFrequencies(): Observable<TimeFrequency[]> {
		return new Observable<TimeFrequency[]>((subscriber: Subscriber<TimeFrequency[]>) => {
			this.find({})
				.then((results: TimeFrequency[]) => {
					const constructed = TimeFrequencyMapper.constructTimeFrequencies(results);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}
}
