import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Перехватываем запросы к API
    await page.routeFromHAR(
      path.join(__dirname, 'hars/ingredients.har'),
      { url: /\/api\/ingredients/, update: false }
    );

    await page.routeFromHAR(
      path.join(__dirname, 'hars/feeds.har'),
      { url: /\/api\/orders\/all/, update: false }
    );

    await page.goto('/');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
  });

  test('должен загрузить ингредиенты и отобразить конструктор', async ({ page }) => {
    // Проверяем наличие заголовка
    await expect(page.locator('h1')).toContainText('Соберите бургер');
    
    // Проверяем, что ингредиенты отображаются (используем data-testid или классы)
    await expect(page.locator('.items, [class*="items"]')).toBeVisible();
  });

  test('должен добавлять ингредиент в конструктор при клике', async ({ page }) => {
    // Находим кнопку "Добавить" у первого ингредиента
    const addButton = page.locator('button').filter({ hasText: 'Добавить' }).first();
    await addButton.click();
    
    // Проверяем, что элемент появился в конструкторе
    await expect(page.locator('.element, [class*="element"]')).toBeVisible();
  });

  test('должен открывать модальное окно с деталями ингредиента', async ({ page }) => {
    // Кликаем на первый ингредиент (не на кнопку!)
    const ingredientCard = page.locator('a[href*="/ingredients/"]').first();
    await ingredientCard.click();
    
    // Проверяем, что модальное окно открылось
    await expect(page.locator('.modal, [class*="modal"]')).toBeVisible();
  });

  test('должен переключать вкладки ингредиентов', async ({ page }) => {
    // Кликаем на вкладку "Начинки"
    await page.locator('li').filter({ hasText: 'Начинки' }).click();
    await expect(page.locator('li.tab_tab_type_current')).toContainText('Начинки');
    
    // Кликаем на вкладку "Соусы"
    await page.locator('li').filter({ hasText: 'Соусы' }).click();
    await expect(page.locator('li.tab_tab_type_current')).toContainText('Соусы');
  });
});