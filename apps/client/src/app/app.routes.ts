import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { settingsReducer } from './todos/store/settings.reducer';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  {
    path: 'todos',
    providers: [provideState('settings', settingsReducer)],
    loadChildren: () =>
      import('./todos/internals/todos.routes').then(
        (module) => module.todosRoutes
      ),
  },
];
