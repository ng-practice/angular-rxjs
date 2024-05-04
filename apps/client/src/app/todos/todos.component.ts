import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  template: `
    <app-todo-navigation></app-todo-navigation>
    <app-todo-updater
      [isShown]="showReload$ | async"
      (reload)="update$$.next()"
    ></app-todo-updater>
    <main class="todo__app">
      <ng-container *ngIf="todos$ | async as todos; else loadingIndicator">
        <app-todo-counter
          [count]="todos.length"
          class="todo__component--spaced"
        ></app-todo-counter>
        <app-todo-checker
          [todo]="todo"
          (toggle)="completeOrIncompleteTodo($event)"
          *ngFor="let todo of todos"
        ></app-todo-checker>
      </ng-container>

      <app-todos-pinned [todos]="todos$ | async"></app-todos-pinned>

      <ng-template #loadingIndicator>
        <div *ngIf="!isErrorShown" style="padding: 8px">
          Get todos ready for you...
        </div>
      </ng-template>
    </main>
  `,
})
export class TodosComponent implements OnInit {
  private todosService = inject(TodoService);
  todos$: Observable<Todo[]>;
  todosSource$ = this.todosService.loadFrequently();
  todosInitial$: Observable<Todo[]> = of([]);
  todosMostRecent$: Observable<Todo[]> = of([]);

  update$$ = new Subject<void>();
  show$: Observable<boolean> = of(false);
  hide$: Observable<boolean> = of(false);
  showReload$: Observable<boolean> = of(true);

  isErrorShown = false;

  constructor() {
    // TODO: Control update of todos in App (back pressure)
    this.todos$ = this.todosSource$;
  }

  // TODO: Remove eslint-disable-next-line as soon as ngOnInit has been implemented.
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // TODO: Control display of refresh button
  }

  completeOrIncompleteTodo(todoForUpdate: Todo) {
    /*
     * Note in order to keep the code clean for the workshop we did not
     * handle the following subscription.
     * Normally you want to unsubscribe.
     *
     * We just want to focus you on RxJS.
     */
    this.todosService.completeOrIncomplete(todoForUpdate).subscribe();
  }
}
