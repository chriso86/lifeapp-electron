<template>
  <div class="app-chart__pie">
    <vue-funnel-graph :width="chartData.width"
                      :height="chartData.height"
                      :labels="chartData.labels"
                      :values="chartData.values"
                      :colors="chartData.colors"
                      :sub-labels="chartData.subLabels"
                      :direction="chartData.direction"
                      :gradient-direction="chartData.gradientDirection"
                      :animated="true"
                      :display-percentage="true"
    ></vue-funnel-graph>
  </div>
</template>

<script lang="ts">

import {Prop, Vue} from 'vue-property-decorator';
import { VueFunnelGraph } from 'vue-funnel-graph-js';
import Component from 'vue-class-component';

@Component({
  name: 'FunnelChart',
  components: {
    VueFunnelGraph
  }
})
export default class FunnelChart extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() chartData: any;
}

</script>
