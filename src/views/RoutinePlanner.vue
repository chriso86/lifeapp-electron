<!-- HTML Template-->
<template>
  <div v-if="!routineModule.isLoading && routineModule.activeRoutine"
       v-bind:class="{'no-mouse-cursor': $data.activitySelected}"
       class="app-tab-view__tab">
    <!-- Tab Headings -->
    <div class="flex row">
      <div v-for="routine of routineModule.routines"
           :key="routine._id"
           class="app-tab-view__tab__header"
           v-bind:class="{'app-tab-view__tab__header--active': routine._id === routineModule.activeRoutine._id}"
           v-on:click="selectRoutine(routine)">
        {{ routine.name }}
      </div>
      <div class="app-tab-view__tab__header"
           v-on:click="newRoutine">
        <i class="fas fa-plus"></i>
      </div>
    </div>

    <!-- Tab Content -->
    <div v-if="routineModule.activeRoutine"
         class="app-tab-view__tab__content"
         v-on:mousedown="checkAndRevertActivityIconButton">

      <!-- Basic Information -->
      <div class="flex row">
        <!-- Name -->
        <TextInput v-model="routineModule.activeRoutine.name"
                   :focus="true"
                   ref="routineNameRef"
                   label="Name"
                   name="routineName"
                   flex="0 0 300px"
                   v-on:update-value="updateRoutineProps({name: $event})">
        </TextInput>

        <!-- Frequency -->
        <DropdownInput v-model="routineModule.activeRoutine.intervalFrequency"
                       label="Frequency"
                       name="routineFrequency"
                       flex="0 0 145px"
                       :options="$data.dropdownOptions.intervalFrequencies"
                       v-on:update-value="updateRoutineProps({intervalFrequency: $event})">
        </DropdownInput>

        <!-- Start Week -->
        <DropdownInput v-model="routineModule.activeRoutine.startWeek"
                       label="Starts"
                       name="routineStartWeek"
                       flex="0 0 185px"
                       :options="$data.dropdownOptions.weeks"
                       v-on:update-value="updateRoutineProps({startWeek: $event})">
        </DropdownInput>

        <!-- Is Enabled -->
        <CheckboxInput v-model="routineModule.activeRoutine.isEnabled"
                       label="Is Enabled"
                       name="routineIsEnabled"
                       v-on:update-value="updateRoutineProps({isEnabled: $event})">
        </CheckboxInput>

        <!-- Routine Buttons -->
        <div class="flex row grow-3 justify-content-end">
          <!-- Time Settings -->
          <MutedButton label="Time Settings"
                       icon="fas fa-clock"
                       name="timeSettingsBtn"
                       v-on:click="openTimeSettings">
          </MutedButton>

          <!-- Delete Routine -->
          <DestroyIconButton icon="fas fa-trash"
                             name="deleteRoutine"
                             v-on:click="toggleDeleteRoutinePrompt({isOpen: true})">
          </DestroyIconButton>
        </div>
      </div>

      <hr>

      <!-- Routine Workspace -->
      <div class="app-routine__workspace flex column">
        <h4> Activities: </h4>

        <!-- Activity Icons -->
        <div ref="activitiesPanel"
             class="app-routine__activities flex row wrap"
             v-bind:class="{'app-routine__activities--open': $data.activityPanelOpen}"
             v-on-clickaway="toggleActivityPanel">
          <!-- Clear Activity -->
          <ActivityIconButton :activity="$data.clearActivity"
                              v-on:select="selectActivity($event.activityButtonIcon)"
                              v-on:revert="revertActivity">
          </ActivityIconButton>

          <!-- New Activity -->
          <ActivityIconButton :activity="$data.newActivity"
                              v-on:click="createActivityAndOpenModal">
          </ActivityIconButton>

          <!-- Activity Icons -->
          <ActivityIconButton v-for="activity of routineModule.activities"
                              :key="activity._id"
                              :activity="activity"
                              v-on:select="selectActivity($event.activityButtonIcon)"
                              v-on:revert="revertActivity"
                              v-on:edit="editActivity"
                              v-on:delete="removeActivity">
          </ActivityIconButton>

          <button v-if="$data.shouldShowActivityPanelControl"
                  class="activity-panel-toggle"
                  v-on:click="$data.activityPanelOpen = !$data.activityPanelOpen">
            <i v-if="!$data.activityPanelOpen" class="fas fa-chevron-down"></i>
            <i v-if="$data.activityPanelOpen" class="fas fa-chevron-up"></i>
          </button>
        </div>

        <!-- Routine Board -->
        <div class="app-routine__board-container flex row wrap">
          <RoutineBoard :routine="routineModule.activeRoutine"
                        :cells="routineModule.activeRoutine.cells"
                        v-on:assign="assignCell($event.cell, $event.activity)"
                        v-on:clear="clearCell($event.cell)">
          </RoutineBoard>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="flex column">
        <!-- Enable/Disable Notifications -->
        <div class="flex row app-routine__notification-checkboxes">
          <!-- Is Enabled -->
          <CheckboxInput v-model="routineModule.activeRoutine.pushNotificationsEnabled"
                         label="Push Notifications"
                         name="pushNotificationsEnabled"
                         v-on:update-value="updateRoutineProps({pushNotificationsEnabled: $event})">
          </CheckboxInput>

          <!-- Is Enabled -->
          <CheckboxInput v-model="routineModule.activeRoutine.emailNotificationsEnabled"
                         label="Email Notifications"
                         name="emailNotificationsEnabled"
                         v-on:update-value="updateRoutineProps({emailNotificationsEnabled: $event})">
          </CheckboxInput>

          <div class="flex row grow-1 justify-content-end">
            <MutedButton name="openStatistics"
                         label="Check Statistics"
                         icon="fas fa-chart-pie"
                         v-on:click="generateRoutineStatisticsAndOpenModal">
            </MutedButton>
          </div>
        </div>

        <!-- Activities to Notify -->
        <div class="flex row">
          <!-- Notified Activities -->
          <div class="flex column" style="flex: 1 1 50%">
            <h4> Notify for: </h4>

            <div class="flex row wrap app-routine__notification margin-right">
              <ActivityIconButton v-for="activity of applicableNotifyTrueActivities"
                                  :key="activity._id"
                                  :activity="activity"
                                  v-on:click="toggleActivityNotify">
              </ActivityIconButton>
            </div>
          </div>

          <!-- Non-Notified Activities -->
          <div class="flex column" style="flex: 1 1 50%">
            <h4><strong> Don't </strong> Notify for: </h4>

            <div class="flex row wrap app-routine__notification">
              <ActivityIconButton v-for="activity of applicableNotifyFalseActivities"
                                  :key="activity._id"
                                  :activity="activity"
                                  v-on:click="toggleActivityNotify">
              </ActivityIconButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Settings Modal -->
    <Modal :is-open="routineModule.showTimeSettings"
           title-icon-path="fas fa-clock"
           title="Time Settings"
           v-on:close="toggleTimeSettingsModal({isOpen: false})">
      <template v-slot:content>
        <!-- Time Distribution -->
        <div class="flex row">
          <DropdownInput v-model="$data.timeSettings.timeFrequency"
                         label="Time Distribution"
                         name="routineFrequency"
                         :options="$data.dropdownOptions.timeFrequencies"
                         flex="0 0 240px"
                         v-on:update-value="$data.timeSettings.timeFrequency = $event">
          </DropdownInput>
        </div>

        <div class="flex row">
          <TimeInput v-model="$data.timeSettings.dayStartTime"
                     name="dayStartTime"
                     label="Day starts at">
          </TimeInput>

          <TimeInput v-model="$data.timeSettings.dayEndTime"
                     name="dayEndTime"
                     label="Day ends at">
          </TimeInput>
        </div>

        <div v-if="$data.confirmTimeSettings" class="flex row padded">
          <i class="fas fa-exclamation-triangle warning-text"></i>

          <span> Applying these settings will reset the schedule. Click Apply again to continue. </span>
        </div>
      </template>

      <template v-slot:footer>
        <CtaButton label="Apply"
                   icon="fas fa-check"
                   name="applyTimeSettings"
                   v-on:click="applyTimeSettings">
        </CtaButton>
      </template>
    </Modal>

    <!-- Delete Routine Prompt -->
    <Modal :is-open="routineModule.showDeleteRoutinePrompt"
           title-icon-path="fas fa-trash"
           title="Delete Routine?"
           v-on:close="toggleDeleteRoutinePrompt({isOpen: false})">
      <template v-slot:content>
        <div class="flex row padded warning justify-content-center">
          <i class="fas fa-exclamation-triangle warning-text"></i>

          <strong> Are you sure that you want to DELETE this routine? </strong>
        </div>
        <div class="flex row padded warning--red justify-content-center">
          <strong> This action CANNOT be undone! </strong>
        </div>
      </template>

      <template v-slot:footer>
        <DestroyButton label="Delete"
                       icon="fas fa-trash"
                       name="destroyRoutineBtn"
                       v-on:click="destroyRoutine">
        </DestroyButton>
      </template>
    </Modal>

    <!-- New Activity Modal -->
    <Modal :is-open="routineModule.showCreateActivityModal"
           title-icon-path="fas fa-list"
           title="Create a New Activity"
           v-on:close="toggleCreateActivityModal({isOpen: false})">
      <template v-if="routineModule.activeActivity" v-slot:content>
        <!-- Name -->
        <div class="flex row">
          <TextInput v-model="$data.activity.name"
                     ref="activityNameRef"
                     label="Name"
                     name="activityName"
                     flex="0 0 300px"
                     v-on:update-value="$data.activity.name = $event">
          </TextInput>
        </div>

        <!-- Icon and Color -->
        <div class="flex row">
          <!-- Icon -->
          <DropdownIconInput v-model="$data.activity.icon"
                             label="Icon"
                             name="activityIcon"
                             flex="0 0 90px"
                             :options="$data.dropdownOptions.icons"
                             v-on:update-value="$data.activity.icon = $event">
          </DropdownIconInput>

          <!-- Color -->
          <DropdownColorInput v-model="$data.activity.backgroundColor"
                              label="Color"
                              name="activityBackgroundColor"
                              flex="0 0 80px"
                              v-on:update-value="$data.activity.backgroundColor = $event">
          </DropdownColorInput>
        </div>

        <!-- Duration -->
        <div class="flex row">
          <!-- Typical Duration -->
          <NumberInput v-model="$data.activity.duration"
                       label="Typical Duration"
                       name="activityDuration"
                       flex="0 0 40px"
                       v-on:update-value="$data.activity.duration = $event">
          </NumberInput>

          <!-- Typical Duration UOM -->
          <DropdownInput v-model="$data.activity.durationMeasurement"
                         name="routineFrequency"
                         flex="0 0 145px"
                         :options="$data.dropdownOptions.timeMeasurements"
                         v-on:update-value="$data.activity.durationMeasurement = $event">
          </DropdownInput>
        </div>

        <div class="flex row">
          <ChipsInput v-model="$data.activity.categories"
                      label="Categories"
                      name="activityCategories"
                      :options="$data.dropdownOptions.activityCategories"
                      v-on:update-value="$data.activity.categories = $event">
          </ChipsInput>
        </div>

        <div class="flex row padded-top">
          <!-- Is Enabled -->
          <CheckboxInput v-model="$data.activity.notifyByDefault"
                         label="Notify by Default"
                         name="routineIsEnabled"
                         v-on:update-value="$data.activity.notifyByDefault = $event">
          </CheckboxInput>
        </div>
      </template>

      <template v-slot:footer>
        <CtaButton label="Done"
                   icon="fas fa-check"
                   name="saveActivity"
                   v-on:click="saveActivity">
        </CtaButton>
      </template>
    </Modal>

    <!-- Routine Statistics Modal -->
    <Modal :is-open="routineModule.showRoutineStatisticsModal"
           title-icon-path="fas fa-chart-pie"
           flex="1 1 80%"
           :content-background="'#eeeeee'"
           :title="'Statistics for ' + routineModule.activeRoutine.name"
           v-on:close="toggleRoutineStatisticsModal({isOpen: false})">
      <template v-if="statisticModule.activeRoutine" v-slot:content>
        <div class="flex row align-items-center justify-content-center">
          <div class="app-tab-view__tab__header"
               style="flex: 1 1 50%; text-align: center"
               v-bind:class="{'app-tab-view__tab__header--active': $data.statistics.isActivityHoursPerWeekMode}"
               v-on:click="setActiveStatisticsToActivities()">
            Activity Hours Per Week
          </div>
          <div class="app-tab-view__tab__header"
               style="flex: 1 1 50%; text-align: center"
               v-bind:class="{'app-tab-view__tab__header--active': $data.statistics.isActivityCategoryHoursPerWeekMode}"
               v-on:click="setActiveStatisticsToActivityCategories()">
            Activity Category Hours Per Week
          </div>
        </div>

        <div class="flex row app-routine__statistics">
          <div class="flex column app-routine__statistics__summary-column">
            <h4> Summary: </h4>

            <div v-for="summaryItem of $data.statistics.activeSummaryData"
                 :key="summaryItem.label"
                 class="flex row summary-item"
                 v-bind:style="{color: summaryItem.color}"
                 v-on:click="togglePolarAreaDataItem(summaryItem)">
              <i v-if="summaryItem.enabled" class="fas fa-circle"></i>
              <i v-if="!summaryItem.enabled" class="far fa-circle"></i>

              <i :class="summaryItem.icon"></i>

              <div class="flex grow-1"> {{ summaryItem.label }}</div>

              <div class="flex">
                <span v-if="summaryItem.hours"> {{ summaryItem.hours }} h </span>
                <span v-if="summaryItem.minutes"> {{ summaryItem.minutes }} m </span>
              </div>
            </div>
          </div>

          <div class="flex column basis_auto app-routine__statistics__chart">
            <PolarAreaChart
                ref="polarAreaChart"
                :series="$data.statistics.activePolarAreaData.series"
                :options="$data.statistics.activePolarAreaData.options">
            </PolarAreaChart>
          </div>
        </div>
      </template>
    </Modal>

    <!-- Current Activity Footer Sticky Bar -->
    <div v-if="routineModule.focusedActivityIconButton"
         class="app-routine__active-activity-footer"
         :style="{background: routineModule.focusedActivityIconButton.activity.backgroundColor, color: routineModule.focusedActivityIconButton.activity.iconColor}">
      You are now assigning
      <i :class="routineModule.focusedActivityIconButton.activity.icon.path"></i>
      {{ routineModule.focusedActivityIconButton.activity.name }}
    </div>
  </div>
