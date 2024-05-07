import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../models';

export const todosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Loading Started': emptyProps(),
    'Loading Succeeded': props<{ todos: Todo[] }>(),
    'Loading Failed': emptyProps(),
    'Toggle Completion Started': props<{ todo: Todo }>(),
    'Toggle Completion Succeed': props<{ todo: Todo }>(),
    'Toggle Completion Failed': emptyProps(),
  },
});
