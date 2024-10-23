import {createAction, props} from "@ngrx/store";
import {CategoryProductInterface} from "../interfaces/category-product.interface";

export const initApp = createAction('APP init' )
export const openProductDetailsModal = createAction('MODAL open product details modal' , props<{category:string , id:number}>())
export const openBasketModal = createAction('MODAL open basket modal')
export const cancelOrder = createAction('BASKET cancel order ( clear basket )')
export const openCancelOrderModal = createAction('MODAL open cancel order modal')
export const closeCancelOrderModal = createAction('MODAL close cancel order modal')
export const closeAllModals = createAction('MODAL close all modals')
export const openRemoveProductFromBasketModal = createAction('MODAL remove product from basket modal' , props<{productId:number}>())
export const closeRemoveProductFromBasketModal = createAction('MODAL close remove product from basket modal')
export const openActivityModal = createAction('MODAL open activity modal')
export const closeActivityModal = createAction('MODAL close activity modal')
export const addProductToBasket = createAction('BASKET add product to basket' , props<{ product: CategoryProductInterface }>())
export const removeProductFromBasket = createAction('BASKET remove product from basket')
export const increaseProductQuantity = createAction('BASKET increase product quantity' , props<{productId:number , productPrice:number}>())
export const decreaseProductQuantity = createAction('BASKET decrease product quantity' , props<{productId:number , productPrice:number}>())
