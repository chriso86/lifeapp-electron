import {DataDocument} from '@/domain/model/common/DataDocument';
import {PathTypeEnum} from '@/store/global/PathTypeEnum';
import {DropdownOption} from '@/domain/model/common/DropdownOption';

export class Icon extends DataDocument {
	/**
	 * The name of the icon
	 */
	public name: string;

	/**
	 * The path to the icon image
	 * This can be a CSS rule, a file path, or a URL
	 */
	public path: string;

	/**
	 * Used to identify the type of path - corresponds to the 'path' property above
	 * Defaults to PathTypeEnum.Icon
	 */
	public pathType: PathTypeEnum = PathTypeEnum.Icon;

	constructor(
		name: string,
		path: string
	) {
		super();

		this.name = name || '';
		this.path = path || '';
	}

	mapToDropdownOption(): DropdownOption<Icon> {
		return new DropdownOption<Icon>(
			this._id,
			this.name,
			this
		);
	}
}
