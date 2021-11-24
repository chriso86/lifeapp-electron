<template>
  <div class="flex column justify-content-end">
    <button class="app-button app-button__destroy icon-only flex row align-items-center justify-content-center"
            :name="name"
            v-on:click="triggerClick()">

      <i v-if="icon" :class="icon"></i>

    </button>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  name: "DestroyIconButton"
})
export default class DestroyIconButton extends Vue {
  @Prop() name!: string;
  @Prop() icon!: boolean;
  @Prop() disabled!: boolean;

  created() {
    this.$data.enabled = !this.disabled;
  }

  data() {
    return {
      enabled: true
    }
  }

  triggerClick() {
    // Don't trigger if button is disabled
    if (this.disabled) {
      return;
    }

    this.$emit('click');
  }
}

</script>