</template>


<!-- TypeScript Class -->
<script lang="ts">

import 'reflect-metadata';
import Vue from 'vue';
import Component from 'vue-class-component';
import {inject} from 'inversify-props';
import RoutineRepositoryInterface from '@/infra/routine-planner/service/RoutineRepositoryInterface';
import TextInput from '@/components/TextInput.vue';
import {RoutineStore} from '@/store/routine-planner/RoutineStore';
import {
  Action,
  ACTION_ADD_ACTIVITY,
  ACTION_ADD_ROUTINE,
  ACTION_ASSIGN_ACTIVITY_TO_CELL,
  ACTION_CLEAR_ACTIVITY_FROM_CELL,
  ACTION_CLEAR_ROUTINES,
  ACTION_DELETE_ACTIVITY,
  ACTION_DELETE_ROUTINE,
  ACTION_RESET_ROUTINE_BOARD,
  ACTION_SET_ACTIVE_ACTIVITY,
  ACTION_SET_ACTIVE_ACTIVITY_ICON_BUTTON,
  ACTION_SET_ACTIVE_ROUTINE,
  ACTION_SET_ACTIVITIES,
  ACTION_SET_ACTIVITY_CATEGORIES,
  ACTION_SET_ICONS,
  ACTION_SET_ROUTINE_PAGE_ZONE,
  ACTION_SET_ROUTINES,
  ACTION_SET_TIME_FREQUENCIES,
  ACTION_TOGGLE_CREATE_ACTIVITY_MODAL,
  ACTION_TOGGLE_DELETE_ROUTINE_PROMPT,
  ACTION_TOGGLE_LOADING_STATE,
  ACTION_TOGGLE_ROUTINE_STATISTICS_MODAL,
  ACTION_TOGGLE_TIME_SETTINGS_MODAL,
  ACTION_UPDATE_ACTIVITY,
  ACTION_UPDATE_ROUTINE,
  State
} from '@/store';
import {
  PAYLOAD_ADD_ACTIVITY,
  PAYLOAD_ADD_ROUTINE,
  PAYLOAD_ASSIGN_ACTIVITY_TO_CELL,
  PAYLOAD_CLEAR_ACTIVITY_FROM_CELL,
  PAYLOAD_DELETE_ACTIVITY,
  PAYLOAD_DELETE_ROUTINE,
  PAYLOAD_SET_ACTIVE_ACTIVITY,
  PAYLOAD_SET_ACTIVE_ACTIVITY_ICON_BUTTON,
  PAYLOAD_SET_ACTIVE_ROUTINE,
  PAYLOAD_SET_ACTIVITIES,
  PAYLOAD_SET_ACTIVITY_CATEGORIES,
  PAYLOAD_SET_ICONS,
  PAYLOAD_SET_ROUTINE_PAGE_ZONE,
  PAYLOAD_SET_ROUTINES,
  PAYLOAD_SET_TIME_FREQUENCIES,
  PAYLOAD_TOGGLE_CREATE_ACTIVITY_MODAL,
  PAYLOAD_TOGGLE_DELETE_ROUTINE_PROMPT,
  PAYLOAD_TOGGLE_LOADING_STATE,
  PAYLOAD_TOGGLE_ROUTINE_STATISTICS_MODAL,
  PAYLOAD_TOGGLE_TIME_SETTINGS_MODAL,
  PAYLOAD_UPDATE_ACTIVITY,
  PAYLOAD_UPDATE_ROUTINE
} from '@/store/routine-planner/RoutinePayloadTypes';
import DropdownInput from '@/components/DropdownInput.vue';
import CheckboxInput from '@/components/CheckboxInput.vue';
import MutedButton from '@/components/MutedButton.vue';
import DestroyIconButton from '@/components/DestroyIconButton.vue';
import ActivityIconButton from '@/components/ActivityIconButton.vue';
import {Activity} from '@/domain/model/routine-planner/Activity';
import ActivityRepositoryInterface from '@/infra/routine-planner/service/ActivityRepositoryInterface';
import {Icon} from '@/domain/model/common/Icon';
import themeColors from '@/theme/variables/_colors.scss';
import {TimeDuration, TimeDurationEnum} from '@/domain/model/routine-planner/TimeDurationEnum';
import RoutineBoard from '@/components/RoutineBoard.vue';
import Modal from '@/components/Modal.vue';
import TimeInput from '@/components/TimeInput.vue';
import TimeFrequencyRepositoryInterface from '@/infra/routine-planner/service/TimeFrequencyRepositoryInterface';
import CtaButton from '@/components/CtaButton.vue';
import {Time} from '@/domain/model/common/Time';
import {RoutineTimeSettings} from '@/domain/model/routine-planner/RoutineTimeSettings';
import {TimeFrequency} from '@/domain/model/routine-planner/TimeFrequency';
import ActivityCategoryRepositoryInterface from '@/infra/routine-planner/service/ActivityCategoryRepositoryInterface';
import {forkJoin} from 'rxjs';
import {Routine} from '@/domain/model/routine-planner/Routine';
import {ActivityCategory} from '@/domain/model/routine-planner/ActivityCategory';
import DestroyButton from '@/components/DestroyButton.vue';
import {IntervalFrequency} from '@/domain/model/routine-planner/IntervalFrequency';
import {Week} from '@/domain/model/routine-planner/Week';
import {Cell} from '@/domain/model/routine-planner/Cell';
import DropdownIconInput from '@/components/DropdownIconInput.vue';
import IconRepositoryInterface from '@/infra/routine-planner/service/IconRepositoryInterface';
import DropdownColorInput from '@/components/DropdownColorInput.vue';
import {ColorHelper} from '@/infra/common/ColorHelper';
import NumberInput from '@/components/NumberInput.vue';
import {directive as onClickaway} from 'vue-clickaway';
import ChipsInput from '@/components/ChipsInput.vue';
import {ACTION_GENERATE_ROUTINE_OVERVIEW} from '@/store/statistics/StatisticActionTypes';
import {PAYLOAD_GENERATE_ROUTINE_OVERVIEW} from '@/store/statistics/StatisticPayloadTypes';
import PolarAreaChart from '@/components/PolarAreaChart.vue';
import {StatisticStore} from '@/store/statistics/StatisticStore';
import FunnelChart from '@/components/FunnelChart.vue';
import {DistributionSummary} from '@/store/statistics/types';
import {DropdownOption} from '@/domain/model/common/DropdownOption';

