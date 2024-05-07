import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models';
import { todosActions } from './todos.actions';

export type TodosState = EntityState<Todo>;

export const todosAdapter = createEntityAdapter<Todo>();

export const todosReducer = createReducer(
  todosAdapter.getInitialState(),
  on(todosActions.loadingSucceeded, (state, action) =>
    todosAdapter.setAll(action.todos, state)
  ),
  on(todosActions.toggleCompletionSucceed, (state, action) =>
    todosAdapter.updateOne({ id: action.todo.id, changes: action.todo }, state)
  )
);
