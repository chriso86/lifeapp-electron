export class DropdownOption<T> {
	id: string;
	description: string;
	data: T;

	constructor(id: string, description: string, data: T) {
		this.id = id;
		this.description = description;
		this.data = data;
	}
}