@Component({
  name: 'RoutinePlanner',
  components: {
    PolarAreaChart,
    FunnelChart,
    DropdownInput,
    TextInput,
    CheckboxInput,
    MutedButton,
    DestroyIconButton,
    ActivityIconButton,
    RoutineBoard,
    Modal,
    TimeInput,
    CtaButton,
    DestroyButton,
    DropdownIconInput,
    DropdownColorInput,
    NumberInput,
    ChipsInput
  },
  directives: {
    onClickaway
  }
})
export default class RoutinePlanner extends Vue {
  // Module State
  @State('routineModule')
  public routineModule!: RoutineStore;

  @State('statisticModule')
  public statisticModule!: StatisticStore;


  /* region Store Actions */
  // Update Lists (On Created will load and initialize loading state)
  @Action(ACTION_SET_ROUTINES)
  public setRoutines!: (payload: PAYLOAD_SET_ROUTINES) => void;

  @Action(ACTION_SET_ACTIVITIES)
  public setActivities!: (payload: PAYLOAD_SET_ACTIVITIES) => void;

  @Action(ACTION_SET_ACTIVITY_CATEGORIES)
  public setActivityCategories!: (payload: PAYLOAD_SET_ACTIVITY_CATEGORIES) => void;

  @Action(ACTION_SET_TIME_FREQUENCIES)
  public setTimeFrequencies!: (payload: PAYLOAD_SET_TIME_FREQUENCIES) => void;

