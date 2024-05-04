import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoQuickAddComponent } from './todo-quick-add.component';

describe('TodoQuickAddComponent', () => {
  let component: TodoQuickAddComponent;
  let fixture: ComponentFixture<TodoQuickAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoQuickAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoQuickAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
