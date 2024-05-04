import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  {
    path: 'todos',
    loadChildren: () =>
      import('./todos/internals/todos.routes').then(
        (module) => module.todosRoutes
      ),
  },
];
