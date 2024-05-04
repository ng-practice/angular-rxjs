import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { TodoSettingsComponent } from './todo-settings.component';

@Component({
  selector: 'app-todo-navigation',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatIcon],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Todos</span>
        <span class="spacer"></span>
        <button mat-icon-button>
          <mat-icon (click)="openSettings()" aria-label="Open settings dialog"
            >settings</mat-icon
          >
        </button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: ['.spacer { flex: 1 1 auto; }'],
})
export class TodoNavigationComponent {
  private dialog = inject(MatDialog);

  openSettings() {
    this.dialog.open(TodoSettingsComponent);
  }
}
