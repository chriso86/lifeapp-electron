import { container } from 'inversify-props'
import ActivityRepositoryInterface from '@/infra/routine-planner/service/ActivityRepositoryInterface';
import {ActivityRepository} from '@/infra/routine-planner/service/impl/ActivityRepository';
import RoutineRepositoryInterface from '@/infra/routine-planner/service/RoutineRepositoryInterface';
import {RoutineRepository} from '@/infra/routine-planner/service/impl/RoutineRepository';
import {ActivityCategoryRepository} from '@/infra/routine-planner/service/impl/ActivityCategoryRepository';
import ActivityCategoryRepositoryInterface from '@/infra/routine-planner/service/ActivityCategoryRepositoryInterface';
import IconRepositoryInterface from '@/infra/routine-planner/service/IconRepositoryInterface';
import {IconRepository} from '@/infra/routine-planner/service/impl/IconRepository';
import SettingRepositoryInterface from '@/infra/routine-planner/service/SettingRepositoryInterface';
import {SettingRepository} from '@/infra/routine-planner/service/impl/SettingRepository';
import TimeFrequencyRepositoryInterface from '@/infra/routine-planner/service/TimeFrequencyRepositoryInterface';
import {TimeFrequencyRepository} from '@/infra/routine-planner/service/impl/TimeFrequencyRepository';

export default function buildDependencyContainer (): void {
	container.addTransient<ActivityCategoryRepositoryInterface>(ActivityCategoryRepository, 'ActivityCategoryRepository');
	container.addTransient<ActivityRepositoryInterface>(ActivityRepository, 'ActivityRepository');
	container.addTransient<IconRepositoryInterface>(IconRepository, 'IconRepository');
	container.addTransient<RoutineRepositoryInterface>(RoutineRepository, 'RoutineRepository');
	container.addTransient<SettingRepositoryInterface>(SettingRepository, 'SettingRepository');
	container.addTransient<TimeFrequencyRepositoryInterface>(TimeFrequencyRepository, 'TimeFrequencyRepository');
}
