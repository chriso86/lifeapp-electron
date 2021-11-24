import {DistributionSummary, PolarAreaChartData, RadarChartData} from '@/store/statistics/types';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {Cell} from '@/domain/model/routine-planner/Cell';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import {DayOfWeekEnum} from '@/domain/enum/DayOfWeekEnum';

export class RoutineStatisticFactory {
  // Summary Items for Routine Activities / Activity Categories
  static buildSummaryForActivities(routine: Routine): DistributionSummary[] {
    const timeFrequencyMeasurement = RoutineStatisticFactory.getTimeMeasurement(routine);
    const activityDictionary: { [key: string]: { icon: string; count: number; color: string } } = {};

    if (!timeFrequencyMeasurement) {
      throw new Error('No valid Time Frequency defined in Time Settings.');
    }

    routine.cells.forEach((cell: Cell) => {
      const activity = cell.activity;

      if (activity) {
        const activityName = activityDictionary[activity.name];
        const activityIcon = activity.icon.path;
        const activityColor = activity.backgroundColor;

        if (activityName) {
          activityDictionary[activity.name].count += 1;
        } else {
          activityDictionary[activity.name] = {
            icon: activityIcon,
            count: 1,
            color: activityColor
          };
        }
      }
    });

    return this.mapDictionaryToDistributionSummary(activityDictionary, timeFrequencyMeasurement);
  }

  static buildSummaryForActivityCategories(routine: Routine): DistributionSummary[] {
    const timeFrequencyMeasurement = RoutineStatisticFactory.getTimeMeasurement(routine);
    const activityDictionary: { [key: string]: { icon: string; count: number; color: string } } = {};

    if (!timeFrequencyMeasurement) {
      throw new Error('No valid Time Frequency defined in Time Settings.');
    }

    routine.cells.forEach((cell: Cell) => {
      const activity = cell.activity;

      if (activity) {
        const activityCategories = activity.categories;

        activityCategories.forEach((activityCategory: ActivityCategory) => {
          const activityCategoryName = activityDictionary[activityCategory.description];
          const activityCategoryIcon = activityCategory.icon.path;
          const activityCategoryColor = activityCategory.backgroundColor;

          if (activityCategoryName) {
            activityDictionary[activityCategory.description].count += 1;
          } else {
            activityDictionary[activityCategory.description] = {
              icon: activityCategoryIcon,
              count: 1,
              color: activityCategoryColor
            };
          }
        });
      }
    });

    return this.mapDictionaryToDistributionSummary(activityDictionary, timeFrequencyMeasurement);
  }

  // Polar Area Routine Activities / Activity Categories
  static buildPolarAreaForActivities(routine: Routine): PolarAreaChartData {
    const summary = RoutineStatisticFactory.buildSummaryForActivities(routine);

    return RoutineStatisticFactory.mapSummaryToPolarAreaChartData(summary);
  }

  static buildPolarAreaForActivityCategories(routine: Routine): PolarAreaChartData {
    const summary = RoutineStatisticFactory.buildSummaryForActivityCategories(routine);

    return RoutineStatisticFactory.mapSummaryToPolarAreaChartData(summary);
  }

  // Radar Routine Activities / Activity Categories
  static buildRadarForActivitiesPerDay(routine: Routine): RadarChartData {
    const timeFrequencyMeasurement = RoutineStatisticFactory.getTimeMeasurement(routine);
    const cells: Cell[] = routine.cells
      .filter(c => !!c.activity);
    const activitiesDictionary: { [key: string]: string } = {}; // Value is color

    cells.forEach((cell: Cell) => {
      const activity = cell.activity;

      if (activity && typeof activitiesDictionary[activity.name] === 'undefined') {
        activitiesDictionary[activity.name] = activity.backgroundColor;
      }
    });
    const output: RadarChartData = {
      routineName: routine.name,
      series: [],
      options: {
        colors: [],
        xaxis: {
          categories: []
        }
      }
    };

    const monday = cells
      .filter(c => c.day === DayOfWeekEnum.Monday)
      .map(c => c.activity);
    const tuesday = cells
      .filter(c => c.day === DayOfWeekEnum.Tuesday)
      .map(c => c.activity);
    const wednesday = cells
      .filter(c => c.day === DayOfWeekEnum.Wednesday)
      .map(c => c.activity);
    const thursday = cells
      .filter(c => c.day === DayOfWeekEnum.Thursday)
      .map(c => c.activity);
    const friday = cells
      .filter(c => c.day === DayOfWeekEnum.Friday)
      .map(c => c.activity);
    const saturday = cells
      .filter(c => c.day === DayOfWeekEnum.Saturday)
      .map(c => c.activity);
    const sunday = cells
      .filter(c => c.day === DayOfWeekEnum.Sunday)
      .map(c => c.activity);

    for (const activitiesDictionaryKey in activitiesDictionary) {
      output.series.push({
        name: activitiesDictionaryKey,
        data: [
          (monday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement,
          (tuesday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement,
          (wednesday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement,
          (thursday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement,
          (friday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement,
          (saturday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement,
          (sunday.filter(a => a?.name === activitiesDictionaryKey).length) * timeFrequencyMeasurement
        ]
      });

      if (output.options.colors) {
        output.options.colors.push(activitiesDictionary[activitiesDictionaryKey]);
      }

      if (output.options.xaxis && output.options.xaxis.categories) {
        output.options.xaxis.categories = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ];
      }
    }

    return output;
  }


  // Private Methods
  private static getTimeMeasurement(routine: Routine) {
    const timeIntervalUom = routine.timeSettings.timeFrequency.data.intervalUom;
    const timeInterval = routine.timeSettings.timeFrequency.data.interval || 0;
    const uomHasMultiplier = timeIntervalUom === TimeDurationEnum.Hours;

    return uomHasMultiplier
      ? timeInterval * 60
      : timeInterval;
  }

  private static mapDictionaryToDistributionSummary(
    activityDictionary: { [key: string]: { icon: string; count: number; color: string } },
    timeFrequencyMeasurement: number
  ) {
    const output: DistributionSummary[] = [];

    for (const activityDictionaryKey in activityDictionary) {
      const totalInMinutes = activityDictionary[activityDictionaryKey].count * timeFrequencyMeasurement;
      const totalNoOfHours = totalInMinutes / 60;
      const remainingMinutes = totalInMinutes > 59 ? totalInMinutes % 60 : totalInMinutes;

      output.push({
        label: activityDictionaryKey,
        icon: activityDictionary[activityDictionaryKey].icon,
        hours: totalInMinutes > 59 ? Math.floor(totalNoOfHours) : 0,
        minutes: remainingMinutes > 0 ? remainingMinutes : 0,
        color: activityDictionary[activityDictionaryKey].color,
        enabled: true
      });
    }

    return output;
  }

  private static mapSummaryToPolarAreaChartData(summary: DistributionSummary[]): PolarAreaChartData {
    return {
      series: summary.map(ds => ((ds.hours * 60) + ds.minutes) / 60),
      options: {
        labels: summary.map(ds => ds.label),
        colors: summary.map(ds => ds.color)
      }
    };
  }
}
