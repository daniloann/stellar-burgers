import { test, expect } from '@playwright/test';

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page }) => {
    // Устанавливаем токены для авторизации
    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    await page.context().addCookies([{
      name: 'accessToken',
      value: 'test-access-token',
      domain: 'localhost',
      path: '/'
    }]);
    
    // Настраиваем моки для всех API - БЕЗ method
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
    
    await page.routeFromHAR('./tests/hars/auth.har', {
      url: '**/api/auth/user',
      update: false
    });
    
    // Для POST запросов - method НЕ УКАЗЫВАЕМ
    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/api/orders',
      update: false
    });
    
    // Для GET запросов заказов
    await page.routeFromHAR('./tests/hars/orders.har', {
      url: '**/api/orders*',
      update: false
    });
    
    await page.goto('/');
    await page.waitForSelector('[data-testid="burger-ingredients"]');
    await page.waitForTimeout(500);
  });

  test('Создание заказа с авторизацией', async ({ page }) => {
    const bunId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="ingredient-${bunId}"]`)
      .locator(`[data-testid="link-${bunId}"]`).click();
    
    await expect(page.locator('[data-testid="bun-top"]')).toBeVisible();
    
    const ingredientId = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="ingredient-${ingredientId}"]`)
      .locator('.button').click();
    
    const constructorItems = page.locator('[data-testid="constructor-items"]');
    await expect(constructorItems.locator('li')).toHaveCount(1);
    
    await page.locator('[data-testid="order-button"]').click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    const orderNumber = page.locator('[data-testid="order-number"]');
    await expect(orderNumber).toHaveText('12345');
    
    await expect(page.locator('[data-testid="bun-top-empty"]')).toBeVisible();
    await expect(page.locator('[data-testid="constructor-items-empty"]')).toBeVisible();
    
    await page.locator('[data-testid="close-modal-button"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Перенаправление на логин без авторизации', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
    });
    await page.context().clearCookies();
    
    await page.reload();
    await page.waitForSelector('[data-testid="burger-ingredients"]');
    
    const bunId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="ingredient-${bunId}"]`)
      .locator(`[data-testid="link-${bunId}"]`).click();
    
    const ingredientId = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="ingredient-${ingredientId}"]`)
      .locator('.button').click();
    
    await page.locator('[data-testid="order-button"]').click();
    
    await expect(page).toHaveURL(/\/login/);
  });

  test('Закрытие модалки заказа по оверлею', async ({ page }) => {
    const bunId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="ingredient-${bunId}"]`)
      .locator(`[data-testid="link-${bunId}"]`).click();
    
    const ingredientId = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="ingredient-${ingredientId}"]`)
      .locator('.button').click();
    
    await page.locator('[data-testid="order-button"]').click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    await page.locator('[data-testid="modal-overlay"]').click();
    await expect(modal).not.toBeVisible();
  });
});