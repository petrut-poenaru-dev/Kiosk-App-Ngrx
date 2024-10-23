import {Injectable} from "@angular/core";
import {AppService} from "../services/app.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {settingsActions} from "./index";
import {catchError, map, of, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {appActions} from "../store/index";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable()
export class SettingsEffects {
  constructor(private store: Store, private _actions$: Actions, private _appService: AppService) {
  }

  public onAppInitTriggerGetBundleSettings = createEffect(() =>
    this._actions$.pipe(
      ofType(appActions.initApp),
      switchMap(() => {
        return this._appService.getBundleSettings().pipe(
          map(settings => settingsActions.getBundleSettingsSuccess({settings})),
          catchError((error:HttpErrorResponse) => of(settingsActions.getBundleSettingsFailed({error})))
        )
      })))
}
