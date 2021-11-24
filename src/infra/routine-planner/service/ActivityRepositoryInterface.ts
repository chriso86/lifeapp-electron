import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {Observable} from 'rxjs';

export default interface ActivityRepositoryInterface extends BaseRepositoryInterface<Activity> {
	getAllActivities(): Observable<Activity[]>;
	findByName(name: string): Observable<Activity | null>;
}