  @Action(ACTION_SET_ICONS)
  public setIcons!: (payload: PAYLOAD_SET_ICONS) => void;


  // Routine Actions
  @Action(ACTION_CLEAR_ROUTINES)
  public clearRoutines!: () => void;

  @Action(ACTION_ADD_ROUTINE)
  public addRoutine!: (payload: PAYLOAD_ADD_ROUTINE) => void;

  @Action(ACTION_UPDATE_ROUTINE)
  public updateRoutine!: (payload: PAYLOAD_UPDATE_ROUTINE) => void;

  @Action(ACTION_DELETE_ROUTINE)
  public deleteRoutine!: (payload: PAYLOAD_DELETE_ROUTINE) => void;


  // Activity Actions
  @Action(ACTION_ADD_ACTIVITY)
  public addActivity!: (payload: PAYLOAD_ADD_ACTIVITY) => void;

  @Action(ACTION_UPDATE_ACTIVITY)
  public updateActivity!: (payload: PAYLOAD_UPDATE_ACTIVITY) => void;

  @Action(ACTION_DELETE_ACTIVITY)
  public deleteActivity!: (payload: PAYLOAD_DELETE_ACTIVITY) => void;


  // Focusing Items
  @Action(ACTION_SET_ACTIVE_ROUTINE)
  public setActiveRoutine!: (payload: PAYLOAD_SET_ACTIVE_ROUTINE) => void;

