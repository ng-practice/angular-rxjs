import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, timer } from 'rxjs';
import { catchError, exhaustMap, map, retry, share, tap } from 'rxjs/operators';
import { Toolbelt } from './internals';
import { Todo, TodoApi } from './models';
import { TodoSettings } from './todo-settings.service';

const todosUrl = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private toolbelt = inject(Toolbelt);
  private settings = inject(TodoSettings);

  loadFrequently() {
    // TODO: Introduce error handled, configured, recurring, all-mighty stream
    return timer(0, 5000).pipe(
      exhaustMap(() => this.query().pipe(catchError(() => EMPTY))),
      retry(),
      tap({ error: () => this.toolbelt.offerHardReload() }),
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
