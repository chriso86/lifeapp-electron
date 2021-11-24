import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import {Observable} from 'rxjs';

export default interface TimeFrequencyRepositoryInterface extends BaseRepositoryInterface<TimeFrequency> {
	getAllTimeFrequencies(): Observable<TimeFrequency[]>;
}
