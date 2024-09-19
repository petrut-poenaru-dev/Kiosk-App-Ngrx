
import { createFeatureSelector, createSelector } from "@ngrx/store";
import {BundleSettingsInterface} from "../interfaces/bundle-settings.interface";

export const settingsFeatureSelector = createFeatureSelector<BundleSettingsInterface>('settings');

const getLanguage = (state: BundleSettingsInterface) => state?.languages ?? [];
const getInactivityWarningTimer = (state: BundleSettingsInterface) => state?.inactivityWarningTimer ?? 0;
const getInactivityCloseTimer = (state: BundleSettingsInterface) => state?.inactivityCloseTimer ?? 0;

export const selectLanguage = createSelector(settingsFeatureSelector , getLanguage)
export const selectInactivityWarningTimer = createSelector(settingsFeatureSelector , getInactivityWarningTimer)
export const selectInactivityCloseTimer = createSelector(settingsFeatureSelector , getInactivityCloseTimer)

