import { Route } from '@angular/router';
import { TodosComponent } from '../todos.component';

export const todosRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  { path: ':query', component: TodosComponent },
];
