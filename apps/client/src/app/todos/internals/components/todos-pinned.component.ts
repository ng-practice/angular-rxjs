import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { Todo } from '../../models';

@Component({
  selector: 'app-todos-pinned',
  standalone: true,
  imports: [MatList, MatListItem, MatIcon],
  template: `
    @if(todos(); as todos) { @if(todos.length > 0) { >
    <h3 class="mat-h3">Pinned</h3>
    <mat-list>
      <mat-list-item *ngFor="let todo of todos | pinned">
        <mat-icon mat-list-icon>beenhere</mat-icon>
        {{ todo.text }}
      </mat-list-item>
    </mat-list>
    } }
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 16px;
      }
    `,
  ],
})
export class TodosPinnedComponent {
  todos = input<Todo[] | null>(null);
}
