export class ComponentHelper {
	/* eslint-disable */
	static getRefRecursivelyFromParentComponentTree<T>(refName: string, component: any): T {
		const componentRef = component;

		if (componentRef) {
			return (componentRef.$refs[refName]
				|| this.getRefRecursivelyFromParentComponentTree(refName, componentRef.$parent)) as T;
		} else {
			throw new Error('Undefined Element reference');
		}
	}
}
