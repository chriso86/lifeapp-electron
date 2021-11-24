<template>
  <div v-if="activity"
       ref="activity"
       class="app-activity">
    <button class="app-button icon-only flex row align-items-center justify-content-center"
            :style="{background: activity.backgroundColor, color: activity.iconColor}"
            :name="activity.name"
            v-on:mouseenter="toggleHover(true, $event)"
            v-on:mouseleave="toggleHover(false)"
            v-on:mousemove="moveActivityLabel"
            v-on:mousedown="processSecondaryClick">

      <i v-if="activity.icon" :class="activity.icon.path"></i>
    </button>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {RoutineStore, State} from '@/store';

@Component({
  name: 'ActivityIconTile'
})
export default class ActivityIconTile extends Vue {
  @Prop() activity!: Activity;

  @State('routineModule')
  public routineModule!: RoutineStore;

  data() {
    return {
      label: null
    };
  }

  toggleHover(toggled: boolean, event?: MouseEvent) {
    if (toggled) {
      this.clearLabels();

      this.$data.label = document.createElement('span');
      this.$data.label.classList.add('app-activity__tooltip');
      this.$data.label.innerHTML = this.activity.name;

      document.body.appendChild(this.$data.label);

      if (event) {
        this.moveActivityLabel(event);
      }
    } else if (this.$data.label) {
      const labelElement = document.body.getElementsByClassName('app-activity__tooltip');

      if (labelElement.length) {
        document.body.removeChild(this.$data.label);

        this.$data.label = null;

        document.removeEventListener('mousemove', this.moveActivityLabel);
      }
    }
  }

  moveActivityLabel(event: MouseEvent) {
    requestAnimationFrame(() => {
      if (!this.$data.label) {
        return;
      }

      const activeActivityIconButton = this.routineModule.focusedActivityIconButton;
      const {x, y} = event;

      this.$data.label.style.left = `${x + 3}px`;

      if (activeActivityIconButton) {
        this.$data.label.style.top = `${y - 45}px`;
      } else {
        this.$data.label.style.top = `${y + 3}px`;
      }
    });
  }

  processSecondaryClick(event: MouseEvent) {
    const { button } = event;
    const SECONDARY_CLICK = 2;

    if (button !== SECONDARY_CLICK) {
      return;
    }

    requestAnimationFrame(() => {
      this.clearLabels();
    });
  }

  clearLabels() {
    // First remove local label if apparent
    if (this.$data.label) {
      document.body.removeChild(this.$data.label);

      this.$data.label = null;
    }

    // Then remove any excess labels hanging around - TODO: Chris - Make sure this never happens and remove this code
    const existingLabels: HTMLCollectionOf<Element> = document.body.getElementsByClassName('app-activity__tooltip');

    // First clean any existing labels floating around
    if (existingLabels && existingLabels.length) {
      for (const existingLabel of existingLabels) {
        document.body.removeChild(existingLabel);
      }
    }
  }
}

</script>
