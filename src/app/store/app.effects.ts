import {Injectable} from "@angular/core";
import {AppService} from "../services/app.service";
import {Store} from "@ngrx/store";
import {appActions, appSelectors, StoreStateInterface} from "./index";
import {Router} from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {filter, map, switchMap, takeUntil, tap, timer, withLatestFrom} from "rxjs";
import {settingsSelectors} from "../settings/index";

@Injectable()
export class AppEffects{
  constructor(private _appService:AppService , private _store: Store<StoreStateInterface> , private _router:Router , private _actions$: Actions ) {
  }

  public onInitAppStartInactivityModalTimer = createEffect(() =>
    this._actions$.pipe(
      ofType(appActions.initApp, appActions.userActivity , appActions.closeActivityModal),
      withLatestFrom(this._store.select(settingsSelectors.selectInactivityWarningTimer)),
      switchMap(([action, inactivityTime]) =>
        timer(inactivityTime).pipe(
          filter(() =>
            this._router.url !== '/language' && this._router.url !== '/payment'
          ),
          map(() => appActions.openActivityModal()),
          takeUntil(
            this._actions$.pipe(
              ofType(appActions.userActivity)
            )
          )
        )
      )
    )
  );

}
