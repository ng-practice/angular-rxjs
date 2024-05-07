import { createAction, props } from '@ngrx/store';
import { TodoSettingsOptions } from '../todo-settings.service';

export const updateSettings = createAction(
  '[Settings] Settings updated',
  props<Partial<TodoSettingsOptions>>()
);
