import {Injectable} from "@angular/core";
import {AppService} from "../services/app.service";
import {Store} from "@ngrx/store";
import {StoreStateInterface} from "./index";
import {Router} from "@angular/router";
import {Actions} from "@ngrx/effects";

@Injectable()
export class AppEffects{
  constructor(private _appService:AppService , private _store: Store<StoreStateInterface> , private _router:Router , private _actions$: Actions ) {
  }
}