  @Action(ACTION_SET_ACTIVE_ACTIVITY)
  public setActiveActivity!: (payload: PAYLOAD_SET_ACTIVE_ACTIVITY) => void;

  @Action(ACTION_SET_ACTIVE_ACTIVITY_ICON_BUTTON)
  public setActiveActivityIconButton!: (payload: PAYLOAD_SET_ACTIVE_ACTIVITY_ICON_BUTTON) => void;


  // Routine Board Actions
  @Action(ACTION_RESET_ROUTINE_BOARD)
  public resetBoard!: () => void;

  @Action(ACTION_ASSIGN_ACTIVITY_TO_CELL)
  public assignActivityToCell!: (payload: PAYLOAD_ASSIGN_ACTIVITY_TO_CELL) => void;

  @Action(ACTION_CLEAR_ACTIVITY_FROM_CELL)
  public clearActivityFromCell!: (payload: PAYLOAD_CLEAR_ACTIVITY_FROM_CELL) => void;


  // Modal and Loading State Actions
  @Action(ACTION_TOGGLE_TIME_SETTINGS_MODAL)
  public toggleTimeSettingsModal!: (payload: PAYLOAD_TOGGLE_TIME_SETTINGS_MODAL) => void;

  @Action(ACTION_TOGGLE_DELETE_ROUTINE_PROMPT)
  public toggleDeleteRoutinePrompt!: (payload: PAYLOAD_TOGGLE_DELETE_ROUTINE_PROMPT) => void;

  @Action(ACTION_TOGGLE_CREATE_ACTIVITY_MODAL)
  public toggleCreateActivityModal!: (payload: PAYLOAD_TOGGLE_CREATE_ACTIVITY_MODAL) => void;

  @Action(ACTION_TOGGLE_ROUTINE_STATISTICS_MODAL)
  public toggleRoutineStatisticsModal!: (payload: PAYLOAD_TOGGLE_ROUTINE_STATISTICS_MODAL) => void;

  @Action(ACTION_TOGGLE_LOADING_STATE)
  public toggleLoadingState!: (payload: PAYLOAD_TOGGLE_LOADING_STATE) => void;


  // HTML Element Setters
  @Action(ACTION_SET_ROUTINE_PAGE_ZONE)
  public setRoutinePageZone!: (payload: PAYLOAD_SET_ROUTINE_PAGE_ZONE) => void;


  // Statistics
  @Action(ACTION_GENERATE_ROUTINE_OVERVIEW)
  public generateRoutineStatistics!: (payload: PAYLOAD_GENERATE_ROUTINE_OVERVIEW) => void;
  /* endregion */

