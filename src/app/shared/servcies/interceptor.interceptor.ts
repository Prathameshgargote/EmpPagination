import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private _loaderservice: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._loaderservice.loadersatus(true);
    let req = request.clone({
      setHeaders:{
        auth:'authication',
        token:'barew form Ls'
      }
    });

    

    return next.handle(req).pipe(
      finalize(() => {
        this._loaderservice.loadersatus(false);
      })
    );
  }
}
