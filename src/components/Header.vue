<template>
  <div class="app-header">
    <span class="app-header__title">LifeApp</span>

    <div class="app-header__buttons">
      <button v-on:click="minimizeApp()">
        <i class="fas fa-window-minimize"></i>
      </button>
      <button v-on:click="maximizeApp()">
        <i class="fa fa-window-maximize"></i>
      </button>
      <button v-on:click="closeApp()">
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";
import {remote} from 'electron';

@Component({
  name: "Header"
})
export default class Tab extends Vue {
  minimizeApp() {
    const window = remote.getCurrentWindow();

    window.minimize();
  }

  maximizeApp() {
    const window = remote.getCurrentWindow();

    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }

  closeApp() {
    const window = remote.getCurrentWindow();

    window.close();
  }
}

</script>