  /* region DI */
  // Repository Injection
  @inject('ActivityCategoryRepository')
  private _activityCategoryRepository!: ActivityCategoryRepositoryInterface;

  @inject('ActivityRepository')
  private _activityRepository!: ActivityRepositoryInterface;

  @inject('RoutineRepository')
  private _routineRepository!: RoutineRepositoryInterface;

  @inject('TimeFrequencyRepository')
  private _timeFrequencyRepository!: TimeFrequencyRepositoryInterface;

  @inject('IconRepository')
  private _iconRepository!: IconRepositoryInterface;

  /* endregion */


  // Internal State (Keep to a minimum - State should be on RoutineStore Module)
  data() {
    return {
      statistics: {
        isActivityHoursPerWeekMode: true,
        isActivityCategoryHoursPerWeekMode: false,
        activeSummaryData: [],
        activePolarAreaData: {
          series: [],
          options: {
            labels: []
          }
        }
      },
      dropdownOptions: {
        timeFrequencies: [], // E.g. 1 Hour, 30 Minutes, etc.
        intervalFrequencies: IntervalFrequency.dropdownOptions, // E.g. Weekly, Biweekly, Monthly, etc.
        weeks: Week.dropdownOptions, // E.g. First Week, Second Week, etc.
        timeMeasurements: TimeDuration.dropdownOptions, // E.g. Minutes, Hour
        icons: [],
        colors: ColorHelper.generateRandomColorPalette(),
        activityCategories: []
      },
      timeSettings: {
        timeFrequency: null,
        dayStartTime: null,
        dayEndTime: null
      },
      activity: {
        name: '',
        categories: [],
        icon: null,
        backgroundColor: '',
        duration: 1,
        durationMeasurement: null,
        notifyByDefault: true
      },
      activitySelected: null,
      confirmTimeSettings: false,
      activityPanelOpen: false,
      shouldShowActivityPanelControl: false,
      clearActivity: new Activity(
          'clear',
          [],
          new Icon('clear', 'fas fa-times'),
          themeColors.buttonNegativeBg,
          themeColors.buttonNegativeText,
          0,
          TimeDurationEnum.Hours,
          false,
          false,
          true
      ),
      newActivity: new Activity(
          'new',
          [],
          new Icon('new', 'fas fa-plus'),
          themeColors.buttonMutedBg,
          themeColors.buttonMutedText,
          0,
          TimeDurationEnum.Hours,
          false,
          false,
          false
      )
    };
  }

  // Getters / Setters (Computed)
  get applicableNotifyTrueActivities() {
    const activeRoutine = this.routineModule.activeRoutine;

    return this.routineModule.activities.filter((activity: Activity) => {
      const activitySet = activeRoutine?.cells.find((cell: Cell) => cell.activity && cell.activity._id === activity._id);

      return !!activitySet && activity.notify;
    }).map((a: Activity) => {
      const clone = a.clone();

      clone.draggable = false;

      return clone;
    });
  }

  get applicableNotifyFalseActivities() {
    const activeRoutine = this.routineModule.activeRoutine;

    return this.routineModule.activities.filter((activity: Activity) => {
      const activitySet = activeRoutine?.cells.find((cell: Cell) => cell.activity && cell.activity._id === activity._id);

      return !!activitySet && !activity.notify;
    }).map((a: Activity) => {
      const clone = a.clone();

      clone.draggable = false;

      return clone;
    });
  }


