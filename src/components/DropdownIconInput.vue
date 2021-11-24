<template>
  <div class="app-dropdown-icon-input"
       :style="{flex: flex}">
    <label class="app-dropdown-icon-input__label">
      <span> {{label}}: </span>
    </label>

    <div class="app-dropdown-icon-input__selection"
         v-on:click="toggleOptions">
      <i :class="selected && selected.data.path"></i>

      <i class="fa fa-caret-down"></i>
    </div>

    <div v-if="$data.isOpen"
         class="app-dropdown-icon-input__options"
         :style="{flex: flexOptions}"
         v-on-clickaway="toggleOptions">
      <div v-if="!options.length" class="app-dropdown-icon-input__no-options">
        No options found
      </div>

      <div v-for="option in options"
           :key="option.id"
           v-on:click="updateValue(option)"
           class="app-dropdown-icon-input__options__option">
        <i :class="option.data.path"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {DropdownOption} from '@/domain/model/common/DropdownOption';
import { directive as onClickaway } from 'vue-clickaway';
import {Icon} from '@/domain/model/common/Icon';

@Component({
  name: "DropdownIconInput",
  directives: {
    onClickaway: onClickaway
  }
})
export default class DropdownIconInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() options: DropdownOption<Icon>[];
  @Prop() flex!: string;
  @Prop() flexOptions!: string;
  @Prop() value!: DropdownOption<Icon>;

  @Emit()
  updateValue(option: DropdownOption<Icon>) {
    this.toggleOptions();

    this.$data.selected = option;

    return option;
  }

  created() {
    if (this.value) {
      this.$data.selected = this.value;
    }
  }

  data() {
    return {
      selected: '',
      isOpen: false
    }
  }

  toggleOptions() {
    this.$data.isOpen = !this.$data.isOpen;
  }
}

</script>
