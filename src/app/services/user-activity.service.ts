import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import {appActions} from "../store/index";

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  constructor(private store: Store) {}

  public initUserActivityListener() {
    fromEvent(document, 'mousemove')
      .pipe(throttleTime(1000))
      .subscribe(() => this.store.dispatch(appActions.userActivity()));

    fromEvent(document, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => this.store.dispatch(appActions.userActivity()));

    fromEvent(document, 'keypress')
      .pipe(throttleTime(1000))
      .subscribe(() => this.store.dispatch(appActions.userActivity()));
  }
}
