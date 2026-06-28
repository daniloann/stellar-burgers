import { test, expect } from '@playwright/test';

test.describe('Модальные окна', () => {
  test.beforeEach(async ({ page }) => {
    // Мок для ингредиентов
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
    
    await page.goto('/');
    await page.waitForSelector('[data-testid="burger-ingredients"]');
  });

  test('Открытие модалки ингредиента по клику', async ({ page }) => {
    const ingredientId = '60d3b41abdacab0026a733c6';
    const ingredientLink = page.locator(`[data-testid="link-${ingredientId}"]`);
    await ingredientLink.click();
    
    // Проверяем, что модалка открылась
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    // Проверяем, что в модалке отображаются правильные данные
    await expect(modal.locator('h3')).toContainText('Краторная булка N-200i');
    
    // Проверяем наличие nutritional values
    await expect(modal.locator('.text_type_digits-default')).toHaveCount(4);
  });

  test('Закрытие модалки по клику на крестик', async ({ page }) => {
    const ingredientId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="link-${ingredientId}"]`).click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    // Закрываем по крестику
    await page.locator('[data-testid="close-modal-button"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Закрытие модалки по клику на оверлей', async ({ page }) => {
    const ingredientId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="link-${ingredientId}"]`).click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    // Кликаем по оверлею
    await page.locator('[data-testid="modal-overlay"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Закрытие модалки по клавише ESC', async ({ page }) => {
    const ingredientId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="link-${ingredientId}"]`).click();
    
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    // Нажимаем ESC
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Открытие модалки с разными ингредиентами', async ({ page }) => {
    // Открываем первый ингредиент
    const ingredientId1 = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="link-${ingredientId1}"]`).click();
    
    let modal = page.locator('[data-testid="modal"]');
    await expect(modal.locator('h3')).toContainText('Краторная булка N-200i');
    
    // Закрываем
    await page.locator('[data-testid="close-modal-button"]').click();
    await expect(modal).not.toBeVisible();
    
    // Открываем второй ингредиент
    const ingredientId2 = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="link-${ingredientId2}"]`).click();
    
    modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator('h3')).toContainText('Филе Люминесцентного тетраодонтимформа');
  });
});