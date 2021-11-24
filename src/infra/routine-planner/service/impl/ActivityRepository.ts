import {BaseRepository} from '@/infra/common/Service/Impl/BaseRepository';
import {Database} from '@/infra/Database';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {injectable} from 'inversify-props';
import ActivityRepositoryInterface from '@/infra/routine-planner/service/ActivityRepositoryInterface';
import {ActivityMapper} from '@/domain/service/routine-planner/ActivityMapper';
import {Observable, Subscriber} from 'rxjs';

@injectable()
export class ActivityRepository extends BaseRepository<Activity> implements ActivityRepositoryInterface {
	constructor() {
		super(Database.$activityDb);
	}

	getAllActivities(): Observable<Activity[]> {
		return new Observable<Activity[]>((subscriber: Subscriber<Activity[]>) => {
			this.find({})
				.then((results: Activity[]) => {
					const constructed = ActivityMapper.constructActivities(results);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}

	findByName(name: string): Observable<Activity | null> {
		return new Observable<Activity | null>((subscriber: Subscriber<Activity | null>) => {
			this.find({name})
				.then((results: Activity[]) => {
					if (!results || !results.length) {
						subscriber.next(null);
						subscriber.complete();

						return;
					}

					const constructed = ActivityMapper.constructActivity(results[0]);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}

	async create(routine: Activity): Promise<Activity> {
		const newActivity = await super.create(routine);

		return ActivityMapper.constructActivity(newActivity);
	}
}
