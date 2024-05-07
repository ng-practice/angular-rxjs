import { createReducer, on } from '@ngrx/store';
import { Settings } from './settings';
import { updateSettings } from './settings.actions';

const initialState: Settings = {
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
