import { AppStateInterface} from "./app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const appFeatureSelector = createFeatureSelector<AppStateInterface>('app');

const getShowProductDetailsModal = (state: AppStateInterface) => state?.showProductDetailsModal ?? false;
const getShowBasketModal = (state: AppStateInterface) => state?.showBasketModal ?? false;
const getShowDeleteBasketProductModal = (state: AppStateInterface) => state?.showDeleteBasketProductModal ?? false;
const getShowCancelOrderModal = (state: AppStateInterface) => state?.showCancelOrderModal ?? false;
const getShowActivityModal = (state: AppStateInterface) => state?.showActivityModal ?? false;
const getProductCategory = (state: AppStateInterface) => state?.productCategory ?? '';
const getProductId = (state: AppStateInterface) => state?.productId ?? 0;
const getBasket = (state: AppStateInterface) => state?.basket ?? [];
const getTotalPrice = (state: AppStateInterface) => state?.totalPrice ?? 0;

export const selectShowProductDetailsModal = createSelector(appFeatureSelector, getShowProductDetailsModal);
export const selectShowBasketModal = createSelector(appFeatureSelector, getShowBasketModal);
export const selectShowDeleteBasketProductModal = createSelector(appFeatureSelector, getShowDeleteBasketProductModal);
export const selectShowCancelOrderModal = createSelector(appFeatureSelector, getShowCancelOrderModal);
export const selectShowActivityModal = createSelector(appFeatureSelector, getShowActivityModal);
export const selectProductCategory = createSelector(appFeatureSelector, getProductCategory);
export const selectProductId = createSelector(appFeatureSelector, getProductId);
export const selectBasket = createSelector(appFeatureSelector, getBasket);
export const selectTotalPrice = createSelector(appFeatureSelector, getTotalPrice);
