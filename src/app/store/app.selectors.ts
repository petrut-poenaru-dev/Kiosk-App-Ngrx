import { AppStateInterface} from "./app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const appFeatureSelector = createFeatureSelector<AppStateInterface>('app');

const getIsOpenProductDetailsModal = (state: AppStateInterface) => state?.isOpenProductDetailsModal ?? false;
const getIsOpenBasketModal = (state: AppStateInterface) => state?.isOpenBasketModal ?? false;
const getIsOpenDeleteBasketProductModal = (state: AppStateInterface) => state?.isOpenDeleteBasketProductModal ?? false;
const getIsOpenCancelOrderModal = (state: AppStateInterface) => state?.isOpenCancelOrderModal ?? false;
const getProductCategory = (state: AppStateInterface) => state?.productCategory ?? '';
const getProductId = (state: AppStateInterface) => state?.productId ?? 0;
const getBasket = (state: AppStateInterface) => state?.basket ?? [];
const getTotalPrice = (state: AppStateInterface) => state?.totalPrice ?? 0;

export const selectIsOpenProductDetailsModal = createSelector(appFeatureSelector, getIsOpenProductDetailsModal);
export const selectIsOpenBasketModal = createSelector(appFeatureSelector, getIsOpenBasketModal);
export const selectIsOpenDeleteBasketProductModal = createSelector(appFeatureSelector, getIsOpenDeleteBasketProductModal);
export const selectIsOpenCancelOrderModal = createSelector(appFeatureSelector, getIsOpenCancelOrderModal);
export const selectProductCategory = createSelector(appFeatureSelector, getProductCategory);
export const selectProductId = createSelector(appFeatureSelector, getProductId);
export const selectBasket = createSelector(appFeatureSelector, getBasket);
export const selectTotalPrice = createSelector(appFeatureSelector, getTotalPrice);
