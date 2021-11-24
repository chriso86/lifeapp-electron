import Datastore from 'nedb';
import {BaseRepositoryInterface} from '@/infra/common/Service/BaseRepositoryInterface';

export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
	public readonly _collection: Datastore;

	protected constructor(collection: Datastore) {
		this._collection = collection;

		this._collection.ensureIndex({fieldName: '_id', unique: true});
	}

	/**
	 * Create a new document in the collection DB
	 * @param item - This is the generic Document type as specified by the repository collection DB
	 * @returns T - The document with the updated document ID
	 */
	create(item: T): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this._collection.insert(item,
				(error: Error | null, document: T) => {
					if (error) {
						reject(error);
					}

					resolve(document);
				});
		});
	}

	/**
	 * Create a new document in the collection DB
	 * @param id - The string ID of the document to be updated
	 * @param item - This is the generic Document type as specified by the repository collection DB
	 * @returns boolean - Whether the update was successful or not
	 */
	update(id: string, item: T): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this._collection.update({_id: id}, item, {upsert: true},
				(error: Error | null, numberReplaced: number, success: boolean) => {
					if (error) {
						reject(error);
					}

					resolve(success);
				});
		});
	}

	/**
	 * Create a new document in the collection DB
	 * @param id - The string ID of the document to be deleted
	 * @returns number - The number of documents deleted
	 */
	delete(id: string): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this._collection.remove({_id: id}, {},
				(error: Error | null, numberDeleted: number) => {
					if (error) {
						reject(error);
					}

					resolve(numberDeleted);
				});
		});
	}

	/**
	 * Create a new document in the collection DB
	 * @param queryParams - This is a query object of parameters to be satisfied in the query
	 * @returns T[] - The retrieved documents of type T
	 */
	find(queryParams: object): Promise<T[]> {
		return new Promise<T[]>((resolve, reject) => {
			this._collection.find(queryParams,
				(error: Error | null, documents: T[]) => {
					if (error) {
						reject(error);
					}

					resolve(documents);
				});
		});
	}

	/**
	 * Retrieves a new document from the collection DB
	 * @param id - The string ID of the document to be retrieved
	 * @returns T - The retrieved document of type T
	 */
	findOne(id: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this._collection.find({_id: id},
				(error: Error | null, document: T) => {
					if (error) {
						reject(error);
					}

					resolve(document);
				});
		});
	}

	/**
	 * Create a new document in the collection DB
	 * @param id - The string ID of the document to be deleted
	 * @returns number - The number of documents deleted
	 */
	clean(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this._collection.remove({}, {multi: true},
				(error: Error | null, numberDeleted: number) => {
					if (error) {
						reject(error);
					}

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					console.log('Items deleted: ' + numberDeleted + ' in ' + (this._collection as any).filename);

					this._collection.persistence.compactDatafile();

					resolve(numberDeleted);
				});
		});
	}
}
