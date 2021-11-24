<template>
  <div v-if="value" class="app-time-input"
       :style="{flex: flex}">
    <label class="app-time-input__label">
      <span> {{label}}: </span>
    </label>

    <div class="app-time-input__selection" v-on:click="toggleOptions">
      <input type="text" readonly="readonly" v-model="value.time" />

      <i class="fa fa-clock"></i>
    </div>

    <div v-if="$data.isOpen"
         class="flex row align-items-center justify-content-center app-time-input__options"
         v-on-clickaway="toggleOptions">
      <div class="flex column align-items-center app-time-input__selector">
        <i class="fas fa-caret-up" v-on:click="value.addHours(1)"></i>

        <input type="text" v-model="value.zeroPaddedHour" />

        <i class="fas fa-caret-down" v-on:click="value.addHours(-1)"></i>
      </div>

      <span> : </span>

      <div class="flex column align-items-center app-time-input__selector">
        <i class="fas fa-caret-up" v-on:click="value.addMinutes(10)"></i>

        <input type="text" v-model="value.zeroPaddedMinutes" />

        <i class="fas fa-caret-down" v-on:click="value.addMinutes(-10)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import { directive as onClickaway } from 'vue-clickaway';
import {Time} from '@/domain/model/common/Time';

@Component({
  name: "TimeInput",
  directives: {
    onClickaway: onClickaway
  }
})
export default class TimeInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() flex!: number;
  @Prop() value!: Time;

  @Emit()
  updateValue(value: string): Time {
    const valueAsTime = new Time(6, 0);
    this.toggleOptions();

    valueAsTime.time = value;

    return valueAsTime;
  }

  data() {
    return {
      isOpen: false
    }
  }

  toggleOptions() {
    this.$data.isOpen = !this.$data.isOpen;
  }
}

</script>
