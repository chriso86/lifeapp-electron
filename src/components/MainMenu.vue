<template>
  <div ref="mainMenu" class="app-main-menu">
    <div v-for="item in menuItems"
         :key="item.label"
         class="app-main-menu__item"
         v-bind:class="{'app-main-menu__item--active': item.active}">
      <div class="app-main-menu__item__title"
           v-on:click="navigateTo(item.route)">
        <i :class="item.icon" aria-hidden="true"></i>

        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import 'reflect-metadata'
import {Component, Vue} from "vue-property-decorator";
import {RoutineStore, State} from '@/store';

type MenuItem = {icon: string; label: string; route: string; active: boolean};

@Component({
  name: 'MainMenu'
})
export default class MainMenu extends Vue {
  @State('routineModule')
  public routineModule!: RoutineStore;

  menuItems: MenuItem[] = [
    {icon: 'fas fa-calendar', label: 'Planner', route: 'planner', active: true},
    {icon: 'fas fa-chart-pie', label: 'Statistics', route: 'statistics', active: false},
    {icon: 'fas fa-coffee', label: 'Coffee', route: 'coffee', active: false}
    // {icon: 'fas fa-cog', label: 'Settings', route: 'settings', active: false}
  ];

  navigateTo(route: string) {
    this.menuItems.forEach(menuItem => {
      menuItem.active = menuItem.route === route;
    })

    this.$router.push({path: route});
  }
}

</script>
