import constructorSlice, {
  addIngredient,
  removeIngredient,
  removeIngredientAll,
} from '../burger-constructor-slice';

describe('Тестирование слайса конструктора constructorSlice', () => {
  test('Вызов с неизвестым экшеном. Должен вернуть начальное состояние', () => {
    const result = constructorSlice(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  test('Проверка добавления булки', () => {
    const bun = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      price: 100,
    };
    const action = { type: addIngredient.type, payload: bun };
    const state = constructorSlice(undefined, action);

    expect(state.bun).toEqual(expect.objectContaining({ name: 'Булка' }));
    expect(state.ingredients).toEqual([]);
  });

  test('Проверка добавления начинки', () => {
    const ingredient = {
      _id: '1',
      name: 'Бекон',
      type: 'main',
      price: 100,
    };
    const action = { type: addIngredient.type, payload: ingredient };
    const state = constructorSlice(undefined, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(expect.objectContaining({ name: 'Бекон' }));
  });

  test('Удаление ингридиента по его id', () => {
    const ingredient = {
      id: 'unique-id-1',
      _id: '6acd6b8163765e9acf0bd9ef',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://norma.ffapi.ru/images/meat-04.png',
      image_mobile: 'https://norma.ffapi.ru/images/meat-04-mobile.png',
      image_large: 'https://norma.ffapi.ru/images/meat-04-large.png',
      __v: 0,
    };
    const initialState = {
      bun: null,
      ingredients: [ingredient],
    };
    const action = { type: removeIngredient.type, payload: 'unique-id-1' };
    const state = constructorSlice(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  test('Очистка конструктора от ингридиентов', () => {
    const initialState = {
      bun: {
        id: '',
        _id: '6acd6b8163765e241c0bd9ec',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://norma.ffapi.ru/images/bun-01.png',
        image_mobile: 'https://norma.ffapi.ru/images/bun-01-mobile.png',
        image_large: 'https://norma.ffapi.ru/images/bun-01-large.png',
        __v: 0,
      },
      ingredients: [
        {
          id: '',
          _id: '6acd6b8163765e82e70bd9ee',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://norma.ffapi.ru/images/meat-02.png',
          image_mobile: 'https://norma.ffapi.ru/images/meat-02-mobile.png',
          image_large: 'https://norma.ffapi.ru/images/meat-02-large.png',
          __v: 0,
        },
        {
          id: '',
          "_id": "6acd6b8163765e40420bd9f4",
            "name": "Соус с шипами Антарианского плоскоходца",
            "type": "sauce",
            "proteins": 101,
            "fat": 99,
            "carbohydrates": 100,
            "calories": 100,
            "price": 88,
            "image": "https://norma.ffapi.ru/images/sauce-01.png",
            "image_mobile": "https://norma.ffapi.ru/images/sauce-01-mobile.png",
            "image_large": "https://norma.ffapi.ru/images/sauce-01-large.png",
            "__v": 0
        },
      ],
    };
    const action = { type: removeIngredientAll.type };
    const state = constructorSlice(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
