<template>
  <div class="app-checkbox-input"
       :style="{flex: flex}">
    <div class="app-checkbox-input__selection"
         v-on:click="updateValue">
      <i v-if="value" class="fa fa-check"></i>
    </div>

    <label class="app-checkbox-input__label">
      <span> {{label}} </span>
    </label>
  </div>
</template>

<script lang="ts">

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import { directive as onClickaway } from 'vue-clickaway';

@Component({
  name: "CheckboxInput",
  directives: {
    onClickaway: onClickaway
  }
})
export default class CheckboxInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() flex!: number;
  @Prop() value!: boolean;

  @Emit()
  updateValue() {
    return !this.value;
  }
}

</script>
