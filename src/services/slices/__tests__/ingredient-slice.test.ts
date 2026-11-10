import ingredientsReducer, { fetchIngredients } from '../ingredient-slice';

describe('Тестирование слайса (массива) ингредиентов ingredientsSlice', () => {
  test('Вызов с неизвестым экшеном. Должен вернуть начальное состояние', () => {
    const result = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({
      ingredients: [],
      isIngredientsLoading: false,
      ingredientsError: null,
    });
  });

  test('Обработка асинхронного экшена fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);

    expect(state.isIngredientsLoading).toBe(true);
    expect(state.ingredientsError).toBeNull();
  });

  test('Обработка асинхронного экшена fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Булка', type: 'bun', price: 100 },
      { _id: '2', name: '<Бекон>', type: 'main', price: 200 },
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsReducer(undefined, action);

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('Обработка асинхронного экшена fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: 'Ошибка' };
    const state = ingredientsReducer(undefined, action);

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredientsError).toBe('Ошибка');
  });
});
