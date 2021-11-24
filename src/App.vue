<template>
  <div id="app">
    <div class="app-layout__container flex column">
      <Header></Header>

      <div class="flex row full-width">
        <MainMenu></MainMenu>

        <div class="flex column full-width overflow-scroll">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<style src='normalize.css/normalize.css'></style>
<style src="@fortawesome/fontawesome-free/css/all.css"></style>
<style src="vue-swatches/dist/vue-swatches.css"></style>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import Header from '@/components/Header.vue';
import MainMenu from '@/components/MainMenu.vue';
import moment from 'moment';
import {inject} from 'inversify-props';
import RoutineRepositoryInterface from '@/infra/routine-planner/service/RoutineRepositoryInterface';
import {Cell} from '@/domain/model/routine-planner/Cell';
import {Routine} from '@/domain/model/routine-planner/Routine';

@Component({
  components: {
    Header,
    MainMenu
  }
})
export default class App extends Vue {
  public dayToday: number;
  public interval: NodeJS.Timeout;

  @inject('RoutineRepository')
  private _routineRepository!: RoutineRepositoryInterface;

  created() {
    this.dayToday = moment().weekday();

    console.log(this.dayToday);

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this._routineRepository.getAllRoutines()
          .subscribe(routines => {
            let todaysCells: Cell[] = [];

            routines
                .filter((r: Routine) => r.isEnabled)
                .forEach((routine) => {
                  todaysCells = [
                    ...todaysCells,
                    ...routine.cells.filter(c => c.day === this.dayToday)
                  ];
                });

            const itemsToNotifyFor = [todaysCells[0]];

            if (itemsToNotifyFor && itemsToNotifyFor.length) {
              itemsToNotifyFor
                  .filter((c: Cell) => !!c)
                  .forEach((c: Cell) => {
                    const notification = {
                      title: `It's time for ${c.activity?.name}!`,
                      message: `It's ${c.time.getTimeAsLabel()}, and it's time to start with your activity ${c.activity?.name}!`,
                      sound: true
                    };

                    const event = new CustomEvent('notify', {
                      detail: {
                        title: notification.title,
                        message: notification.message
                      }
                    });

                    window.dispatchEvent(event);
                  });
            }
          });
    }, 30000);
  }
}

</script>
