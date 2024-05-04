import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  Observable,
  Subject,
  first,
  map,
  merge,
  of,
  skip,
  withLatestFrom,
} from 'rxjs';
import { TodoCheckerComponent } from './internals/components/todo-checker.component';
import { TodoCounterComponent } from './internals/components/todo-counter.component';
import { TodoNavigationComponent } from './internals/components/todo-navigation.component';
import { TodoUpdaterComponent } from './internals/components/todo-updater.component';
import { TodosPinnedComponent } from './internals/components/todos-pinned.component';
import { Todo } from './models';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    AsyncPipe,
    TodoNavigationComponent,
    TodoUpdaterComponent,
    TodoCounterComponent,
    TodoCheckerComponent,
    TodosPinnedComponent,
  ],
  template: `
    <app-todo-navigation></app-todo-navigation>

    <app-todo-updater
      [isShown]="showReload$ | async"
      (reload)="update$$.next()"
    ></app-todo-updater>

    <main class="todo__app">
      @if(todos$ | async; as todos) {
      <app-todo-counter
        [count]="todos.length"
        class="todo__component--spaced"
      ></app-todo-counter>

      @for(todo of todos; track todo.id) {
      <app-todo-checker
        [todo]="todo"
        (toggle)="completeOrIncompleteTodo($event)"
      ></app-todo-checker>
      } } @else if(!isErrorShown) {
      <div style="padding: 8px">Get todos ready for you...</div>
      }

      <app-todos-pinned [todos]="todos$ | async"></app-todos-pinned>
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

  ngOnInit(): void {
    this.todosInitial$ = this.todosSource$.pipe(first());
    this.todos$ = this.todosSource$;

    this.todosMostRecent$ = this.update$$.pipe(
      withLatestFrom(this.todosSource$),
      map(([, todos]) => todos)
    );

    this.todos$ = merge(this.todosInitial$, this.todosMostRecent$);

    this.show$ = this.todosSource$.pipe(
      skip(1),
      map(() => true)
    );
    this.hide$ = this.update$$.pipe(map(() => false));

    this.showReload$ = merge(this.show$, this.hide$);
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
