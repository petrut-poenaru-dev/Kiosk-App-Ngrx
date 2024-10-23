import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";
import {createReducer, on} from "@ngrx/store";
import {settingsActions} from "./index";

export const SettingsInitialState: BundleSettingsInterface = {
  languages:[],
  inactivityWarningTimer: 0,
  inactivityCloseTimer: 0,
  closeTimeLeft:0
}

export const settingsReducer = createReducer<BundleSettingsInterface>(
  SettingsInitialState,
  on(settingsActions.getBundleSettingsSuccess, (state , {settings}) => ({
    ...state,
    ...settings
  })),
  on(settingsActions.getTimeLeft , (state) => ({
    ...state,
    closeTimeLeft: (state.inactivityCloseTimer - state.inactivityWarningTimer) / 1000
  }))
)
