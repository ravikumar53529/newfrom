import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JsoninterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token:string='1234-sdw21332-dss21e3';
    const reqWithAuth=request.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`,

    }
    })
    return next.handle(reqWithAuth);
  }
}
