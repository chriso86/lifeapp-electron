<template>
  <div class="app-dropdown-icon-input"
       :style="{flex: flex}">
    <label class="app-dropdown-icon-input__label">
      <span> {{label}}: </span>
    </label>

    <v-swatches
        v-model="$data.color"
        :swatches="options"
        show-fallback
        fallback-input-type="color"
        popover-x="left"
        v-on:input="updateValue"
    ></v-swatches>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import VSwatches from 'vue-swatches';

@Component({
  name: "DropdownColorInput",
  components: {
    VSwatches
  }
})
export default class DropdownColorInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() options: string[];
  @Prop() flex!: string;
  @Prop() flexOptions!: string;
  @Prop() value!: string;

  @Emit()
  updateValue(option: string) {
    if (option) {
      this.$data.color = option;
    }

    return option;
  }

  created() {
    if (this.value) {
      this.$data.color = this.value;
    }
  }

  data() {
    return {
      color: ''
    };
  }
}

</script>
