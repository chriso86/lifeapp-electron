export class StringHelper {
	static generateUniqueId(): string {
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}

	static upperCamelCaseToSentenceCase(value: string) {
		const result = value.replace( /([A-Z])/g, " $1" );

		return result.charAt(0).toUpperCase() + result.slice(1);
	}
}
