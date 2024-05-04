import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoApi } from '../models';

@Injectable({ providedIn: 'root' })
export class Toolbelt {
  private snackbar = inject(MatSnackBar);

  toTodoApi(todo: Todo): TodoApi {
    const { isDone, ...rest } = todo;

    const mappedTodo = {
      ...rest,
      isComplete: isDone,
    };

    return mappedTodo;
  }

  toTodo(todoApi: TodoApi): Todo {
    const { isComplete, ...rest } = todoApi;

    const mappedTodo = {
      ...rest,
      isDone: isComplete,
    };

    return mappedTodo;
  }

  offerHardReload() {
    const openDialog = this.snackbar.open(
      'Was not able loading todos',
      'Retry'
    );

    const afterAction = openDialog.onAction().subscribe(() => {
      location.reload();
      afterAction.unsubscribe();
    });
  }
}
