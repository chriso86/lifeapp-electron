<template>
  <div class="flex row align-items-center justify-content-center app-modal"
       v-bind:class="{'open': isOpen, 'close': closeModal && !isOpen}">
    <div ref="background" class="app-modal__background"></div>

    <div class="flex column app-modal__modal">
      <!-- Header -->
      <div class="flex row align-items-center app-modal__header">
        <div class="flex row auto">
          <i v-if="titleIconPath" :class="titleIconPath"></i>

          <span> {{title}} </span>
        </div>

        <div class="flex row grow-0 shrink-0 app-modal__header__close-btn">
          <i class="fas fa-times" v-on:click="close"></i>
        </div>
      </div>

      <!-- Content -->
      <div class="flex column app-modal__content" v-bind:style="{background: contentBackground || 'white'}">
        <slot name="content"></slot>
      </div>

      <hr>

      <!-- Footer -->
      <div class="flex row justify-content-end app-modal__footer">
        <NegativeButton label="Cancel"
                        name="cancelTimeSettings"
                        v-on:click="close">
        </NegativeButton>

        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import {RoutineStore, State} from '@/store';
import NegativeButton from '@/components/NegativeButton.vue';

@Component({
  name: 'Modal',
  components: {
    NegativeButton
  }
})
export default class Modal extends Vue {
  @Prop() title: string;
  @Prop() titleIconPath: string;
  @Prop() isOpen!: boolean;
  @Prop() flex!: string;
  @Prop() contentBackground!: string;

  @State('routineModule')
  public routineModule!: RoutineStore;

  data() {
    return {
      closeModal: false
    };
  }

  mounted() {
    const background: HTMLElement = this.$refs.background as HTMLElement;

    if (background) {
      background.addEventListener('click', this.close);
    }
  }

  close() {
    this.$data.closeModal = true;

    this.$emit('close');
  }
}

</script>
