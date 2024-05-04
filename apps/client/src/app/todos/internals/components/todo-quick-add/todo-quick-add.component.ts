import { Component, output } from '@angular/core';
import { Todo } from '../../../models';

@Component({
  selector: 'app-todo-quick-add',
  template: `
    <input
      #todoTextInput
      type="text"
      class="todo__input"
      placeholder="What needs to be done?"
      (keydown.enter)="emitCreate(todoTextInput)"
    />

    <button (click)="emitCreate(todoTextInput)" class="todo__button--primary">
      Add
    </button>
  `,
})
export class TodoQuickAddComponent {
  create = output<Todo>();

  emitCreate(textInput: HTMLInputElement) {
    this.create.emit({
      id: 1,
      text: textInput.value,
      isDone: false,
      isPinned: false,
    });
    textInput.value = '';
  }
}
