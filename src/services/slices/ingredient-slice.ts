import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@utils/burger-api';
import type { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk('ingredients/fetchAll', getIngredientsApi);

type IngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsError: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  ingredientsError: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsError = action.error.message ?? 'Ошибка';
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isIngredientsLoading,
    selectError: (state):string | null  => state.ingredientsError,
    selectIngredientById: (state, id?: string) => state.ingredients.find((item) => item._id === id),
  },
});

export const { selectIngredients, selectIsLoading, selectError, selectIngredientById } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
