import {BaseRepository} from '@/infra/common/Service/Impl/BaseRepository';
import {Database} from '@/infra/Database';
import {injectable} from 'inversify-props';
import {Icon} from '@/domain/model/common/Icon';
import IconRepositoryInterface from '@/infra/routine-planner/service/IconRepositoryInterface';
import {IconMapper} from '@/domain/service/routine-planner/IconMapper';
import {Observable, Subscriber} from 'rxjs';

@injectable()
export class IconRepository extends BaseRepository<Icon> implements IconRepositoryInterface {
	constructor() {
		super(Database.$IconDb);
	}

	getAllIcons(): Observable<Icon[]> {
		return new Observable<Icon[]>((subscriber: Subscriber<Icon[]>) => {
			this.find({})
				.then((results: Icon[]) => {
					const constructed = IconMapper.constructIcons(results);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}

	getByPath(path: string): Observable<Icon | null> {
		return new Observable<Icon | null>((subscriber: Subscriber<Icon | null>) => {
			this.find({path})
				.then((results: Icon[]) => {
					if (!results || !results.length) {
						subscriber.next(null);
						subscriber.complete();

						return;
					}

					const constructed = IconMapper.constructIcon(results[0]);

					subscriber.next(constructed);
					subscriber.complete();
				});
		});
	}
}
