import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { updateSettings } from '../../store/settings.actions';
import { allSettings } from '../../store/settings.selectors';

@Component({
  selector: 'app-todo-settings',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, AsyncPipe],
  template: `
    <h2 mat-dialog-title data-testid="dialog-settings-title">Settings</h2>
    @if(settings$ | async; as settings) {
    <mat-dialog-content>
      <input
        #todoTextInput
        type="number"
        class="todo__input"
        placeholder="What needs to be done?"
        [value]="settings.pollingInterval"
        (change)="updateInterval($any($event))"
        (keyup.enter)="updateInterval($any($event))"
      />

      <div class="todo">
        <label class="todo__label"
          >Enable Polling
          <input
            type="checkbox"
            [checked]="settings.isPollingEnabled"
            (change)="togglePolling($any($event))"
          />
          <span class="todo__checkmark"></span>
        </label>
      </div>
    </mat-dialog-content>
    }

    <mat-dialog-actions align="end">
      <button mat-dialog-close class="todo__button--primary">CLOSE</button>
    </mat-dialog-actions>
  `,
  styles: `
    :host {
      display: block;
      padding: 1.5rem;
    }
  `,
})
export class TodoSettingsComponent {
  #store = inject(Store);

  settings$ = this.#store.select(allSettings);

  togglePolling(event: Event & { target: { checked: boolean } }) {
    this.#store.dispatch(
      updateSettings({ isPollingEnabled: event.target.checked })
    );

    // violates Action Type Uniqueness
    // this.#store.dispatch(
    //   resetSettings({ isPollingEnabled: event.target.checked })
    // );

    // violates Action Serializability
    // this.#store.dispatch(notSerializable({ do: () => true }));
  }

  updateInterval(event: Event & { target: { value: string } }) {
    this.#store.dispatch(
      updateSettings({ pollingInterval: +event.target.value })
    );
  }
}
