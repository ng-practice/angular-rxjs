import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { TodoService } from '../todo.service';
import { todosActions } from './todos.actions';

@Injectable()
export class TodosEffects {
  #todoService = inject(TodoService);
  #snackbar = inject(MatSnackBar);

  #actions$ = inject(Actions);

  load = createEffect(() =>
    this.#actions$.pipe(
      ofType(todosActions.loadingStarted),
      exhaustMap(() => this.#todoService.loadFrequently()),
      map((todos) => todosActions.loadingSucceeded({ todos }))
    )
  );

  toggleCompletion = createEffect(() =>
    this.#actions$.pipe(
      ofType(todosActions.toggleCompletionStarted),
      exhaustMap(({ todo }) =>
        this.#todoService.completeOrIncomplete(todo).pipe(
          map((todo) => todosActions.toggleCompletionSucceed({ todo })),
          catchError(() => of(todosActions.toggleCompletionFailed()))
        )
      )
    )
  );

  errorNotification = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(todosActions.toggleCompletionFailed),
        tap(() =>
          this.#snackbar.open('Das hat nicht geklappt', 'Ok', {
            duration: 3000,
          })
        )
      ),
    { dispatch: false }
  );
}
