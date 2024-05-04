import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../models';

@Component({
  selector: 'app-todo-checker',
  template: `<div class="todo">
    <label class="todo__label" [ngClass]="{ 'todo--is-done': todo.isDone }"
      >{{ todo.text }}
      <input type="checkbox" [checked]="todo.isDone" (change)="emitToggle()" />
      <span class="todo__checkmark"></span>
    </label>
  </div>`,
})
export class TodoCheckerComponent {
  @Input() todo: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  emitToggle() {
    this.toggle.emit(this.todo);
  }

  emitRemove() {
    this.remove.emit(this.todo);
  }
}
