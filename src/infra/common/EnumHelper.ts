export class EnumHelper {
	static toArray<T>(enumObject: {[key: string]: T}): T[] {
		return Object.keys(enumObject)
			.map((key: string) => {
				return enumObject[key]
			});
	}

	static getKeyValue<T>(enumObject: {[key: string]: T}, value: T): string {
		let matchingKey = '';

		Object.keys(enumObject).forEach(key => {
			if (enumObject[key] === value) {
				matchingKey = key;
			}
		});

		return matchingKey;
	}
}
