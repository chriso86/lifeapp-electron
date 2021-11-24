import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {Observable} from 'rxjs';

export default interface RoutineRepositoryInterface extends BaseRepositoryInterface<Routine> {
	getAllRoutines(): Observable<Routine[]>;
	findByName(name: string): Observable<Routine | null>;
}
