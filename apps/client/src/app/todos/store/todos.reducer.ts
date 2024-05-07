import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models';
import { todosActions } from './todos.actions';

export type TodosState = { entities: Todo[] };

const initialState: TodosState = {
  entities: [],
};

export const todosReducer = createReducer(
  initialState,
  on(todosActions.loadingSucceeded, (state, action) => {
    return {
      ...state,
      entities: action.todos,
    };
  })
);
