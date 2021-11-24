<template>
  <div class="app-dropdown-input"
       :style="{flex: flex}">
    <label class="app-dropdown-input__label">
      <span v-bind:class="{'hidden-text': !label}"> {{label}}: </span>
    </label>

    <div class="app-dropdown-input__selection"
         v-on:click="toggleOptions">
      {{value ? value.description : $data.placeholder.description}}

      <i class="fa fa-caret-down"></i>
    </div>

    <div v-if="$data.isOpen"
         class="app-dropdown-input__options"
         :style="{flex: flexOptions}"
         v-on-clickaway="toggleOptions">
      <div v-if="!options.length" class="app-dropdown-input__no-options">
        No options found
      </div>

      <div v-for="option in options"
           :key="option.id"
           v-on:click="updateValue(option)"
           class="app-dropdown-input__options__option">
        <span>{{option.description}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {DropdownOption} from '@/domain/model/common/DropdownOption';
import { directive as onClickaway } from 'vue-clickaway';

@Component({
  name: "DropdownInput",
  directives: {
    onClickaway: onClickaway
  }
})
export default class DropdownInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() options: DropdownOption<any>[];
  @Prop() flex!: string;
  @Prop() flexOptions!: string;
  @Prop() value!: DropdownOption<any>;

  @Emit()
  updateValue(option: DropdownOption<any>) {
    this.toggleOptions();

    return option;
  }

  data() {
    return {
      isOpen: false,
      placeholder: {id: '', description: 'Select an option'}
    }
  }

  toggleOptions() {
    this.$data.isOpen = !this.$data.isOpen;
  }
}

</script>
