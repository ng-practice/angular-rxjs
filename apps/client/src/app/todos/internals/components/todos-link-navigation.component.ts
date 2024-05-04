import { Component } from '@angular/core';

@Component({
  selector: 'app-todos-link-navigation',
  standalone: true,
  template: `
    <ul class="todo__link-navigation">
      <li class="todo__link-navigation__link">
        <a routerLink="../all" routerLinkActive="todo__link--active">All</a>
      </li>
      <li class="todo__link-navigation__link">
        <a routerLink="../active" routerLinkActive="todo__link--active"
          >Active</a
        >
      </li>
      <li class="todo__link-navigation__link">
        <a routerLink="../complete" routerLinkActive="todo__link--active"
          >Complete</a
        >
      </li>
    </ul>
  `,
})
export class TodosLinkNavigationComponent {}
