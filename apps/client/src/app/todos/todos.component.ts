import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
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
import { todosActions } from './store/todos.actions';
import { allTodos, todosCount } from './store/todos.selector';

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
        [count]="count$ | async"
        class="todo__component--spaced"
      ></app-todo-counter>

      @for(todo of todos; track todo.id) {
      <app-todo-checker
        data-testid="todo-item"
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
  #store = inject(Store);

  update$$ = new Subject<void>();

  todosInitial$ = this.#store.select(allTodos).pipe(skip(1), first());

  todosSource$ = this.#store.select(allTodos);

  todosMostRecent$ = this.update$$.pipe(
    withLatestFrom(this.todosSource$),
    map(([, todos]) => todos)
  );

  todos$ = merge(this.todosInitial$, this.todosMostRecent$);

  count$ = this.#store.select(todosCount);

  show$: Observable<boolean> = of(false);
  hide$: Observable<boolean> = of(false);
  showReload$: Observable<boolean> = of(true);

  isErrorShown = false;

  ngOnInit(): void {
    this.showReloadOnUpdates();

    this.#store.dispatch(todosActions.loadingStarted());
  }

  completeOrIncompleteTodo(todo: Todo) {
    /*
     * Note in order to keep the code clean for the workshop we did not
     * handle the following subscription.
     * Normally you want to unsubscribe.
     *
     * We just want to focus you on RxJS.
     */
    this.#store.dispatch(todosActions.toggleCompletionStarted({ todo }));
  }

  private showReloadOnUpdates() {
    this.show$ = this.todosSource$.pipe(
      skip(1),
      map(() => true)
    );
    this.hide$ = this.update$$.pipe(map(() => false));

    this.showReload$ = merge(this.show$, this.hide$);
  }
}
