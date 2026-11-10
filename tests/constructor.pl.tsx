import { test, expect } from '@playwright/test';

test.describe('add ingredients to constructor works correctly', function () {
  test('Добавление ингредиента из списка ингредиентов в конструктор (булка)', async ({
    page,
  }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('http://localhost:4000');

    const bunCard = page.locator('li').filter({ hasText: 'Флюоресцентная булка R2-D3' });
    await bunCard.getByRole('button').click();

    const emptyBunText = page.getByText('Выберите булки').first();
    await expect(emptyBunText).toBeHidden(); //надпись исчезла при выборе булки

    await expect(bunCard.locator('.counter')).toHaveText('2');
  });

  test('Добавление ингредиента из списка ингредиентов в конструктор (начинка)', async ({
    page,
  }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('http://localhost:4000');

    const fillingCard = page
      .locator('li')
      .filter({ hasText: 'Говяжий метеорит (отбивная)' });
    await fillingCard.getByRole('button').click();

    const emptyFillingText = page.getByText('Выберите начинку').first();
    await expect(emptyFillingText).toBeHidden(); //надпись исчезла при выборе начинки

    await expect(fillingCard.locator('.counter')).toHaveText('1');
  });

  test('Работа модального окна ингридиента', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('http://localhost:4000');

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
    await page.goto('http://localhost:4000');

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

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.getByText('Ваш заказ начали готовить');
    await expect(modal).toBeVisible();

    await expect(page.getByText('12345')).toBeVisible();

    await page.getByLabel('Закрыть').click();
    await expect(modal).toBeHidden();

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
  });
});
