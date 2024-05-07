import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Settings } from './settings';

const settingsFeature = createFeatureSelector<Settings>('settings');

export const allSettings = createSelector(settingsFeature, (state) => state);

export const isPollingEnabled = createSelector(
  settingsFeature,
  (state) => state.isPollingEnabled
);
