import {inject} from 'inversify-props';
import RoutineRepositoryInterface from '@/infra/routine-planner/service/RoutineRepositoryInterface';
import ActivityCategoryRepositoryInterface from '@/infra/routine-planner/service/ActivityCategoryRepositoryInterface';
import ActivityRepositoryInterface from '@/infra/routine-planner/service/ActivityRepositoryInterface';
import IconRepositoryInterface from '@/infra/routine-planner/service/IconRepositoryInterface';
import SettingRepositoryInterface from '@/infra/routine-planner/service/SettingRepositoryInterface';
import TimeFrequencyRepositoryInterface from '@/infra/routine-planner/service/TimeFrequencyRepositoryInterface';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import {StringHelper} from '@/infra/common/StringHelper';
import {ArrayHelper} from '@/infra/common/ArrayHelper';
import {ActivityCategoryEnum} from '@/seeding/ActivityCategoryEnum';
import {EnumHelper} from '@/infra/common/EnumHelper';
import {ActivityEnum} from '@/seeding/ActivityEnum';
import {Activity} from '@/domain/model/routine-planner/Activity';
import {TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import {IconEnum} from '@/seeding/IconEnum';
import {Icon} from '@/domain/model/common/Icon';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import * as fs from 'fs';
import path from 'path';
import {remote} from 'electron';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {IntervalFrequency} from '@/domain/model/routine-planner/IntervalFrequency';
import {RoutineTimeSettings} from '@/domain/model/routine-planner/RoutineTimeSettings';
import {Time} from '@/domain/model/common/Time';
import {Week} from '@/domain/model/routine-planner/Week';
import {DropdownOption} from '@/domain/model/common/DropdownOption';

export class DatabaseSeeder {
	@inject('ActivityCategoryRepository')
	private _activityCategoriesRepository: ActivityCategoryRepositoryInterface;

	@inject('ActivityRepository')
	private _activityRepository: ActivityRepositoryInterface;

	@inject('IconRepository')
	private _iconRepository: IconRepositoryInterface;

	@inject('RoutineRepository')
	private _routineRepository: RoutineRepositoryInterface;

	@inject('SettingRepository')
	private _settingRepository: SettingRepositoryInterface;

	@inject('TimeFrequencyRepository')
	private _timeFrequencyRepository: TimeFrequencyRepositoryInterface;

	async Seed() {
		const seedJson = {
			forceReseed: false,
			seedData: true
		};
		const basePath = `${remote.app.getPath('userData')}`;
		const filePath = path.resolve(basePath, 'seeding.json');

		try {
			fs.readFileSync(filePath);
		}
		catch (err) {
			fs.writeFileSync(filePath, JSON.stringify(seedJson));
		}

		const file = fs.readFileSync(filePath);
		const AppConfig = JSON.parse(file.toString());

		if (AppConfig.forceReseed) {
			await this.CleanAllDatabases();
		}

		if (AppConfig.seedData || AppConfig.forceReseed) {
			await this.SeedDependencyLists();
			await this.SeedActivities();
			await this.SeedRoutines();

			AppConfig.seedData = false;

			fs.writeFileSync(path.resolve(basePath, 'seeding.json'), JSON.stringify(AppConfig));
		}
	}

	private async SeedDependencyLists() {
		await this.SeedIcons();
		await this.SeedActivityCategories();
		await this.SeedTimeFrequencies();
	}

	private async SeedActivityCategories() {
		console.log('seeding Activity Categories');

		type ActivityCategoryToLoad = { name: string; icon: IconEnum; iconBackground: string; iconColor: string };

		const existingIcons = await this._iconRepository.getAllIcons().toPromise();
		const existingActivityCategories = await this._activityCategoriesRepository.getAllCategories().toPromise();
		const activityCategoriesToSeed: ActivityCategoryToLoad[] = [
			{
				name: ActivityCategoryEnum.Chores,
				icon: IconEnum.Broom,
				iconBackground: '#2E89B8',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Exercise,
				icon: IconEnum.Running,
				iconBackground: '#209E87',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.FamilyActivities,
				icon: IconEnum.BabyCarriage,
				iconBackground: '#F58700',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Learning,
				icon: IconEnum.OpenBook,
				iconBackground: '#858463',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Recreation,
				icon: IconEnum.Tv,
				iconBackground: '#189E37',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Shopping,
				icon: IconEnum.ShoppingBag,
				iconBackground: '#9E08A8',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Work,
				icon: IconEnum.Book,
				iconBackground: '#A83911',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Health,
				icon: IconEnum.Medicine,
				iconBackground: '#00BF63',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Hygiene,
				icon: IconEnum.Shower,
				iconBackground: '#46B1EB',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.BasicNeeds,
				icon: IconEnum.Utensils,
				iconBackground: '#EB992F',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Cosmetics,
				icon: IconEnum.Scissors,
				iconBackground: '#E55EEB',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Hobby,
				icon: IconEnum.Hiking,
				iconBackground: '#8946EB',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityCategoryEnum.Social,
				icon: IconEnum.Friends,
				iconBackground: '#A81926',
				iconColor: '#FFFFFF'
			}
		];

		activityCategoriesToSeed.sort((a: ActivityCategoryToLoad, b: ActivityCategoryToLoad) => ArrayHelper.naturalSort(a.name, b.name));

		for (const activityCategory of activityCategoriesToSeed) {
			const existingCategory = existingActivityCategories.find((a: ActivityCategory) => a.description === activityCategory.name);
			const existingIcon = existingIcons.find((i: Icon) => i.path === activityCategory.icon);

			if (!existingCategory && existingIcon) {
				await this._activityCategoriesRepository.create(
					new ActivityCategory(
						activityCategory.name,
						true,
						1,
						existingIcon,
						activityCategory.iconBackground,
						activityCategory.iconColor
					)
				);
			}
		}

		console.log('Done seeding Activity Categories');
	}

	private async SeedIcons() {
		console.log('seeding Icons');

		const existingIcons = await this._iconRepository.getAllIcons().toPromise();
		const iconsToSeed = EnumHelper.toArray<string>(IconEnum);

		iconsToSeed.sort(ArrayHelper.naturalSort);

		for (const icon of iconsToSeed) {
			const existingIcon = existingIcons.find((i: Icon) => i.path === icon);

			if (!existingIcon) {
				const iconEnumKey = EnumHelper.getKeyValue<string>(IconEnum, icon);

				await this._iconRepository.create(
					new Icon(
						StringHelper.upperCamelCaseToSentenceCase(iconEnumKey),
						icon
					)
				);
			}
		}

		console.log('Done seeding Icons');
	}

	private async SeedTimeFrequencies() {
		console.log('seeding Time Frequencies');

		type TimeFrequencyToLoad = { interval: number; intervalUom: TimeDurationEnum };

		const existingTimeFrequencies = await this._timeFrequencyRepository.getAllTimeFrequencies().toPromise();
		const timeFrequenciesToSeed: TimeFrequencyToLoad[] = [
			{interval: 15, intervalUom: TimeDurationEnum.Minutes},
			{interval: 30, intervalUom: TimeDurationEnum.Minutes},
			{interval: 1, intervalUom: TimeDurationEnum.Hours}
		];

		for (const timeFrequency of timeFrequenciesToSeed) {
			const existingTimeFrequency = existingTimeFrequencies
				.find((i: TimeFrequency) => i.interval === timeFrequency.interval && i.intervalUom === timeFrequency.intervalUom);

			if (!existingTimeFrequency) {
				await this._timeFrequencyRepository.create(
					new TimeFrequency(
						timeFrequency.interval,
						timeFrequency.intervalUom
					)
				);
			}
		}

		console.log('Done seeding Time Frequencies');
	}

	private async SeedActivities() {
		console.log('Seeding Activities');

		type ActivityToLoad = { name: string; categories: string[]; icon: IconEnum; iconBackground: string; iconColor: string };

		const activityCategories = await this._activityCategoriesRepository.getAllCategories().toPromise();
		const icons = await this._iconRepository.getAllIcons().toPromise();
		const activities: ActivityToLoad[] = [
			{
				name: ActivityEnum.Shower,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Hygiene],
				icon: IconEnum.Shower,
				iconBackground: '#46B1EB',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Bath,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Hygiene],
				icon: IconEnum.Bath,
				iconBackground: '#378BB8',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Sleep,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Health],
				icon: IconEnum.Bed,
				iconBackground: '#20516B',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Eat,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Health],
				icon: IconEnum.Utensils,
				iconBackground: '#EB992F',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.ApplyMakeUp,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Cosmetics],
				icon: IconEnum.PaintBrush,
				iconBackground: '#B84D25',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.StyleHair,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Cosmetics],
				icon: IconEnum.Scissors,
				iconBackground: '#209E87',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.OralHealth,
				categories: [ActivityCategoryEnum.BasicNeeds, ActivityCategoryEnum.Health],
				icon: IconEnum.Grimace,
				iconBackground: '#E55EEB',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Cooking,
				categories: [ActivityCategoryEnum.Chores],
				icon: IconEnum.Hamburger,
				iconBackground: '#B8B32E',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.CleanHouse,
				categories: [ActivityCategoryEnum.Chores],
				icon: IconEnum.Broom,
				iconBackground: '#858463',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Laundry,
				categories: [ActivityCategoryEnum.Chores],
				icon: IconEnum.Socks,
				iconBackground: '#2E89B8',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.WashDishes,
				categories: [ActivityCategoryEnum.Chores],
				icon: IconEnum.Tumbler,
				iconBackground: '#11A88A',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.PolishSurfaces,
				categories: [ActivityCategoryEnum.Chores],
				icon: IconEnum.SprayCan,
				iconBackground: '#8946EB',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Running,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Running,
				iconBackground: '#F53141',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Swimming,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Swimmer,
				iconBackground: '#097BB5',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Cycling,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Biking,
				iconBackground: '#A83911',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Golf,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.GolfBall,
				iconBackground: '#189E37',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Sailing,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Ship,
				iconBackground: '#055C4A',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Gym,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Gym,
				iconBackground: '',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Hiking,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Hiking,
				iconBackground: '#A85E00',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.FamilyWalk,
				categories: [ActivityCategoryEnum.Exercise, ActivityCategoryEnum.Health, ActivityCategoryEnum.Social, ActivityCategoryEnum.FamilyActivities],
				icon: IconEnum.BabyCarriage,
				iconBackground: '#52A811',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.BoardGames,
				categories: [ActivityCategoryEnum.Health, ActivityCategoryEnum.Social, ActivityCategoryEnum.FamilyActivities, ActivityCategoryEnum.Recreation],
				icon: IconEnum.PuzzlePiece,
				iconBackground: '#F58700',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.WatchFamilyMovie,
				categories: [ActivityCategoryEnum.Health, ActivityCategoryEnum.Social, ActivityCategoryEnum.FamilyActivities, ActivityCategoryEnum.Recreation],
				icon: IconEnum.Film,
				iconBackground: '#42391B',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Study,
				categories: [ActivityCategoryEnum.Learning, ActivityCategoryEnum.Work],
				icon: IconEnum.Book,
				iconBackground: '#000C5C',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Homework,
				categories: [ActivityCategoryEnum.Learning, ActivityCategoryEnum.Work],
				icon: IconEnum.OpenBook,
				iconBackground: '#A83208',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Test,
				categories: [ActivityCategoryEnum.Learning, ActivityCategoryEnum.Work],
				icon: IconEnum.Checklist,
				iconBackground: '#F5BA00',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Project,
				categories: [ActivityCategoryEnum.Learning, ActivityCategoryEnum.Work],
				icon: IconEnum.Vial,
				iconBackground: '#9E08A8',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.StudyGroup,
				categories: [ActivityCategoryEnum.Learning, ActivityCategoryEnum.Work, ActivityCategoryEnum.Social],
				icon: IconEnum.UsersCog,
				iconBackground: '#7218F5',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.WatchTv,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Tv,
				iconBackground: '#A88100',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.WatchMovie,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Video,
				iconBackground: '#5C4909',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.PlayGames,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Gamepad,
				iconBackground: '#11A88A',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Socialize,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Social, ActivityCategoryEnum.Health],
				icon: IconEnum.Friends,
				iconBackground: '#A81926',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.PlayGamesWithFriends,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Hobby, ActivityCategoryEnum.Social],
				icon: IconEnum.WiredNetwork,
				iconBackground: '#213742',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Braai,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Social],
				icon: IconEnum.HotDog,
				iconBackground: '#5C3200',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Barbecue,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Social],
				icon: IconEnum.HotDog,
				iconBackground: '#5C3200',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.Party,
				categories: [ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Social],
				icon: IconEnum.DrinksToast,
				iconBackground: '#00BF63',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.GroceryShopping,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.Work],
				icon: IconEnum.ShoppingBasket,
				iconBackground: '#BF0A74',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.PharmaceuticalShopping,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.Work],
				icon: IconEnum.Medicine,
				iconBackground: '#BF540A',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.HobbyShopping,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Hobby],
				icon: IconEnum.ShoppingBag,
				iconBackground: '#BF8613',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.ClothingShopping,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.Recreation, ActivityCategoryEnum.Cosmetics],
				icon: IconEnum.Clothing,
				iconBackground: '#8813BF',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.SuppliesShopping,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.Work, ActivityCategoryEnum.Hobby],
				icon: IconEnum.Stationary,
				iconBackground: '#730B48',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.InventoryManagement,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.Work, ActivityCategoryEnum.BasicNeeds],
				icon: IconEnum.Inventory,
				iconBackground: '#C94793',
				iconColor: '#FFFFFF'
			},
			{
				name: ActivityEnum.ShoppingForKids,
				categories: [ActivityCategoryEnum.Shopping, ActivityCategoryEnum.FamilyActivities, ActivityCategoryEnum.Social],
				icon: IconEnum.Toy,
				iconBackground: '#109E33',
				iconColor: '#FFFFFF'
			},
		];

		activities.sort((a: ActivityToLoad, b: ActivityToLoad) => ArrayHelper.naturalSort(a.name, b.name));

		for (const activity of activities) {
			const existingActivity = await this._activityRepository.findByName(activity.name).toPromise();
			const categories = activity.categories.map(
				(category: string) => {
					const matchingCategory = activityCategories
						.find((a: ActivityCategory) => a.description === category);

					if (!matchingCategory) {
						throw new Error('Activity seeding Error: No matching category found for category name: ' + category);
					}

					return matchingCategory;
				});
			const icon = icons.find((i: Icon) => i.path === activity.icon) || new Icon('sleep', 'fas fa-bed');

			if (!existingActivity) {
				await this._activityRepository.create(
					new Activity(
						activity.name,
						categories,
						icon,
						activity.iconBackground,
						activity.iconColor,
						1,
						TimeDurationEnum.Hours,
						true,
						true,
						true
					)
				);
			}
		}

		console.log('Done seeding Activities');
	}

	private async SeedRoutines() {
		console.log('seeding Routines');

		type RoutineToLoad = { name: string; frequency: DropdownOption<number>; startWeek: DropdownOption<number> };

		const timeFrequencies = await this._timeFrequencyRepository.getAllTimeFrequencies().toPromise();
		const routines: RoutineToLoad[] = [
			{
				name: 'My Weekly Routine',
				frequency: IntervalFrequency.defaultIntervalFrequency,
				startWeek: Week.defaultWeek
			}
		];

		routines.sort((a: RoutineToLoad, b: RoutineToLoad) => ArrayHelper.naturalSort(a.name, b.name));

		for (const routine of routines) {
			const existingRoutine = await this._routineRepository.findByName(routine.name).toPromise();
			const timeFrequency = timeFrequencies.find(tf => tf.interval === 1 && tf.intervalUom === TimeDurationEnum.Hours);

			const routineTimeSetting = new RoutineTimeSettings(
				timeFrequency || new TimeFrequency(1, TimeDurationEnum.Hours),
				new Time(6, 0),
				new Time(21, 0)
			);

			if (!existingRoutine) {
				await this._routineRepository.create(
					new Routine(
						routine.name,
						routine.frequency,
						routine.startWeek,
						true,
						routineTimeSetting,
						[],
						true,
						false
					)
				);
			}
		}

		console.log('Done seeding Routines');
	}

	private async CleanAllDatabases() {
		console.log('Cleaning all Databases');

		await this._activityCategoriesRepository.clean();
		await this._activityRepository.clean();
		await this._iconRepository.clean();
		await this._routineRepository.clean();
		await this._settingRepository.clean();
		await this._timeFrequencyRepository.clean();

		console.log('Cleaned all Databases');
	}
}
