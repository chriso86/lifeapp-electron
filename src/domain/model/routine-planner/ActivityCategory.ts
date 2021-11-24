import {DataDocument} from '@/domain/model/common/DataDocument';
import {Icon} from '@/domain/model/common/Icon';
import {ColorHelper} from '@/infra/common/ColorHelper';
import themeColors from '../../../theme/variables/_colors.scss';
import {DropdownOption} from '@/domain/model/common/DropdownOption';
import {ArrayHelper} from '@/infra/common/ArrayHelper';

export class ActivityCategory extends DataDocument {
	/**
	 * The description of the category
	 */
	public description: string;

	/**
	 * Indicate whether this category should be tracked by the reporting module or not
	 */
	public trackCategoryInReportingModule: boolean;

	/**
	 * The user-defined desired upper limit that would be preferred to spent within this category
	 */
	public desiredTimeDesignation: number;

	/**
	 * The Font Awesome icon to represent this activity category
	 */
	public icon: Icon;

	/**
	 * The HEX color of the tile background
	 */
	public backgroundColor: string;

	/**
	 * The HEX color of the Font Awesome icon
	 */
	public iconColor: string;


	constructor(
		description: string,
		trackCategoryInReportingModule: boolean,
		desiredTimeDesignation: number,
		icon: Icon,
		backgroundColor: string,
		iconColor: string
	) {
		super();

		const colors = ColorHelper.getColorScheme(themeColors.primaryColor, 'analogic', 'hard');

		this.description = description || '';
		this.trackCategoryInReportingModule = trackCategoryInReportingModule || true;
		this.desiredTimeDesignation = desiredTimeDesignation || 1;
		this.icon = icon;
		this.iconColor = iconColor || ArrayHelper.getRandomItemFromArray(colors);
		this.backgroundColor = backgroundColor || ColorHelper.getFontColorForBackground(this.iconColor);
	}

	mapToDropdownOption(): DropdownOption<ActivityCategory> {
		return new DropdownOption<ActivityCategory>(
			this._id,
			this.description,
			this
		);
	}
}
