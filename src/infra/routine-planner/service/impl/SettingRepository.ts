import {BaseRepository} from '@/infra/common/Service/Impl/BaseRepository';
import {Database} from '@/infra/Database';
import {Setting} from '@/domain/model/common/Setting';
import SettingRepositoryInterface from '@/infra/routine-planner/service/SettingRepositoryInterface';
import {injectable} from 'inversify-props';
import {Observable, Subscriber} from 'rxjs';

@injectable()
export class SettingRepository extends BaseRepository<Setting> implements SettingRepositoryInterface {
	constructor() {
		super(Database.$settingsDb);
	}

	getAllSettings(): Observable<Setting[]> {
		return new Observable<Setting[]>((subscriber: Subscriber<Setting[]>) => {
			this.find({})
				.then((results: Setting[]) => {
					subscriber.next(results);
					subscriber.complete();
				});
		});
	}
}
