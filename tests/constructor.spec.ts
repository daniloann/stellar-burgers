import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Настраиваем моки для ингредиентов
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
    
    // Мок для авторизации (если нужна)
    await page.routeFromHAR('./tests/hars/auth.har', {
      url: '**/api/auth/user',
      update: false
    });
    
    await page.goto('/');
    await page.waitForSelector('[data-testid="burger-ingredients"]');
  });

  test('Добавление булки в конструктор', async ({ page }) => {
    // Находим булку по data-testid
    const bunId = '60d3b41abdacab0026a733c6';
    const bunElement = page.locator(`[data-testid="ingredient-${bunId}"]`);
    const link = bunElement.locator(`[data-testid="link-${bunId}"]`);
    await link.click();
    
    // Проверяем, что булка появилась в конструкторе
    await expect(page.locator('[data-testid="bun-top"]')).toBeVisible();
    await expect(page.locator('[data-testid="bun-bottom"]')).toBeVisible();
    
    // Проверяем счетчик булки (должен быть 2, так как булка считается дважды)
    const counter = bunElement.locator('.counter');
    await expect(counter).toHaveText('2');
  });

  test('Добавление начинки в конструктор', async ({ page }) => {
    // Сначала добавляем булку
    const bunId = '60d3b41abdacab0026a733c6';
    const bunElement = page.locator(`[data-testid="ingredient-${bunId}"]`);
    await bunElement.locator(`[data-testid="link-${bunId}"]`).click();
    
    // Добавляем начинку через кнопку "Добавить"
    const ingredientId = '60d3b41abdacab0026a733c8';
    const ingredientElement = page.locator(`[data-testid="ingredient-${ingredientId}"]`);
    const addButton = ingredientElement.locator('.button');
    await addButton.click();
    
    // Проверяем, что начинка появилась в списке
    const constructorItems = page.locator('[data-testid="constructor-items"]');
    await expect(constructorItems.locator('li')).toHaveCount(1);
    
    // Проверяем счетчик начинки
    const counter = ingredientElement.locator('.counter');
    await expect(counter).toHaveText('1');
  });

  test('Добавление нескольких начинок в конструктор', async ({ page }) => {
    // Добавляем булку
    const bunId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="ingredient-${bunId}"]`)
      .locator(`[data-testid="link-${bunId}"]`).click();
    
    // Добавляем первую начинку
    const ingredientId1 = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="ingredient-${ingredientId1}"]`)
      .locator('.button').click();
    
    // Добавляем вторую начинку
    const ingredientId2 = '60d3b41abdacab0026a733ca';
    await page.locator(`[data-testid="ingredient-${ingredientId2}"]`)
      .locator('.button').click();
    
    // Проверяем, что обе начинки появились в списке
    const constructorItems = page.locator('[data-testid="constructor-items"]');
    await expect(constructorItems.locator('li')).toHaveCount(2);
    
    // Проверяем счетчики
    await expect(page.locator(`[data-testid="ingredient-${ingredientId1}"] .counter`))
      .toHaveText('1');
    await expect(page.locator(`[data-testid="ingredient-${ingredientId2}"] .counter`))
      .toHaveText('1');
  });

  test('Кнопка заказа отключена без булки', async ({ page }) => {
    // Проверяем, что кнопка заказа отключена без булки
    const orderButton = page.locator('[data-testid="order-button"]');
    await expect(orderButton).toBeDisabled();
    
    // Добавляем только начинку (без булки)
    const ingredientId = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="ingredient-${ingredientId}"]`)
      .locator('.button').click();
    
    // Кнопка все еще должна быть отключена
    await expect(orderButton).toBeDisabled();
  });

  test('Кнопка заказа включена с булкой и начинкой', async ({ page }) => {
    // Добавляем булку
    const bunId = '60d3b41abdacab0026a733c6';
    await page.locator(`[data-testid="ingredient-${bunId}"]`)
      .locator(`[data-testid="link-${bunId}"]`).click();
    
    // Добавляем начинку
    const ingredientId = '60d3b41abdacab0026a733c8';
    await page.locator(`[data-testid="ingredient-${ingredientId}"]`)
      .locator('.button').click();
    
    // Кнопка должна быть включена
    const orderButton = page.locator('[data-testid="order-button"]');
    await expect(orderButton).toBeEnabled();
  });
});