import {BaseRepository} from '@/infra/common/Service/Impl/BaseRepository';
import {Database} from '@/infra/Database';
import {injectable} from 'inversify-props';
import ActivityCategoryRepositoryInterface from '@/infra/routine-planner/service/ActivityCategoryRepositoryInterface';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {ActivityCategoryMapper} from '@/domain/service/routine-planner/ActivityCategoryMapper';
import {Observable, Subscriber} from 'rxjs';

@injectable()
export class ActivityCategoryRepository extends BaseRepository<ActivityCategory> implements ActivityCategoryRepositoryInterface {
	constructor() {
		super(Database.$activityCategoryDb);
	}

	getAllCategories(): Observable<ActivityCategory[]> {
		return new Observable<ActivityCategory[]>((subscriber: Subscriber<ActivityCategory[]>) => {
			this.find({})
				.then((results: ActivityCategory[]) => {
					const constructed = ActivityCategoryMapper.constructActivityCategories(results);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}

	findByDescription(description: string): Observable<ActivityCategory | null> {
		return new Observable<ActivityCategory | null>((subscriber: Subscriber<ActivityCategory | null>) => {
			this.find({description})
				.then((results: ActivityCategory[]) => {
					if (!results || !results.length) {
						subscriber.next(null);
						subscriber.complete();

						return;
					}

					const constructed = ActivityCategoryMapper.constructActivityCategory(results[0]);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}
}
