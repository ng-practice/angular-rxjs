import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// task1()
//task2();
task3();

function task1() {
  const stream$ = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.error('Oh mein Gott!');
    observer.complete();
  });

  stream$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.warn(err),
    complete: () => console.log('FERTSCH! 😎'),
  });
}

function task2() {
  const stream$ = new Observable((observer) => {
    let counter = 0;
    const interval = setInterval(() => observer.next(++counter), 1000);

    return () => clearInterval(interval);
  });

  const subscription = stream$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.warn(err),
    complete: () => console.log('FERTSCH! 😎'),
  });

  setTimeout(() => subscription.unsubscribe(), 5000);
}

function task3() {
  const stream$ = timer(3000, 1000);
  stream$.pipe(takeUntil(timer(5000))).subscribe((count) => console.log(count));
}
