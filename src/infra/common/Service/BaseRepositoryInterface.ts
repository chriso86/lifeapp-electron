import {ReadInterface} from '@/infra/common/ReadInterface';
import {WriteInterface} from '@/infra/common/WriteInterface';

export interface BaseRepositoryInterface<T> extends ReadInterface<T>, WriteInterface<T> {
}
