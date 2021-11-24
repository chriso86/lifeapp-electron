<template>
  <div class="app-number-input" :style="{flex: flex}">
    <label class="app-number-input__label">
      <span> {{label}}: </span>

      <input type="number"
             min="1"
             max="1000"
             class="app-number-input__input"
             :name="name"
             v-bind:value="value"
             v-on:input="updateValue($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

@Component({
  name: "NumberInput"
})
export default class NumberInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() flex!: number;
  @Prop() value!: string;

  @Emit()
  updateValue(value: string) {
    return value;
  }
}

</script>
