import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private isVisibleSubject = new Subject<boolean>();
  private errorMessageSubject = new Subject<string>();


  isVisible$ = this.isVisibleSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();

  hideModal(): void {
    this.isVisibleSubject.next(false);
  }

  getErrorVisibility(): Observable<boolean> {
    return this.isVisibleSubject.asObservable();
  }

  setErrorMessage(message: string) {
    this.isVisibleSubject.next(true);
    this.errorMessageSubject.next(message);
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessageSubject.asObservable();
  }
}
