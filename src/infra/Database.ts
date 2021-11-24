import Datastore from 'nedb';

export class Database {
	static $routineDb: Datastore;
	static $timefrequencyDb: Datastore;
	static $activityDb: Datastore;
	static $activityCategoryDb: Datastore;
	static $IconDb: Datastore;
	static $settingsDb: Datastore;

	static registerDatabases() {
		// Register routines collection
		this.$routineDb = new Datastore({
			autoload: true,
			filename: 'routine.db'
		});

		// Register time frequency collection
		this.$timefrequencyDb = new Datastore({
			autoload: true,
			filename: 'time_frequency.db'
		});

		// Register activities collection
		this.$activityDb = new Datastore({
			autoload: true,
			filename: 'activity.db'
		});

		// Register activity category collection
		this.$activityCategoryDb = new Datastore({
			autoload: true,
			filename: 'activity_category.db'
		});

		// Register activity icon collection
		this.$IconDb = new Datastore({
			autoload: true,
			filename: 'icon.db'
		});

		// Register activities collection
		this.$settingsDb = new Datastore({
			autoload: true,
			filename: 'setting.db'
		});
	}
}
