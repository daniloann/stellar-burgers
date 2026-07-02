import { test, expect } from '@playwright/test';

// Моковые данные для ингредиентов
const mockIngredients = {
  success: true,
  data: [
    {
      _id: '60d3b41abdacab0026a733c6',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 20,
      carbohydrates: 100,
      calories: 420,
      price: 125,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    },
    {
      _id: '60d3b41abdacab0026a733d0',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    },
    {
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    },
    {
      _id: '60d3b41abdacab0026a733ca',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    },
  ],
};

const mockOrderResponse = {
  success: true,
  order: {
    _id: '66a8e6d5f3b4c5d6e7f8g9h0',
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 12345,
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8', '60d3b41abdacab0026a733ca'],
  },
  name: 'Флюоресцентный бургер',
};

// Мок пользователя
const mockUser = {
  success: true,
  user: {
    email: 'test@test.com',
    name: 'Test User',
  },
};

const mockTokens = {
  accessToken: 'Bearer mock-access-token',
  refreshToken: 'mock-refresh-token',
};

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page, context }) => {
    // 1. Перехват запроса на ингредиенты
    await page.route('**/api/ingredients', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockIngredients),
      });
    });

    // 2. Перехват запроса на получение пользователя (авторизация)
    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUser),
      });
    });

    // 3. Перехват запроса на создание заказа
    await page.route('**/api/orders', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockOrderResponse),
        });
      } else {
        await route.continue();
      }
    });

    // 4. Установка токенов для авторизации
    await context.addCookies([
      {
        name: 'accessToken',
        value: mockTokens.accessToken,
        path: '/',
        domain: 'localhost',
      },
    ]);

    await page.addInitScript((tokens) => {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }, mockTokens);

    // 5. Переход на страницу
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('[data-testid="ingredient-60d3b41abdacab0026a733c6"]', { 
      timeout: 15000 
    });
    await page.waitForTimeout(1000);
  });

  test('проверка заголовка страницы', async ({ page }) => {
    const title = await page.locator('h1').first().textContent();
    expect(title).toContain('Соберите бургер');
  });

  test('проверка наличия ингредиентов', async ({ page }) => {
    const ingredients = page.locator('[data-testid^="ingredient-"]');
    await expect(ingredients).toHaveCount(4);
  });

  test('должен добавить булку в конструктор', async ({ page }) => {
    const bun = page.locator('[data-testid="ingredient-60d3b41abdacab0026a733c6"]');
    await expect(bun).toBeVisible();
    const addButton = bun.locator('button:has-text("Добавить")');
    await addButton.click({ force: true });
    await page.waitForSelector('[data-testid="bun-top"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="bun-top"]')).toBeVisible();
    await expect(page.locator('[data-testid="bun-top"]')).toContainText('Краторная булка');
    await expect(page.locator('[data-testid="bun-bottom"]')).toBeVisible();
  });

  test('должен добавить начинку в конструктор', async ({ page }) => {
    const main = page.locator('[data-testid="ingredient-60d3b41abdacab0026a733c8"]');
    await expect(main).toBeVisible();
    const addButton = main.locator('button:has-text("Добавить")');
    await addButton.click({ force: true });
    await expect(page.locator('[data-testid="constructor-items"]')).toContainText('Филе Люминесцентного');
  });

  test('должен открыть модальное окно ингредиента', async ({ page }) => {
    await page.locator('[data-testid="ingredient-60d3b41abdacab0026a733c6"]').click({ force: true });
    await page.waitForSelector('[data-testid="modal"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal"]')).toContainText('Краторная булка');
  });

  test('должен закрыть модальное окно по крестику', async ({ page }) => {
    await page.locator('[data-testid="ingredient-60d3b41abdacab0026a733c6"]').click({ force: true });
    await page.waitForSelector('[data-testid="modal"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await page.locator('[data-testid="close-modal-button"]').click({ force: true });
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible({ timeout: 5000 });
  });

  test('должен создать заказ', async ({ page }) => {
    // 1. Добавить булку
    const bunAddButton = page.locator('[data-testid="ingredient-60d3b41abdacab0026a733c6"] button:has-text("Добавить")');
    await bunAddButton.click({ force: true });
    await page.waitForTimeout(1000);
    
    // 2. Проверить что булка добавилась
    const bunTop = page.locator('[data-testid="bun-top"]');
    await expect(bunTop).toBeVisible({ timeout: 5000 });
    await expect(bunTop).toContainText('Краторная булка');
    
    // 3. Добавить начинку
    const mainAddButton = page.locator('[data-testid="ingredient-60d3b41abdacab0026a733c8"] button:has-text("Добавить")');
    await mainAddButton.click({ force: true });
    await page.waitForTimeout(1000);
    
    // 4. Проверить что начинка добавилась
    await expect(page.locator('[data-testid="constructor-items"]')).toContainText('Филе Люминесцентного');
    
    // 5. Проверить что кнопка "Оформить заказ" стала активной
    const orderButton = page.locator('[data-testid="order-button"]');
    await expect(orderButton).toBeEnabled({ timeout: 5000 });
    
    // 6. Кликнуть "Оформить заказ"
    await orderButton.click({ force: true });
    await page.waitForTimeout(2000);
    
    // 7. Проверить модальное окно с заказом
    await page.waitForSelector('[data-testid="modal"]', { timeout: 15000 });
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    
    // 8. Проверить номер заказа
    await page.waitForSelector('[data-testid="order-number"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-number"]')).toHaveText('12345');
    
    // 9. Проверить что конструктор пуст
    await expect(page.locator('[data-testid="bun-top-empty"]')).toBeVisible();
    await expect(page.locator('[data-testid="bun-bottom-empty"]')).toBeVisible();
    await expect(page.locator('[data-testid="constructor-items-empty"]')).toBeVisible();
    
    // 10. Закрыть модальное окно
    await page.locator('[data-testid="close-modal-button"]').click({ force: true });
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible({ timeout: 5000 });
  });
});