import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

const todosFeature = createFeatureSelector<TodosState>('todos');

export const allTodos = createSelector(todosFeature, (state) => state.entities);
export const todosCount = createSelector(allTodos, (todos) => todos.length);
