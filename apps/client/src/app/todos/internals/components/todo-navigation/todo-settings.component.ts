import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TodoSettings,
  TodoSettingsOptions,
} from '../../../todo-settings.service';

@Component({
  selector: 'app-todo-settings',
  template: `
    <h2 mat-dialog-title>Settings</h2>
    <mat-dialog-content *ngIf="settings$ | async as settings">
      <input
        #todoTextInput
        type="number"
        class="todo__input"
        placeholder="What needs to be done?"
        [value]="settings.pollingInterval"
        (change)="updateInterval($event)"
        (keyup.enter)="updateInterval($event)"
      />

      <div class="todo">
        <label class="todo__label"
          >Enable Polling
          <input
            type="checkbox"
            [checked]="settings.isPollingEnabled"
            (change)="togglePolling($event)"
          />
          <span class="todo__checkmark"></span>
        </label>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-dialog-close="" class="todo__button--primary">CLOSE</button>
    </mat-dialog-actions>
  `,
})
export class TodoSettingsComponent {
  private todoSettings = inject(TodoSettings);
  settings$: Observable<Partial<TodoSettingsOptions>>;

  constructor() {
    this.settings$ = todoSettings.settings$;
  }

  togglePolling(event: Event & { target: { checked: boolean } }) {
    this.todoSettings.update({ isPollingEnabled: event.target.checked });
  }

  updateInterval(event: Event & { target: { value: string } }) {
    this.todoSettings.update({ pollingInterval: +event.target.value });
  }
}
