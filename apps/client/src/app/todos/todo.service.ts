import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import {
  delay,
  exhaustMap,
  map,
  retryWhen,
  share,
  switchMap,
} from 'rxjs/operators';
import { Toolbelt } from './internals';
import { Todo, TodoApi } from './models';
import { allSettings } from './store/settings.selectors';

const todosUrl = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class TodoService {
  #store = inject(Store);

  private http = inject(HttpClient);
  private toolbelt = inject(Toolbelt);

  loadFrequently() {
    return this.#store.select(allSettings).pipe(
      switchMap(({ isPollingEnabled, pollingInterval }) =>
        isPollingEnabled
          ? timer(0, pollingInterval || 5000).pipe(
              exhaustMap(() => this.query())
            )
          : this.query()
      ),
      retryWhen((errors) => errors.pipe(delay(1000))),
      share()
    );
  }

  private query(): Observable<Todo[]> {
    return this.http
      .get<TodoApi[]>(`${todosUrl}`)
      .pipe(map((todos) => todos.map((todo) => this.toolbelt.toTodo(todo))));
  }

  create(todo: Todo): Observable<TodoApi> {
    return this.http.post<TodoApi>(todosUrl, todo);
  }

  remove(todoForRemoval: TodoApi): Observable<Todo> {
    return this.http
      .delete<TodoApi>(`${todosUrl}/${todoForRemoval.id}`)
      .pipe(map((todo) => this.toolbelt.toTodo(todo)));
  }

  completeOrIncomplete(todoForUpdate: Todo): Observable<Todo> {
    const updatedTodo = this.toggleTodoState(todoForUpdate);
    return this.http
      .put<TodoApi>(
        `${todosUrl}/${todoForUpdate.id}`,
        this.toolbelt.toTodoApi(updatedTodo)
      )
      .pipe(map((todo) => this.toolbelt.toTodo(todo)));
  }

  private toggleTodoState(todoForUpdate: Todo): Todo {
    todoForUpdate.isDone = todoForUpdate.isDone ? false : true;
    return todoForUpdate;
  }
}
