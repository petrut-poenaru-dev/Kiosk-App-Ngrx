import {createAction, props} from "@ngrx/store";
import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";

export const getBundleSettings = createAction('SETTINGS - get bundle settings success', props<{settings:BundleSettingsInterface}>());