  /* region Page Events */
  created() {
    window.addEventListener('resize', this.calculateActivityPanelControlVisibility);

    this.toggleLoadingState({isLoading: true});

    const observables = [
      this._routineRepository.getAllRoutines(),
      this._activityRepository.getAllActivities(),
      this._activityCategoryRepository.getAllCategories(),
      this._timeFrequencyRepository.getAllTimeFrequencies(),
      this._iconRepository.getAllIcons()
    ];

    forkJoin(observables)
        .subscribe(([routines, activities, activityCategories, timeFrequencies, icons]) => {
          // Assign object lists on Store
          this.setRoutines({routines: routines as Routine[]});
          this.setActivities({activities: activities as Activity[]});
          this.setActivityCategories({activityCategories: activityCategories as ActivityCategory[]});
          this.setTimeFrequencies({timeFrequencies: timeFrequencies as TimeFrequency[]});
          this.setIcons({icons: icons as Icon[]});

          // Set dropdown options for UI
          this.$data.dropdownOptions.timeFrequencies = this.routineModule.timeFrequencies
              .map((tf: TimeFrequency) => tf.mapToDropdownOption());
          this.$data.dropdownOptions.icons = this.routineModule.icons
              .map((i: Icon) => i.mapToDropdownOption());
          this.$data.dropdownOptions.activityCategories = this.routineModule.activityCategories
              .map((ac: ActivityCategory) => ac.mapToDropdownOption());

          // Calculate activity icons dropdown arrow visibility on UI
          this.calculateActivityPanelControlVisibility();

          // Final processing (Set active routine etc.)
          this.postListProcessing();
        });
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.calculateActivityPanelControlVisibility);
  }

  /* endregion */


  /* region Public Methods */
  selectRoutine(routine: Routine) {
    const routineName: TextInput = this.$refs.routineNameRef as TextInput;

    if (routineName) {
      routineName.setFocus();
    }

    this.setActiveRoutine({routine});
  }

  selectActivity(activityIconButton: ActivityIconButton) {
    this.setActiveActivityIconButton({activityIconButton});

    this.$data.activitySelected = true;
  }

  revertActivity() {
    this.setActiveActivityIconButton({activityIconButton: null});

    this.$data.activitySelected = false;
  }

  toggleActivityNotify(result: { event: MouseEvent; activity: Activity }) {
    const {activity} = result;
    const notify = !activity.notify;

    this._activityRepository.update(activity._id, activity)
        .then(() => {
          this.setActiveActivity({activity});
          this.updateActivity({notify});
          this.setActiveActivity({activity: null});
        });
  }

  newRoutine() {
    const timeFrequency = this.routineModule.timeFrequencies
        .find(tf => tf.interval === 1 && tf.intervalUom === TimeDurationEnum.Hours);
    const routineTimeSetting = new RoutineTimeSettings(
        timeFrequency || new TimeFrequency(1, TimeDurationEnum.Hours),
        new Time(6, 0),
        new Time(21, 0)
    );
    const newRoutine = new Routine(
        'My Weekly Routine',
        IntervalFrequency.defaultIntervalFrequency,
        Week.defaultWeek,
        true,
        routineTimeSetting,
        [],
        true,
        false
    );

    this._routineRepository.create(newRoutine)
        .then((routine: Routine) => {
          this.addRoutine({routine});

          this.selectRoutine(routine);
        });
  }

  destroyRoutine() {
    const routineModule = this.routineModule;
    const activeRoutine = routineModule.activeRoutine;

    if (activeRoutine) {
      const routines = routineModule.routines;
      const index = routines.findIndex(r => r._id === activeRoutine._id);
      const previousRoutineIndex = index - 1;

      if (index < 0) {
        throw new Error('Could not locate the active routine in the routines collection');
      }

      this._routineRepository.delete(activeRoutine._id)
          .then((numberOfItemsDeleted: number) => {
            if (numberOfItemsDeleted > 0) {
              this.deleteRoutine({routineId: activeRoutine._id});

              // If there are no routines left, create a default one
              if (previousRoutineIndex < 0) {
                this.newRoutine();
              } else {
                // Set the previous routine tab as active
                const previousRoutine = this.routineModule.routines[previousRoutineIndex];

                this.selectRoutine(previousRoutine);
              }

              // Close the prompt
              this.toggleDeleteRoutinePrompt({isOpen: false});
            }
          });
    }
  }

  updateRoutineProps(updateObject: object) {
    this.updateRoutine(updateObject);

    this.upsertRoutine();
  }

  updateActivityProps(updateObject: object) {
    this.updateActivity(updateObject);
  }

  assignCell(cell: Cell, activity: Activity) {
    this.assignActivityToCell({cell, activity});

    this.upsertRoutine();
  }

  clearCell(cell: Cell) {
    this.clearActivityFromCell({cell});

    this.upsertRoutine();
  }

  upsertRoutine() {
    const activeRoutine = this.routineModule.activeRoutine;

    if (activeRoutine) {
      this._routineRepository.update(activeRoutine._id, activeRoutine);
    }
  }

  upsertActivity() {
    const activeActivity = this.routineModule.activeActivity;

    if (activeActivity) {
      this._activityRepository.update(activeActivity._id, activeActivity);
    }
  }

  toggleActivityPanel() {
    this.$data.activityPanelOpen = false;
  }

  openTimeSettings() {
    this.assignLocalTimeSettings();

    this.toggleTimeSettingsModal({isOpen: true});
  }

  applyTimeSettings() {
    if (!this.$data.confirmTimeSettings) {
      this.$data.confirmTimeSettings = true;

      return;
    }

    const localTimeSettings = this.$data.timeSettings;
    const updatedTimeSettings = new RoutineTimeSettings(
        localTimeSettings.timeFrequency,
        localTimeSettings.dayStartTime,
        localTimeSettings.dayEndTime
    );

    this.updateRoutineProps({timeSettings: updatedTimeSettings});

    this.resetBoard();

    // Reset local confirm state on Time Settings modal
    this.$data.confirmTimeSettings = false;

    this.toggleTimeSettingsModal({isOpen: false});
  }

  createActivityAndOpenModal() {
    const randomColorPalette = this.$data.dropdownOptions.colors;
    const defaultIcon = this.$data.dropdownOptions.icons[0];
    const newActivity = new Activity(
        '',
        [],
        defaultIcon.data,
        randomColorPalette[0],
        '',
        1,
        TimeDurationEnum.Hours,
        true,
        true,
        true
    );

    this.editActivity(newActivity);
  }

  saveActivity() {
    const tempActivity = this.$data.activity;
    const categories = tempActivity.categories.map((c: DropdownOption<ActivityCategory>) => c.data);
    const typicalDurationUom = tempActivity.durationMeasurement.data;
    const icon = tempActivity.icon.data;
    const activeActivity = this.routineModule.activeActivity;

    if (activeActivity) {
      const updateObject = {
        name: tempActivity.name,
        categories,
        icon,
        backgroundColor: tempActivity.backgroundColor,
        iconColor: ColorHelper.getFontColorForBackground(tempActivity.backgroundColor),
        typicalDuration: tempActivity.duration,
        typicalDurationUom,
        notifyByDefault: tempActivity.notifyByDefault,
        notify: tempActivity.notifyByDefault
      };

      this.updateActivityProps(updateObject);

      if (!activeActivity._id) {
        this._activityRepository.create(activeActivity)
            .then((newActivity: Activity) => {
              this.updateActivityProps({_id: newActivity._id});

              this.setActiveActivity({activity: null});
              this.toggleCreateActivityModal({isOpen: false});
            });
      } else {
        this.upsertActivity();

        this.setActiveActivity({activity: null});
        this.toggleCreateActivityModal({isOpen: false});
      }
    }
  }

  editActivity(activity: Activity) {
    const iconDropdownItem = this.$data.dropdownOptions.icons.find((i: DropdownOption<Icon>) => i.id === activity.icon._id);
    const durationUomDropdownOption = this.$data.dropdownOptions.timeMeasurements.find((uom: DropdownOption<TimeDurationEnum>) => uom.data === activity.typicalDurationUom);
    const activityName: TextInput = this.$refs.activityNameRef as TextInput;

    this.$data.activity = {
      name: activity.name,
      categories: activity.categories,
      icon: iconDropdownItem,
      backgroundColor: activity.backgroundColor,
      duration: activity.typicalDuration,
      durationMeasurement: durationUomDropdownOption,
      notifyByDefault: true
    };

    this.setActiveActivity({activity: activity});
    this.toggleCreateActivityModal({isOpen: true});

    if (activityName) {
      activityName.setFocus();
    }
  }

  removeActivity(activity: Activity) {
    this._activityRepository.delete(activity._id)
        .then((numberOfItemsDeleted: number) => {
          if (numberOfItemsDeleted > 0) {
            this.deleteActivity({activityId: activity._id});
          }
        });
  }

  checkAndRevertActivityIconButton(event: MouseEvent) {
    const focusedActivityIconButton = this.routineModule.focusedActivityIconButton;
    const mouseButton = event && event.button;
    const SECONDARY_CLICK = 2;

    if (!focusedActivityIconButton ||
        mouseButton !== SECONDARY_CLICK) {
      return;
    }

    focusedActivityIconButton.revertIconPosition();
  }

  generateRoutineStatisticsAndOpenModal() {
    const routine = this.routineModule.activeRoutine;

    if (routine) {
      this.generateRoutineStatistics({routine});

      this.setActiveStatisticsToActivities();

      requestAnimationFrame(() => {
        this.toggleRoutineStatisticsModal({isOpen: true});
      });
    }
  }

  setActiveStatisticsToActivities() {
    const activeRoutine = this.statisticModule.activeRoutine;

    if (!activeRoutine) {
      throw new Error('Failed to set the active routine in the statistic module.');
    }

    const summary = activeRoutine.activityDistributionSummary;
    const polarAreaData = activeRoutine.polarAreaActivityDistribution;

    this.$data.statistics.isActivityHoursPerWeekMode = true;
    this.$data.statistics.isActivityCategoryHoursPerWeekMode = false;
    this.$data.statistics.activeSummaryData = summary;
    this.$data.statistics.activePolarAreaData = polarAreaData;
  }

  setActiveStatisticsToActivityCategories() {
    const activeRoutine = this.statisticModule.activeRoutine;

    if (!activeRoutine) {
      throw new Error('Failed to set the active routine in the statistic module.');
    }

    const summary = activeRoutine.activityCategoryDistributionSummary;
    const polarAreaData = activeRoutine.polarAreaActivityCategoryDistribution;

    this.$data.statistics.isActivityHoursPerWeekMode = false;
    this.$data.statistics.isActivityCategoryHoursPerWeekMode = true;
    this.$data.statistics.activeSummaryData = summary;
    this.$data.statistics.activePolarAreaData = polarAreaData;
  }

  togglePolarAreaDataItem(summaryItem: DistributionSummary) {
    const polarAreaChart = this.$refs.polarAreaChart as PolarAreaChart;

    if (polarAreaChart) {
      summaryItem.enabled = !summaryItem.enabled;

      polarAreaChart.toggleDataItem(summaryItem);
    }
  }
  /* endregion */


  /* region Private Methods */
  private assignLocalTimeSettings() {
    const timeSettings = this.routineModule.activeRoutine?.timeSettings;

    this.$data.timeSettings = {
      timeFrequency: timeSettings?.timeFrequency,
      dayStartTime: timeSettings?.dayStartTime,
      dayEndTime: timeSettings?.dayEndTime
    };
  }

  private postListProcessing() {
    const routines = this.routineModule.routines;
    const firstRoutine = routines[0];

    this.selectRoutine(firstRoutine);

    this.toggleLoadingState({isLoading: false});
  }

  private calculateActivityPanelControlVisibility() {
    const activitiesPanel: HTMLElement = this.$refs.activitiesPanel as HTMLElement;

    if (activitiesPanel) {
      const width = activitiesPanel.clientWidth;
      const rightGutter = 55;
      const tileSize = 50;
      const tileGutter = 5;
      const calculatedWidth = width - rightGutter;
      const tilesPerRow = Math.floor(calculatedWidth / (tileSize + tileGutter));
      const numberOfActivities = this.routineModule.activities.length + 2;
      const activityPanelMaxTiles = tilesPerRow * 2;

      this.$data.shouldShowActivityPanelControl = numberOfActivities > activityPanelMaxTiles;
    }
  }

  /* endregion */
}

</script>

<style lang="scss">
@import "../theme/index";
</style>
