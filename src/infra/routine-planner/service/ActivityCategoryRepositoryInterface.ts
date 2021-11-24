import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {Observable} from 'rxjs';

export default interface ActivityCategoryRepositoryInterface extends BaseRepositoryInterface<ActivityCategory> {
	getAllCategories(): Observable<ActivityCategory[]>;
	findByDescription(description: string): Observable<ActivityCategory | null>;
}
