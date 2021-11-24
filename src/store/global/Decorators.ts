import {createDecorator} from 'vue-class-component';
import Vue, {ComponentOptions} from 'vue';
import {ActionMethod, Computed, mapActions, mapState} from 'vuex';
import {Dictionary} from 'vue-router/types/router';

type MapActionFnType = (map: Dictionary<string>) => Dictionary<ActionMethod>;
type MapComputedFnType = (map: Dictionary<string>) => Dictionary<Computed>;

type MapFnType = MapActionFnType | MapComputedFnType;

function createDecoratorFactory(optionsKey: 'computed' | 'methods', mapFn: MapFnType) {
	if (!optionsKey) {
		throw new Error('Missing the optionsKey argument. This parameter is required.');
	}

	return (storeKey: string) => {
		return createDecorator((componentOptions: ComponentOptions<Vue>, key: string) => {
			const mapObject = { [key]: storeKey };

			if (typeof(componentOptions[optionsKey]) ===  'undefined') {
				componentOptions[optionsKey] = {};
			}

			const option = componentOptions[optionsKey] || {};

			if (typeof(option[key]) !== 'undefined') {
				return;
			}

			option[key] = mapFn(mapObject)[key];
		})
	}
}

export const State = createDecoratorFactory('computed', mapState);
export const Action = createDecoratorFactory('methods', mapActions);
