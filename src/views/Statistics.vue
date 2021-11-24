<!-- HTML Template-->
<template>
  <div v-if="!routineModule.isLoading && routineModule.activeRoutine"
       v-bind:class="{'no-mouse-cursor': $data.activitySelected}"
       class="app-tab-view__tab">
    <!-- Routine Selection -->
    <div class="app-tab-view__tab__header">
      <DropdownInput v-model="$data.selectedRoutine"
                     label="Routine"
                     name="routineSelection"
                     flex="0 0 145px"
                     :options="$data.dropdownOptions.routines"
                     v-on:update-value="selectRoutine($event)">
      </DropdownInput>
    </div>

    <!-- Tab Content -->
    <div class="app-tab-view__tab__content">
      <RadarChart :series="$data.selectedRoutineData.series"
                  :options="$data.selectedRoutineData.options" width="1000px" height="800px">
      </RadarChart>
    </div>
  </div>
</template>


<!-- TypeScript Class -->
<script lang="ts">

import 'reflect-metadata';
import Vue from 'vue';
import Component from 'vue-class-component';
import {inject} from 'inversify-props';
import RoutineRepositoryInterface from '@/infra/routine-planner/service/RoutineRepositoryInterface';
import {
  Action, ACTION_SET_ROUTINES, RoutineStore,
  State
} from '@/store';
import {forkJoin} from 'rxjs';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {StatisticStore} from '@/store/statistics/StatisticStore';
import {ACTION_GENERATE_OVERVIEW} from '@/store/statistics/StatisticActionTypes';
import {PAYLOAD_GENERATE_OVERVIEW} from '@/store/statistics/StatisticPayloadTypes';
import RadarChart from '@/components/RadarChart.vue';
import {PAYLOAD_SET_ROUTINES} from '@/store/routine-planner/RoutinePayloadTypes';
import DropdownInput from '@/components/DropdownInput.vue';
import {DropdownOption} from '@/domain/model/common/DropdownOption';

@Component({
  name: 'Statistics',
  components: {
    RadarChart,
    DropdownInput
  }
})
export default class Statistics extends Vue {
  // Module State
  @State('routineModule')
  public routineModule!: RoutineStore;

  @State('statisticModule')
  public statisticModule!: StatisticStore;


  /* region Store Actions */
  // General
  @Action(ACTION_SET_ROUTINES)
  public setRoutines!: (payload: PAYLOAD_SET_ROUTINES) => void;

  @Action(ACTION_GENERATE_OVERVIEW)
  public generateOverview!: (payload: PAYLOAD_GENERATE_OVERVIEW) => void;
  /* endregion */

  /* region DI */
  // Repository Injection
  @inject('RoutineRepository')
  private _routineRepository!: RoutineRepositoryInterface;
  /* endregion */


  data() {
    return {
      dropdownOptions: {
        routines: []
      },
      selectedRoutine: {},
      selectedRoutineData: {
        series: [],
        options: {
          labels: []
        }
      }
    };
  }

  /* region Page Events */
  created() {
    const observables = [
      this._routineRepository.getAllRoutines()
    ];

    forkJoin(observables)
        .subscribe(([routines]) => {
          // Assign object lists on Store
          this.setRoutines({routines: routines as Routine[]});
          this.generateOverview({routines: routines as Routine[]});

          console.log(routines);
          console.log(this.$data.dropdownOptions);

          // Map local routines dropdown options list
          this.$data.dropdownOptions.routines = routines.map((routine: Routine) => {
            return new DropdownOption<Routine>(
                routine._id,
                routine.name,
                routine
            );
          });

          this.$data.selectedRoutine = this.$data.dropdownOptions.routines[0];
          this.$data.selectedRoutineData = this.statisticModule.general?.routines[0];
        });
  }
  /* endregion */


  /* region Public Methods */
  selectRoutine(routine: DropdownOption<Routine>) {
    const routines = this.statisticModule.general?.routines;

    if (!routines) {
      return;
    }

    const matchingRoutineData = routines.find(r => r.routineName === routine.description);

    if (matchingRoutineData) {
      this.$data.selectedRoutineData = matchingRoutineData;
      this.$data.selectedRoutine = routine;
    }
  }
  /* endregion */


  /* region Private Methods */

  /* endregion */
}

</script>

<style lang="scss">
@import "../theme/index";
</style>
