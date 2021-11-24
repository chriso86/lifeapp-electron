<template>
  <div class="app-text-input" :style="{flex: flex}">
    <label class="app-text-input__label">
      <span> {{label}}: </span>

      <input type="text"
             ref="textInput"
             class="app-text-input__input"
             :name="name"
             v-bind:value="value"
             v-on:input="updateValue($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">

import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

@Component({
  name: "TextInput"
})
export default class TextInput extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() flex!: number;
  @Prop() value!: string;
  @Prop() focus!: boolean;

  @Emit()
  updateValue(value: string) {
    return value;
  }

  mounted() {
    if (this.focus) {
      this.setFocus();
    }
  }

  setFocus() {
    const textInput: HTMLInputElement = this.$refs.textInput as HTMLInputElement;

    if (textInput) {
      this.$nextTick(() => {
        textInput.focus();
      });
    }
  }
}

</script>
