<template>
  <div class="app-routine__board">
    <!-- Headings -->
    <div class="flex row">
      <!-- Top left cell (Empty) -->
      <div class="app-routine__board__cell app-routine__board__cell__heading app-routine__board__cell__heading--wide flex-inline align-items-center"></div>

      <!-- Headings -->
      <div v-for="heading of $data.headings"
           :key="heading.key"
           class="app-routine__board__cell app-routine__board__cell__heading flex-inline align-items-center justify-content-center">
        {{heading.heading}}
      </div>
    </div>

    <!-- Monday -->
    <RoutineBoardRow row-heading="Monday"
                     :routine="routine"
                     :cells="$data.monday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>

    <!-- Tuesday -->
    <RoutineBoardRow row-heading="Tuesday"
                     :routine="routine"
                     :cells="$data.tuesday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>

    <!-- Wednesday -->
    <RoutineBoardRow row-heading="Wednesday"
                     :routine="routine"
                     :cells="$data.wednesday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>

    <!-- Thursday -->
    <RoutineBoardRow row-heading="Thursday"
                     :routine="routine"
                     :cells="$data.thursday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>

    <!-- Friday -->
    <RoutineBoardRow row-heading="Friday"
                     :routine="routine"
                     :cells="$data.friday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>

    <!-- Saturday -->
    <RoutineBoardRow row-heading="Saturday"
                     :routine="routine"
                     :cells="$data.saturday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>

    <!-- Sunday -->
    <RoutineBoardRow row-heading="Sunday"
                     :routine="routine"
                     :cells="$data.sunday"
                     v-on:assign="$emit('assign', $event)"
                     v-on:clear="$emit('clear', $event)">
    </RoutineBoardRow>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {Cell} from '@/domain/model/routine-planner/Cell';
import {DayOfWeekEnum} from '@/domain/enum/DayOfWeekEnum';
import RoutineBoardRow from '@/components/RoutineBoardRow.vue';
import {StringHelper} from '@/infra/common/StringHelper';

@Component({
  name: "RoutineBoard",
  components: {
    RoutineBoardRow
  }
})
export default class RoutineBoard extends Vue {
  @Prop() routine!: Routine;
  @Prop() cells!: Cell[];

  @Watch('cells', {immediate: true, deep: true})
  rebuildBoard() {
    this.calculateBoardCells();
  }

  data() {
    return {
      headings: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  }

  created() {
    this.calculateBoardCells();
  }

  private calculateBoardCells() {
    const cells = this.cells;

    this.$data.headings = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Monday)
        .map((cell: Cell) => {
          const time = cell.time;

          return {
            key: StringHelper.generateUniqueId(),
            heading: time.getTimeAsLabel()
          }
        });
    this.$data.monday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Monday);
    this.$data.tuesday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Tuesday);
    this.$data.wednesday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Wednesday);
    this.$data.thursday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Thursday);
    this.$data.friday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Friday);
    this.$data.saturday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Saturday);
    this.$data.sunday = cells
        .filter((cell: Cell) => cell.day === DayOfWeekEnum.Sunday);
  }
}

</script>
