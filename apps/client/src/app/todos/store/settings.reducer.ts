import { createReducer, on } from '@ngrx/store';
import { TodoSettingsOptions } from '../todo-settings.service';
import { updateSettings } from './settings.actions';

const initialState: TodoSettingsOptions = {
  isPollingEnabled: true,
  pollingInterval: 5000,
};

export const settingsReducer = createReducer(
  initialState,

  on(updateSettings, (state, action) => {
    const { type, ...payload } = action;

    return { ...state, ...payload };
  })
);
