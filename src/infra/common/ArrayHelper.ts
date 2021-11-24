export class ArrayHelper {
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	static naturalSort: (a, b) => number = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'}).compare;

	static getRandomItemFromArray<T>(arr: T[]): T {
		return arr[Math.floor(Math.random() * arr.length)];
	}
}
