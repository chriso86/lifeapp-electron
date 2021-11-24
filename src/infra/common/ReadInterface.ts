export interface ReadInterface<T> {
	find(queryParams: object): Promise<T[]>;
	findOne(id: string): Promise<T>;
}
