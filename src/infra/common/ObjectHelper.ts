export class ObjectHelper {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isNotNullOrUndefined(value: any): boolean {
		return typeof value !== 'undefined' && value !== null;
	}
}
