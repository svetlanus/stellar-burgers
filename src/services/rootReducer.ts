import { combineSlices } from '@reduxjs/toolkit';
import constructorSlice from './slices/burger-constructor-slice';
import ingredientsSlice from './slices/ingredient-slice';
import orderSlice from './slices/order-slice';
import userReducer from './slices/user-slice';
import feedSlice from './slices/feed-slice';

// настоящий корневой редьюсер
export const rootReducer = combineSlices({
  feed: feedSlice,
  ingredients: ingredientsSlice,
  user: userReducer,
  order: orderSlice,
  constructorBurger: constructorSlice,

});

// export default rootReducer;
