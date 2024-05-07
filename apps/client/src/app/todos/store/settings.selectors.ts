import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoSettingsOptions } from '../todo-settings.service';

const settingsFeature = createFeatureSelector<TodoSettingsOptions>('settings');

export const allSettings = createSelector(settingsFeature, (state) => state);
