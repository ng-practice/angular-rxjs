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
  }),
  on(todosActions.toggleCompletionSucceed, (state, action) => {
    return {
      ...state,
      entities: state.entities.map((todo) => {
        if (todo.id === action.todo.id) return action.todo;

        return todo;
      }),
    };
  })
);
