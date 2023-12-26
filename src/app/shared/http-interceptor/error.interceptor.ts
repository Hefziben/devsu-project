import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Error } from '../../models/error.model';
import { ErrorService } from '../../services/error/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor( private errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 200) {
          throw response.error;
        } else {
          const data: Error = {
            reason:  typeof response.error === 'string' ? response.error : response.statusText ? response.statusText : 'Error Desconocido',
            status: response.status
        };
        this.errorService.setErrorMessage(data.reason)
          throw response;
        }
      })
    );
  }

}
