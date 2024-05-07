import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { settingsReducer } from './todos/store/settings.reducer';
import { TodosEffects } from './todos/store/todos.effects';
import { todosReducer } from './todos/store/todos.reducer';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  {
    path: 'todos',
    providers: [
      provideState('settings', settingsReducer),
      provideState('todos', todosReducer),
      provideEffects([TodosEffects]),
    ],
    loadChildren: () =>
      import('./todos/internals/todos.routes').then(
        (module) => module.todosRoutes
      ),
  },
];
