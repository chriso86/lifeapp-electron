<template>
  <div v-if="activity"
       ref="activity"
       class="app-activity">
    <button class="app-button icon-only flex row align-items-center justify-content-center"
            :style="{background: activity.backgroundColor, color: activity.iconColor}"
            :name="activity.name"
            v-bind:class="{'app-activity--selected': $data.dragging}"
            v-on:mouseenter="toggleHover(true, $event)"
            v-on:mouseleave="toggleHover(false)"
            v-on:mousemove="moveActivityLabel"
            v-on:mousedown="processSecondaryClick"
            v-on:click="processPrimaryClick">

      <i v-if="activity.icon" :class="activity.icon.path"></i>
    </button>

    <div ref="contextOptions"
         class="app-activity__context-options"
         v-on-clickaway="toggleContextOptions">
      <div class="flex row option justify-content-center align-items-center"
        v-on:click="$emit('edit', activity)">
        <i class="fas fa-pen-fancy"></i>
        Edit
      </div>

      <hr>

      <div class="flex row option justify-content-center align-items-center warning--attention"
           v-on:click="$emit('delete', activity)">
        <i class="fas fa-trash"></i>
        Delete
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {RoutineStore, State} from '@/store';
import {directive as onClickaway} from 'vue-clickaway';

@Component({
  name: 'ActivityIconButton',
  directives: {
    onClickaway
  }
})
export default class ActivityIconButton extends Vue {
  @Prop() activity!: Activity;
  @Prop() disabled!: boolean;
  @Prop() isAssigned!: boolean;

  @State('routineModule')
  public routineModule!: RoutineStore;

  private element: HTMLElement;

  created() {
    if (this.activity) {
      this.$data.enabled = !this.disabled;
    }
  }

  mounted() {
    if (this.activity) {
      this.element = this.$refs.activity as HTMLElement;
      const boundBox = this.element.getBoundingClientRect();

      if (this.element) {
        this.$data.originalX = boundBox.x;
        this.$data.originalY = boundBox.y;
      }
    }
  }

  data() {
    return {
      enabled: true,
      dragging: false,
      label: null,
      originalX: 0,
      originalY: 0,
      x: 0,
      y: 0
    };
  }

  processPrimaryClick(event: MouseEvent) {
    const activity = this.activity;
    const focusedActivityIconButton = this.routineModule.focusedActivityIconButton;

    // Don't trigger if button is disabled
    if (this.isAssigned || this.disabled || focusedActivityIconButton?.activity.name === 'clear') {
      return;
    }

    if (focusedActivityIconButton
        && focusedActivityIconButton.activity
        && focusedActivityIconButton.activity._id !== this.activity._id) {

      focusedActivityIconButton.revertIconPosition();
    }

    if (activity.draggable) {
      if (!focusedActivityIconButton
          || (focusedActivityIconButton
              && focusedActivityIconButton.activity
              && focusedActivityIconButton.activity._id !== activity._id)) {
        // Assign activity
        this.selectIcon(event);
        this.$emit('select', {event, activityButtonIcon: this});

        return;
      }
    } else {
      this.$emit('click', {event, activity});

      this.toggleHover(false);
    }
  }

  toggleHover(toggled: boolean, event?: MouseEvent) {
    if (toggled && !this.$data.dragging) {
      this.clearLabels();

      this.$data.label = document.createElement('span');
      this.$data.label.classList.add('app-activity__tooltip');
      this.$data.label.innerHTML = this.activity.name;

      document.body.appendChild(this.$data.label);

      if (event) {
        this.moveActivityLabel(event);
      }
    } else {
      if (this.$data.label) {
        const labelElement = document.body.getElementsByClassName('app-activity__tooltip');

        if (labelElement.length) {
          document.body.removeChild(this.$data.label);

          this.$data.label = null;

          document.removeEventListener('mousemove', this.moveActivityLabel);
        }
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

    if (this.isAssigned) {
      requestAnimationFrame(() => {
        this.clearLabels();
      });
    } else {
      if (!this.$data.dragging) {
        this.toggleContextOptions(true, event);
      }
    }
  }

  toggleContextOptions(visible: boolean, event?: MouseEvent) {
    const contextOptions: HTMLElement = this.$refs.contextOptions as HTMLElement;

    this.clearOtherContextOptions();

    if (contextOptions) {
      if (visible && event) {
        const { x, y } = event;

        contextOptions.style.display = 'flex';
        contextOptions.style.left = `${x}px`;
        contextOptions.style.top = `${y}px`;
      } else {
        contextOptions.style.display = 'none';
      }
    }
  }

  clearOtherContextOptions() {
    const contextOptions: HTMLCollectionOf<Element> = document.getElementsByClassName('app-activity__context-options');

    for (const contextOption of contextOptions) {
      if ((contextOption as HTMLElement).style.display === 'flex') {
        (contextOption as HTMLElement).style.display = 'none';
      }
    }
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

  selectIcon(event: MouseEvent) {
    if (this.element) {
      this.element.classList.add('dragging');

      this.updateIconPosition(event);
    }

    this.$data.dragging = true;

    window.addEventListener('mousemove', this.updateIconPosition);
  }

  updateIconPosition(event: MouseEvent) {
    requestAnimationFrame(() => {
      const {x, y} = event;

      if (this.element) {
        this.element.style.left = `${x + 3}px`;
        this.element.style.top = `${y + 3}px`;
      }
    });
  }

  revertIconPosition() {
    if (this.element) {
      requestAnimationFrame(() => {
        this.element.classList.remove('dragging');

        // Reset position values or it won't appear in the correct place
        this.element.style.left = '';
        this.element.style.top = '';
      });
    }

    this.$data.dragging = false;
    this.$data.hovered = false;

    window.removeEventListener('mousemove', this.updateIconPosition);

    this.$emit('revert');
  }
}

</script>
