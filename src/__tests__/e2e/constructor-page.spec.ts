import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page, context }) => {
    // 1. Установка фейковых токенов для авторизации
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer mock-token',
        path: '/',
        domain: 'localhost',
      },
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    // 2. Перехват запросов через HAR файлы
    await page.routeFromHAR(path.join(__dirname, 'hars/ingredients.har'), {
      url: '**/api/ingredients',
      update: false,
    });

    await page.routeFromHAR(path.join(__dirname, 'hars/user.har'), {
      url: '**/api/auth/user',
      update: false,
    });

    await page.routeFromHAR(path.join(__dirname, 'hars/orders.har'), {
      url: '**/api/orders',
      update: false,
    });

    // 3. Переход на страницу
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('domcontentloaded');
    
    // 4. Ждем загрузки ингредиентов
    await page.waitForSelector('[data-testid="ingredient-60d3b41abdacab0026a733c6"]', {
      timeout: 15000,
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
    const bunAddButton = page.locator(
      '[data-testid="ingredient-60d3b41abdacab0026a733c6"] button:has-text("Добавить")'
    );
    await bunAddButton.click({ force: true });
    await page.waitForTimeout(1000);

    // 2. Проверить что булка добавилась
    const bunTop = page.locator('[data-testid="bun-top"]');
    await expect(bunTop).toBeVisible({ timeout: 5000 });
    await expect(bunTop).toContainText('Краторная булка');

    // 3. Добавить начинку
    const mainAddButton = page.locator(
      '[data-testid="ingredient-60d3b41abdacab0026a733c8"] button:has-text("Добавить")'
    );
    await mainAddButton.click({ force: true });
    await page.waitForTimeout(1000);

    // 4. Проверить что начинка добавилась
    await expect(page.locator('[data-testid="constructor-items"]')).toContainText(
      'Филе Люминесцентного'
    );

    // 5. Проверить что кнопка "Оформить заказ" стала активной
    const orderButton = page.locator('[data-testid="order-button"]');
    await expect(orderButton).toBeEnabled({ timeout: 5000 });

    // 6. Кликнуть "Оформить заказ"
    await orderButton.click({ force: true });
    await page.waitForTimeout(3000);

    // 7. Проверить URL (не должно быть редиректа на логин)
    const currentUrl = page.url();
    console.log('Текущий URL:', currentUrl);
    expect(currentUrl).not.toContain('login');

    // 8. Проверить модальное окно с заказом
    await page.waitForSelector('[data-testid="modal"]', { timeout: 20000 });
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // 9. Проверить номер заказа
    await page.waitForSelector('[data-testid="order-number"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-number"]')).toHaveText('12345');

    // 10. Проверить что конструктор пуст
    await expect(page.locator('[data-testid="bun-top-empty"]')).toBeVisible();
    await expect(page.locator('[data-testid="bun-bottom-empty"]')).toBeVisible();
    await expect(page.locator('[data-testid="constructor-items-empty"]')).toBeVisible();

    // 11. Закрыть модальное окно
    await page.locator('[data-testid="close-modal-button"]').click({ force: true });
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible({ timeout: 5000 });
  });
});