export class Setting {
	key: string;
	value: number | string | boolean;

	constructor(
		key: string,
		value: number | string | boolean
	) {
		this.key = key;
		this.value = value;
	}
}
