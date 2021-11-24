import {ApexOptions} from 'apexcharts';

export interface DistributionSummary {
  label: string;
  icon: string;
  hours: number;
  minutes: number;
  color: string;
  enabled: boolean;
}

export interface FunnelChartData {
  labels: string[];
  subLabels: string[];
  values: Array;
  colors: Array;
  direction: string;
  gradientDirection: string;
  height: number;
  width: number;
}


export interface PolarAreaChartData {
  series: number[];
  options: ApexOptions;
}

export interface RadarChartData {
  routineName: string;
  series: {name: string; data: number[]}[];
  options: ApexOptions;
}
