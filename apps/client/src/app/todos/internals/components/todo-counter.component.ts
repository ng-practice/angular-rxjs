import { Component, input } from '@angular/core';

@Component({
  selector: 'app-todo-counter',
  standalone: true,
  template: `
    <span class="todo__text--emphasize">{{ count() }}</span>
    <span class="todo__text--default">Item(s) left</span>
  `,
})
export class TodoCounterComponent {
  count = input<number>();
}
