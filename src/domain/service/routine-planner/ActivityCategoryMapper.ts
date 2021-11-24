import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {IconMapper} from '@/domain/service/routine-planner/IconMapper';

export class ActivityCategoryMapper {
	static constructActivityCategories(activityCategories: ActivityCategory[]): ActivityCategory[] {
		return activityCategories.map((activityCategory: ActivityCategory) => this.constructActivityCategory(activityCategory));
	}

	static constructActivityCategory(activityCategory: ActivityCategory): ActivityCategory {
		const mappedActivityCategory = new ActivityCategory(
			activityCategory.description,
			activityCategory.trackCategoryInReportingModule,
			activityCategory.desiredTimeDesignation,
			IconMapper.constructIcon(activityCategory.icon),
			activityCategory.backgroundColor,
			activityCategory.iconColor
		);

		if (activityCategory._id) {
			mappedActivityCategory.setId(activityCategory._id);
		}

		return mappedActivityCategory;
	}
}
