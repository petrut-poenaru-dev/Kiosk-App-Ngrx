import {CategoryProductInterface} from "../interfaces/category-product.interface";
import {createReducer, on} from "@ngrx/store";
import {appActions} from "./index";

export interface AppStateInterface {
  isOpenProductDetailsModal: boolean,
  isOpenBasketModal: boolean,
  isOpenCancelOrderModal: boolean,
  isOpenDeleteBasketProductModal: boolean,
  productCategory: string,
  productId: number,
  basket: Array<CategoryProductInterface>,
  totalPrice: number,
}

export const AppInitialState: AppStateInterface = {
  isOpenProductDetailsModal: false,
  isOpenBasketModal: false,
  isOpenCancelOrderModal: false,
  isOpenDeleteBasketProductModal: false,
  productCategory: '',
  productId: 0,
  totalPrice: 0,
  basket: []
}
export const appReducer = createReducer<AppStateInterface>(
  AppInitialState,
  on(appActions.initApp, state => ({
    ...state,
  })),
  on(appActions.closeAllModals, state => ({
    ...state,
    isOpenProductDetailsModal: false,
    isOpenBasketModal: false,
    isOpenCancelOrderModal: false,
    isOpenDeleteBasketProductModal: false,
    productId: 0,
    productCategory: ''
  })),
  on(appActions.openProductDetailsModal, (state, action) => ({
    ...state,
    isOpenProductDetailsModal: true,
    productCategory: action.category,
    productId: action.id,
  })),
  on(appActions.openBasketModal, state => ({
    ...state,
    isOpenBasketModal: true,
  })),
  on(appActions.cancelOrder, state => ({
    ...state,
    basket: [],
    isOpenCancelOrderModal:false,
    totalPrice:0
  })),
  on(appActions.openCancelOrderModal, state => ({
    ...state,
    isOpenBasketModal: false,
    isOpenCancelOrderModal: true,
  })),
  on(appActions.openRemoveProductFromBasketModal, (state, {productId}) => ({
    ...state,
    productId: productId,
    isOpenBasketModal: false,
    isOpenDeleteBasketProductModal: true,
  })),
  on(appActions.closeRemoveProductFromBasketModal, state =>{
    return {
      ...state,
      isOpenDeleteBasketProductModal:false,
      isOpenBasketModal:true,
    }
  }),
  on(appActions.closeCancelOrderModal, state =>{
    return {
      ...state,
      isOpenCancelOrderModal:false,
      isOpenBasketModal:true,
    }
  }),
  on(appActions.removeProductFromBasket, (state) => {
    const foundElem = state.basket.find((basketProduct: CategoryProductInterface) => basketProduct.id === state.productId);
    if(foundElem){
      return{
        ...state,
        basket: state.basket.filter(product => product.id !== state.productId),
        isOpenBasketModal: true,
        isOpenDeleteBasketProductModal: false,
        totalPrice:state.totalPrice - (foundElem.price * foundElem.quantity)
      }
    }
    else{
      return {
        ...state,
        isOpenBasketModal: true,
        isOpenDeleteBasketProductModal: false,
      }
    }
  }),
  on(appActions.addProductToBasket, (state, {product}) => {
    const foundElem = state.basket.find((basketProduct: CategoryProductInterface) => basketProduct.id === product.id);

    if (foundElem) {
      return {
        ...state,
        basket: state.basket.map(p =>
          p.id === product.id ? {...p, quantity: p.quantity + 1} : p
        ),
        totalPrice: state.totalPrice + product.price,
        isOpenProductDetailsModal: false,
      };
    } else {
      return {
        ...state,
        basket: [...state.basket, {...product, quantity: 1}],
        totalPrice: state.totalPrice + product.price,
        isOpenProductDetailsModal: false,
      };
    }
  }),
  on(appActions.increaseProductQuantity, (state, {productId, productPrice}) => {
    return {
      ...state,
      basket: state.basket.map(p =>
        p.id === productId ? {...p, quantity: p.quantity + 1} : p
      ),
      totalPrice: state.totalPrice + productPrice
    }
  }),
  on(appActions.decreaseProductQuantity, (state, {productId, productPrice}) => {
    return {
      ...state,
      basket: state.basket.map(p =>
        p.id === productId ? {...p, quantity: p.quantity - 1} : p
      ),
      totalPrice: state.totalPrice - productPrice
    }
  })
)
