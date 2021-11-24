<template>
  <div class="app-chart__pie">
    <apexchart
        type="radar"
        :width="$data.chartWidth"
        :height="$data.chartHeight"
        :options="options"
        :series="series">
    </apexchart>
  </div>
</template>

<script lang="ts">

import {Prop, Vue} from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import Component from 'vue-class-component';
import {ApexOptions} from 'apexcharts';

@Component({
  name: 'RadarChart',
  components: {
    apexchart: VueApexCharts
  }
})
export default class RadarChart extends Vue {
  @Prop() series: {name: string; data: number[]}[];
  @Prop() options: ApexOptions;
  @Prop() width: string;
  @Prop() height: string;

  // private removedDataItems: {index: number; label: string; value: number; color}[] = [];

  data() {
    return {
      chartWidth: '800px',
      chartHeight: '600px'
    }
  }

  created() {
    if (this.width) {
      this.$data.chartWidth = this.width;
    }

    if (this.height) {
      this.$data.chartHeight = this.height;
    }

    if (!this.options.chart) {
      const showLegend = true;

      this.options.dataLabels = {
        enabled: true,
        formatter(val: number): string | number {
          if (val === 0) {
            return '';
          }

          return `${val / 60} hour(s)`;
        }
      }

      this.options.legend = {
        show: showLegend,
        position: 'right',
        onItemClick: {
          toggleDataSeries: showLegend
        }
      }
    }
  }

  // toggleDataItem(summaryItem: DistributionSummary) {
  //   if (summaryItem) {
  //     const index = this.options.labels?.indexOf(summaryItem.label);
  //
  //     if (typeof index === 'undefined') {
  //       throw new Error('Could not find data item in the chart.');
  //     }
  //
  //     const value = this.series[index];
  //
  //     // First back up the series data
  //     if (typeof index !== 'undefined' && index > -1) {
  //       this.removedDataItems.push({
  //         index,
  //         label: summaryItem.label,
  //         value,
  //         color: summaryItem.color,
  //       });
  //
  //       // Remove the item data
  //       this.series.splice(index, 1);
  //       this.options.labels?.splice(index, 1);
  //       this.options.colors?.splice(index, 1);
  //     } else {
  //       // Check if it's in the backed up data
  //       const backup = this.removedDataItems.find(ri => ri.label === summaryItem.label);
  //
  //       if (!backup) {
  //         throw new Error(`Failed to restore data for item "${summaryItem.label}"`);
  //       }
  //
  //       // Restore the data to the respective collections
  //       this.series.splice(backup.index, 0, backup.value);
  //       this.options.labels?.splice(backup.index, 0, backup.label);
  //       this.options.colors?.splice(backup.index, 0, backup.color);
  //     }
  //   }
  // }
}

</script>
