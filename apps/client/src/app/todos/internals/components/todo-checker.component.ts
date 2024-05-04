import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from '../../models';

@Component({
  selector: 'app-todo-checker',
  standalone: true,
  imports: [NgClass],
  template: `<div class="todo">
    <label class="todo__label" [ngClass]="{ 'todo--is-done': todo().isDone }"
      >{{ todo().text }}
      <input
        type="checkbox"
        [checked]="todo().isDone"
        (change)="emitToggle()"
      />
      <span class="todo__checkmark"></span>
    </label>
  </div>`,
})
export class TodoCheckerComponent {
  todo = input.required<Todo>();
  toggle = output<Todo>();
  remove = output<Todo>();

  emitToggle() {
    this.toggle.emit(this.todo());
  }

  emitRemove() {
    this.remove.emit(this.todo());
  }
}
