<template>
  <div class="app-chips-input"
       :style="{flex: flex}">
    <label class="app-dropdown-input__label">
      <span v-bind:class="{'hidden-text': !label}"> {{label}}: </span>
    </label>

    <div class="flex row wrap align-items-start">
      <div v-for="selectedItem of $data.selectedItems"
           :key="selectedItem.id"
           class="app-chips-input__chip flex-inline align-items-center justify-content-center">
        <i :class="selectedItem.data.icon.path"></i>

        <span> {{selectedItem.description}} </span>

        <i class="fas fa-times app-chips-input__chip-clear" v-on:click="updateValue(selectedItem, 'remove')"></i>
      </div>

      <div class="app-chips-input__add"
           v-on:click="toggleOptions">
        <i class="fas fa-plus"></i>

        <div v-if="$data.isOpen" class="flex row">
          <div class="flex column app-chips-input__options"
               :style="{flex: flexOptions}"
               v-on-clickaway="toggleOptions">
            <div v-if="!options.length" class="app-chips-input__no-options">
              No options found
            </div>

            <div v-for="option in options"
                 :key="option.id"
                 v-on:click="updateValue(option, 'add')"
                 class="app-chips-input__options__option">
              <span>{{option.description}}</span>
            </div>
          </div>
        </div>
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
  name: "ChipsInput",
  directives: {
    onClickaway: onClickaway
  }
})
export default class ChipsInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() options: DropdownOption<any>[];
  @Prop() flex!: string;
  @Prop() flexOptions!: string;
  @Prop() value!: DropdownOption<any>[];

  @Emit()
  updateValue(item: DropdownOption<any>, action: 'add' | 'remove') {
    if (action === 'add') {
      this.addItemToSelectedItems(item);
    } else {
      this.removeItemFromSelectedItems(item);
    }

    return this.$data.selectedItems;
  }

  data() {
    return {
      isOpen: false,
      placeholder: {id: '', description: 'Select an option'},
      selectedItems: []
    }
  }

  toggleOptions() {
    this.$data.isOpen = !this.$data.isOpen;
  }

  removeItemFromSelectedItems(item: DropdownOption<any>) {
    const index = this.$data.selectedItems.indexOf(item);

    if (index > -1) {
      this.$data.selectedItems.splice(index, 1);
    }
  }

  private addItemToSelectedItems(item: DropdownOption<any>) {
    if (this.$data.selectedItems.indexOf(item) < 0) {
      this.$data.selectedItems.push(item);
    }
  }
}

</script>
