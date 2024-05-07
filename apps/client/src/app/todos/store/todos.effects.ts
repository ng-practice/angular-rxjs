import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { TodoService } from '../todo.service';
import { todosActions } from './todos.actions';

@Injectable()
export class TodosEffects {
  #todoService = inject(TodoService);
  #actions$ = inject(Actions);

  load = createEffect(() =>
    this.#actions$.pipe(
      ofType(todosActions.loadingStarted),
      exhaustMap(() => this.#todoService.loadFrequently()),
      map((todos) => todosActions.loadingSucceeded({ todos }))
    )
  );
}
