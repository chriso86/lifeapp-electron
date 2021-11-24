import {DistributionSummary, PolarAreaChartData, RadarChartData} from '@/store/statistics/types';

export class StatisticStore {
  general?: {
    routines: RadarChartData[];
  };

  activeRoutine?: {
    activityDistributionSummary: DistributionSummary[];
    activityCategoryDistributionSummary: DistributionSummary[];
    polarAreaActivityDistribution: PolarAreaChartData;
    polarAreaActivityCategoryDistribution: PolarAreaChartData;
  };
}
