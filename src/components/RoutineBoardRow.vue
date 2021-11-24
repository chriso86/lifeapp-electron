<template>
  <div class="flex row">
    <!-- Heading -->
    <div class="app-routine__board__cell app-routine__board__cell__heading app-routine__board__cell__heading--wide flex-inline align-items-center"> {{ rowHeading }} </div>

    <!-- Time Cells -->
    <div v-for="cell of cells"
         :key="cell.cellKey"
         class="app-routine__board__cell"
         v-on:click="processPrimaryClick(cell)"
         v-on:mousedown="processSecondaryClick($event, cell)">
      <ActivityIconTile v-if="cell.activity"
                          :activity="cell.activity">
      </ActivityIconTile>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {Cell} from '@/domain/model/routine-planner/Cell';
import ActivityIconTile from '@/components/ActivityIconTile.vue';
import {Action, ACTION_ASSIGN_ACTIVITY_TO_CELL, RoutineStore, State} from '@/store';
import {PAYLOAD_ASSIGN_ACTIVITY_TO_CELL} from '@/store/routine-planner/RoutinePayloadTypes';
import {Routine} from '@/domain/model/routine-planner/Routine';

@Component({
  name: 'RoutineBoardRow',
  components: {
    ActivityIconTile
  }
})
export default class RoutineBoardRow extends Vue {
  @Prop() rowHeading!: string;
  @Prop() routine!: Routine;
  @Prop() cells!: Cell[];

  @State('routineModule')
  public routineModule!: RoutineStore;

  @Action(ACTION_ASSIGN_ACTIVITY_TO_CELL)
  private assignActivityToCell!: (payload: PAYLOAD_ASSIGN_ACTIVITY_TO_CELL) => void;

  created() {
    this.cells.forEach((cell: Cell) => {
      if (cell.activity) {
        cell.activity.draggable = false;
      }
    });
  }

  processPrimaryClick(cell: Cell) {
    const activityIconButton = this.routineModule.focusedActivityIconButton as ActivityIconTile;

    if (!activityIconButton) {
      return;
    }

    const activity = activityIconButton.activity;

    // Clear instead of assign
    if (activity.name === 'clear') {
      this.$emit('clear', {cell});
    } else {
      this.$emit('assign', {cell, activity})
    }
  }

  processSecondaryClick(event: MouseEvent, cell: Cell) {
    const activityIconButton = this.routineModule.focusedActivityIconButton;
    const mouseButton = event && event.button;
    const SECONDARY_CLICK = 2;

    if (mouseButton !== SECONDARY_CLICK) {
      return;
    }

    if (!activityIconButton) {
      this.$emit('clear', {cell});
    }
  }
}

</script>
