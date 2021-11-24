import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';
import {Icon} from '@/domain/model/common/Icon';
import {Observable} from 'rxjs';

export default interface IconRepositoryInterface extends BaseRepositoryInterface<Icon> {
	getAllIcons(): Observable<Icon[]>;
	getByPath(path: string): Observable<Icon | null>;
}
