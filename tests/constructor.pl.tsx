import { test, expect } from '@playwright/test';

test.describe('add ingredients to constructor works correctly', function () {
  test('Добавление ингредиента из списка ингредиентов в конструктор (булка)', async ({
    page,
  }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('/');

    const bunCard = page.locator('li').filter({ hasText: 'Флюоресцентная булка R2-D3' });
    await bunCard.getByRole('button').click();

    const emptyBunText = page.getByText('Выберите булки').first();
    await expect(emptyBunText).toBeHidden(); //надпись исчезла при выборе булки

    await expect(bunCard.locator('.counter')).toHaveText('2');
    const constructor = page.getByTestId('burger-constructor');

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (верх)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Флюоресцентная булка R2-D3 (низ)')
    ).toBeVisible();
  });

  test('Добавление ингредиента из списка ингредиентов в конструктор (начинка)', async ({
    page,
  }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('/');

    const emptyFillingText = page.getByText('Выберите начинку');
    await expect(emptyFillingText).toBeVisible(); //надпись видна

    const fillingCard = page
      .locator('li')
      .filter({ hasText: 'Говяжий метеорит (отбивная)' });

    await fillingCard.getByRole('button').click();

    await expect(emptyFillingText).toBeHidden(); //надпись исчезла при выборе начинки

    await expect(fillingCard.locator('.counter')).toHaveText('1');
    const constructor = page.getByTestId('burger-constructor');

    await expect(constructor.getByText('Говяжий метеорит (отбивная)')).toBeVisible();
  });

  test('Работа модального окна ингридиента', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('/');

    await page.getByText('Флюоресцентная булка R2-D3').click();

    const modal = page.getByText('Детали ингредиента');
    await expect(modal).toBeVisible(); //открытие модального окна

    await expect(
      page.locator('#modals').getByText('Флюоресцентная булка R2-D3', { exact: true })
    ).toBeVisible(); //имено данный ингридиент в модальном окне

    await page.getByLabel('Закрыть').click();

    await expect(modal).toBeHidden(); //закрытие модального окна
  });

  test('Тестирование создания заказа', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false,
    });
    await page.routeFromHAR('tests/hars/orders.har', {
      url: '**/api/orders',
      update: false,
    });

    //токен авторизации
    await page.addInitScript(() => {
      document.cookie = 'accessToken=mock-token; path=/';
    });
    await page.goto('/');

    await page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button')
      .click();
    await page
      .locator('li')
      .filter({ hasText: 'Биокотлета' })
      .getByRole('button')
      .click();
    const constructor = page.getByTestId('burger-constructor');
    await expect(constructor.getByText('Краторная булка N-200i (верх)')).toBeVisible();

    await expect(constructor.getByText('Краторная булка N-200i (низ)')).toBeVisible();

    await expect(constructor.getByText('Биокотлета')).toBeVisible();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.locator('#modals');

    await expect(modal.getByText('Ваш заказ начали готовить')).toBeVisible();
    await expect(modal.getByText('12345', { exact: true })).toBeVisible();

    await page.getByLabel('Закрыть').click();
    await expect(modal.getByText('Ваш заказ начали готовить')).toBeHidden();
    await expect(constructor.getByText('Краторная булка N-200i (верх)')).toBeHidden();
    await expect(constructor.getByText('Краторная булка N-200i (низ)')).toBeHidden();
    await expect(constructor.getByText('Биокотлета')).toBeHidden();

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(constructor.getByText('Выберите начинку')).toBeVisible();
  });
});
