import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-todo-updater',
  template: `
    @if(isShown()) {
    <button (click)="reload.emit()" class="todo__button--primary">
      RELOAD
    </button>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        background: #4503bfc2;
        min-height: 35px;
        padding: 8px;
        text-align: center;
      }
    `,
  ],
})
export class TodoUpdaterComponent {
  isShown = input<boolean | null>(false);
  reload = output<void>();
}
