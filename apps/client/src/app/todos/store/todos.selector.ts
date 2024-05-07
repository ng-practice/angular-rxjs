import { createFeatureSelector } from '@ngrx/store';
import { TodosState, todosAdapter } from './todos.reducer';

const todosFeature = createFeatureSelector<TodosState>('todos');

export const { selectAll: allTodos, selectTotal: todosCount } =
  todosAdapter.getSelectors(todosFeature);
