import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';
import {Setting} from '@/domain/model/common/Setting';
import {Observable} from 'rxjs';

export default interface SettingRepositoryInterface extends BaseRepositoryInterface<Setting> {
	getAllSettings(): Observable<Setting[]>;
}
