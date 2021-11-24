import {StringHelper} from '@/infra/common/StringHelper';

export class DataDocument {
	public _id: string;
	public dateCreated: string;

	public get key() {
		return this._id || StringHelper.generateUniqueId();
	}

	constructor() {
		this.dateCreated = new Date().toISOString();
	}

	public hasId(): boolean {
		return !!this._id;
	}

	public setId(id: string) {
		if (!id) {
			throw new Error('Cannot set the ID of a document to an empty value.');
		}

		this._id = id;
	}
}
