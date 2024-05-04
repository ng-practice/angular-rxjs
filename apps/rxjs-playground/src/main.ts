import { Observable } from 'rxjs';

const stream$ = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
  observer.complete();
});

stream$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Fertig! 😎'),
});
