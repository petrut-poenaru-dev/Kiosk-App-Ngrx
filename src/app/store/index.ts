import * as appActions from './app.actions';
import * as appSelectors from './app.selectors';
import {appReducer, AppStateInterface} from "./app.reducer";
import {Features} from "./features";
import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";
import {settingsReducer} from "../settings/settings.reducer";
import {SettingsEffects} from "../settings/settings.effects";

export { appActions , appSelectors };

export interface StoreStateInterface {
  [Features.app]: AppStateInterface;
  [Features.settings]: BundleSettingsInterface;
}

export const reducers = {
  [Features.app]: appReducer,
  [Features.settings]: settingsReducer,
};

export const effects = [SettingsEffects];
