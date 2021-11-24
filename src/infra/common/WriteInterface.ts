export interface WriteInterface<T> {
	create(item: T): Promise<T>;
	update(id: string, item: T): Promise<boolean>;
	delete(id: string): Promise<number>;
	clean(): Promise<number>;
}
