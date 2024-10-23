import {createAction, props} from "@ngrx/store";
import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";
import {HttpErrorResponse} from "@angular/common/http";

export const getBundleSettings = createAction('SETTINGS - get bundle settings');
export const getBundleSettingsSuccess = createAction('SETTINGS - get bundle settings success', props<{settings:BundleSettingsInterface}>());
export const getBundleSettingsFailed = createAction('SETTINGS - get bundle settings failed', props<{error:HttpErrorResponse}>());
export const getTimeLeft = createAction('SETTINGS - get time left')
