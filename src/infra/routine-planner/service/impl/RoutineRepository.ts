import {Database} from '@/infra/Database';
import {Inject, injectable} from 'inversify-props';
import RoutineRepositoryInterface from '@/infra/routine-planner/service/RoutineRepositoryInterface';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {BaseRepository} from '@/infra/common/Service/Impl/BaseRepository';
import {RoutineMapper} from '@/domain/service/routine-planner/RoutineMapper';
import TimeFrequencyRepositoryInterface from '@/infra/routine-planner/service/TimeFrequencyRepositoryInterface';
import {Observable, Subscriber} from 'rxjs';

@injectable()
export class RoutineRepository extends BaseRepository<Routine> implements RoutineRepositoryInterface {
	@Inject('TimeFrequencyRepository')
	private timeFrequencyRepository: TimeFrequencyRepositoryInterface;

	constructor() {
		super(Database.$routineDb);
	}

	getAllRoutines(): Observable<Routine[]> {
		return new Observable<Routine[]>((subscriber: Subscriber<Routine[]>) => {
			this.find({})
				.then((results: Routine[]) => {
					const constructed = RoutineMapper.constructRoutines(results);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}

	findByName(name: string): Observable<Routine | null> {
		return new Observable<Routine | null>((subscriber: Subscriber<Routine | null>) => {
			this.find({name})
				.then((results: Routine[]) => {
					if (!results || !results.length) {
						subscriber.next(null);
						subscriber.complete();

						return;
					}

					const constructed = RoutineMapper.constructRoutine(results[0]);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}

	async create(routine: Routine): Promise<Routine> {
		const newRoutine = await super.create(routine);

		return RoutineMapper.constructRoutine(newRoutine);
	}
}
