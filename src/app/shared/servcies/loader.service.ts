import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSub$: Subject<boolean> = new Subject<boolean>();
  loaderObs = this.loaderSub$.asObservable();
  constructor() {}

  loadersatus(flag: boolean) {
    return this.loaderSub$.next(flag);
  }
}
