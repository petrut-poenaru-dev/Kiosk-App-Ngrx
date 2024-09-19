import {Injectable} from "@angular/core";
import {AppService} from "../services/app.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {settingsActions} from "./index";
import {map, switchMap} from "rxjs";
import {Store} from "@ngrx/store";


@Injectable()
export class SettingsEffects{
  constructor(private store:Store ,private _actions$:Actions ,private _appService:AppService ) {
  }

  // public getBundleSettings$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(settingsActions.getBundleSettings),
  //     switchMap(() =>
  //       this._appService.getBundleSettings().pipe(
  //         map(settings => settingsActions.getBundleSettings({ settings })),
  //       )
  //     )
  //   )
  // );
}
