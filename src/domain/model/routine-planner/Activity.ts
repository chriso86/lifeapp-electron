import {Icon} from '@/domain/model/common/Icon';
import {DataDocument} from '@/domain/model/common/DataDocument';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import {ColorHelper} from '@/infra/common/ColorHelper';
import themeColors from '../../../theme/variables/_colors.scss';
import {ArrayHelper} from '@/infra/common/ArrayHelper';

export class Activity extends DataDocument {
	/**
	 * The name of the Activity
	 */
	public name: string;

	/**
	 * The category specific to this activity - used for reporting and routine suggestions
	 */
	public categories!: ActivityCategory[];

	/**
	 * The Font Awesome icon to represent this activity
	 */
	public icon!: Icon;

	/**
	 * The HEX color of the tile background
	 */
	public backgroundColor: string;

	/**
	 * The HEX color of the Font Awesome icon
	 */
	public iconColor: string;

	/**
	 * The typical duration that this activity takes to complete
	 */
	public typicalDuration: number;

	/**
	 * The typical duration unit of measurement
	 */
	public typicalDurationUom: TimeDurationEnum;

	/**
	 * Set whether this activity should enable notifications by default
	 */
	public notifyByDefault: boolean;

	/**
	 * Set whether this activity should enable notifications actively
	 */
	public notify: boolean;

	/**
	 * Indicates whether this activity can be dragged to be assigned to a time slot on a routine board
	 */
	public draggable: boolean;


	constructor(
		name: string,
		categories: ActivityCategory[] = [],
		icon: Icon,
		backgroundColor: string,
		iconColor: string,
		typicalDuration: number,
		typicalDurationUom: TimeDurationEnum,
		notifyByDefault: boolean,
		notify: boolean,
		draggable: boolean
	) {
		super();

		const colors = ColorHelper.getColorScheme(themeColors.primaryColor, 'analogic', 'hard');

		this.name = name || '';
		this.categories = categories;
		this.backgroundColor = backgroundColor || ArrayHelper.getRandomItemFromArray(colors);
		this.iconColor = iconColor || ColorHelper.getFontColorForBackground(this.backgroundColor);
		this.icon = icon;
		this.typicalDuration = typicalDuration || 1;
		this.typicalDurationUom = typicalDurationUom || TimeDurationEnum.Hours;
		this.notifyByDefault = notifyByDefault;
		this.notify = notify;
		this.draggable = draggable;
	}

	clone() {
		const clone = new Activity(
			this.name,
			Object.assign(this.categories),
			this.icon,
			this.backgroundColor,
			this.iconColor,
			this.typicalDuration,
			this.typicalDurationUom,
			this.notifyByDefault,
			this.notify,
			this.draggable
		);

		clone.dateCreated = this.dateCreated;
		clone.setId(this._id);

		return clone;
	}
}
