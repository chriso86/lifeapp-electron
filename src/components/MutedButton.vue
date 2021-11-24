<template>
  <div class="flex column justify-content-end">
    <button class="app-button app-button__muted margin-right flex row align-items-center justify-content-center"
            :name="name"
            v-on:click="triggerClick()">

      <i v-if="icon" :class="icon"></i>

      <span> {{label}} </span>

    </button>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  name: "MutedButton"
})
export default class MutedButton extends Vue {
  @Prop() label!: string;
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
