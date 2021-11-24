import Vue from 'vue';
import App from './App.vue';
import router from './router';
import buildDependencyContainer from './AppContainer';
import {store} from '@/store/global/Store';
import {DatabaseSeeder} from '@/seeding/DatabaseSeeder';
import {Database} from '@/infra/Database';
import {remote} from 'electron';

class AppBootstrap {
	constructor() {
		this.loadDependencyContainer();

		// First register the Databases
		Database.registerDatabases();

		const seeder = new DatabaseSeeder();

		seeder.Seed()
			.then(() => {
				this.loadVueApp();

        window.addEventListener('notify',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event: any) => {
            this.showNotification(event.detail.title, event.detail.message);
          }, false);
			});
	}

	private loadDependencyContainer(): void {
		buildDependencyContainer();
	}

	private loadVueApp(): void {
		Vue.config.productionTip = false;

		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app');
	}

  private showNotification (title: string, body: string) {
    const notification = {
      title: title,
      body: body
    };

    new remote.Notification(notification).show();
  }
}

// eslint-disable-next-line no-new
new AppBootstrap();
