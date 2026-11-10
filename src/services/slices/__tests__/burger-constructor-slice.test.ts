import constructorSlice, {
  addIngredient,
  removeIngredient,
  removeIngredientAll,
  moveIngredient,
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

  test.each([
    {
      direction: 'up' as const,
      expectedOrder: [
        'Соус с шипами Антарианского плоскоходца',
        'Мясо бессмертных моллюсков Protostomia',
        'Биокотлета из марсианской Магнолии',
      ],
    },
    {
      direction: 'down' as const,
      expectedOrder: [
        'Мясо бессмертных моллюсков Protostomia',
        'Биокотлета из марсианской Магнолии',
        'Соус с шипами Антарианского плоскоходца',
      ],
    },
  ])('Перемещение ингредиента $direction', ({ direction, expectedOrder }) => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          id: '1',
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
          id: '2',
          _id: '6acd6b8163765e40420bd9f4',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://norma.ffapi.ru/images/sauce-01.png',
          image_mobile: 'https://norma.ffapi.ru/images/sauce-01-mobile.png',
          image_large: 'https://norma.ffapi.ru/images/sauce-01-large.png',
          __v: 0,
        },
        {
          id: '3',
          _id: '6acd6b8163765e96530bd9f0',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://norma.ffapi.ru/images/meat-01.png',
          image_mobile: 'https://norma.ffapi.ru/images/meat-01-mobile.png',
          image_large: 'https://norma.ffapi.ru/images/meat-01-large.png',
          __v: 0,
        },
      ],
    };

    const action = moveIngredient({
      id: '2',
      direction,
    });

    const state = constructorSlice(initialState, action);

    expect(state.ingredients.map((item) => item.name)).toEqual(expectedOrder);
  });

  test('Нельзя переместить последний ингредиент вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          id: '1',
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
          id: '2',
          _id: '6acd6b8163765e40420bd9f4',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://norma.ffapi.ru/images/sauce-01.png',
          image_mobile: 'https://norma.ffapi.ru/images/sauce-01-mobile.png',
          image_large: 'https://norma.ffapi.ru/images/sauce-01-large.png',
          __v: 0,
        },
      ],
    };

    const action = moveIngredient({
      id: '2',
      direction: 'down',
    });

    const state = constructorSlice(initialState, action);

    expect(state.ingredients.map((item) => item.name)).toEqual([
      'Мясо бессмертных моллюсков Protostomia',
      'Соус с шипами Антарианского плоскоходца',
    ]);
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
          _id: '6acd6b8163765e40420bd9f4',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://norma.ffapi.ru/images/sauce-01.png',
          image_mobile: 'https://norma.ffapi.ru/images/sauce-01-mobile.png',
          image_large: 'https://norma.ffapi.ru/images/sauce-01-large.png',
          __v: 0,
        },
      ],
    };
    const action = { type: removeIngredientAll.type };
    const state = constructorSlice(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
