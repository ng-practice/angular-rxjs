import { createAction, props } from '@ngrx/store';
import { Settings } from './settings';

export const updateSettings = createAction(
  '[Settings] Settings updated',
  props<Partial<Settings>>()
);

export const resetSettings = createAction(
  '[Settings] Settings reset',
  props<Partial<Settings>>()
);

export const notSerializable = createAction(
  '[Settings] Settings not serializable',
  props<{ do: () => boolean }>()
);
