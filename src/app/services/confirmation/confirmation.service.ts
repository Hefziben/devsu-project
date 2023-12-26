// confirmation-dialog.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ConfirmationDialog } from '../../models/confirmation.model';
import { ConfirmationDialogResult } from '../../models/confirmation-result';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private isVisibleSubject = new Subject<boolean>();
  private configurationSubject = new Subject<ConfirmationDialog>();
  private confirmationSubject = new Subject<ConfirmationDialogResult>();
  private cancellationSubject = new Subject<ConfirmationDialogResult>();

  isVisible$ = this.isVisibleSubject.asObservable();
  configuration$ = this.configurationSubject.asObservable();

  showConfirmationDialog(config: ConfirmationDialog): Observable<ConfirmationDialogResult> {
    this.isVisibleSubject.next(true);
    this.configurationSubject.next(config);
    return new Observable<ConfirmationDialogResult>(observer => {
      const handleConfirmation = () => {
        observer.next({ isConfirmed: true });
        observer.complete();
      };

      const handleCancellation = () => {
        observer.next({ isConfirmed: false, isDismissed: false });
        observer.complete();
      };

      observer.next({ isConfirmed: false, isDismissed: false });

      const confirmationSubscription = this.confirmationSubject.subscribe(handleConfirmation);
      const cancellationSubscription = this.cancellationSubject.subscribe(handleCancellation);

      return () => {
        confirmationSubscription.unsubscribe();
        cancellationSubscription.unsubscribe();
      };
    });
  }

  confirm(): void {
    this.confirmationSubject.next({ isConfirmed: true, isDismissed: true });
    this.isVisibleSubject.next(false);
  }

  cancel(): void {
    this.cancellationSubject.next({ isConfirmed: false, isDismissed: true });
    this.isVisibleSubject.next(false);
  }
}
