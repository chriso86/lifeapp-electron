import {Activity} from '@/domain/model/routine-planner/Activity';
import {ActivityCategoryMapper} from '@/domain/service/routine-planner/ActivityCategoryMapper';
import {IconMapper} from '@/domain/service/routine-planner/IconMapper';

export class ActivityMapper {
	static constructActivities(activities: Activity[]) {
		return activities.map((activity: Activity) => this.constructActivity(activity));
	}

	static constructActivity(activity: Activity) {
		const mappedActivity = new Activity(
			activity.name,
			ActivityCategoryMapper.constructActivityCategories(activity.categories),
			IconMapper.constructIcon(activity.icon),
			activity.backgroundColor,
			activity.iconColor,
			activity.typicalDuration,
			activity.typicalDurationUom,
			activity.notifyByDefault,
			activity.notify,
			activity.draggable
		);

		if (activity._id) {
			mappedActivity.setId(activity._id);
		}

		return mappedActivity;
	}
}
