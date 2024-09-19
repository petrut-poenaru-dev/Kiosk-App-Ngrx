import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";
import {createReducer, on} from "@ngrx/store";
import {settingsActions} from "./index";

export const SettingsInitialState: BundleSettingsInterface = {
  languages:[],
  inactivityWarningTimer: 0,
  inactivityCloseTimer: 0
}

export const settingsReducer = createReducer<BundleSettingsInterface>(
  SettingsInitialState,
  on(settingsActions.getBundleSettings, (state , {settings}) => ({
    ...state,
    ...settings
  })),
)
