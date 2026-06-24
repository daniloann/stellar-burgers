# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: constructor.spec.tsx >> Конструктор бургера >> должен загрузить ингредиенты и отобразить конструктор
- Location: tests\constructor.spec.tsx:23:7

# Error details

```
SyntaxError: page.routeFromHAR: Unexpected end of JSON input
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | 
  4  | test.describe('Конструктор бургера', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     // Перехватываем запросы к API
  7  |     await page.routeFromHAR(
  8  |       path.join(__dirname, 'hars/ingredients.har'),
  9  |       { url: /\/api\/ingredients/, update: false }
  10 |     );
  11 | 
> 12 |     await page.routeFromHAR(
     |                ^ SyntaxError: page.routeFromHAR: Unexpected end of JSON input
  13 |       path.join(__dirname, 'hars/feeds.har'),
  14 |       { url: /\/api\/orders\/all/, update: false }
  15 |     );
  16 | 
  17 |     await page.goto('/');
  18 |     
  19 |     // Ждем загрузки страницы
  20 |     await page.waitForLoadState('networkidle');
  21 |   });
  22 | 
  23 |   test('должен загрузить ингредиенты и отобразить конструктор', async ({ page }) => {
  24 |     // Проверяем наличие заголовка
  25 |     await expect(page.locator('h1')).toContainText('Соберите бургер');
  26 |     
  27 |     // Проверяем, что ингредиенты отображаются (используем data-testid или классы)
  28 |     await expect(page.locator('.items, [class*="items"]')).toBeVisible();
  29 |   });
  30 | 
  31 |   test('должен добавлять ингредиент в конструктор при клике', async ({ page }) => {
  32 |     // Находим кнопку "Добавить" у первого ингредиента
  33 |     const addButton = page.locator('button').filter({ hasText: 'Добавить' }).first();
  34 |     await addButton.click();
  35 |     
  36 |     // Проверяем, что элемент появился в конструкторе
  37 |     await expect(page.locator('.element, [class*="element"]')).toBeVisible();
  38 |   });
  39 | 
  40 |   test('должен открывать модальное окно с деталями ингредиента', async ({ page }) => {
  41 |     // Кликаем на первый ингредиент (не на кнопку!)
  42 |     const ingredientCard = page.locator('a[href*="/ingredients/"]').first();
  43 |     await ingredientCard.click();
  44 |     
  45 |     // Проверяем, что модальное окно открылось
  46 |     await expect(page.locator('.modal, [class*="modal"]')).toBeVisible();
  47 |   });
  48 | 
  49 |   test('должен переключать вкладки ингредиентов', async ({ page }) => {
  50 |     // Кликаем на вкладку "Начинки"
  51 |     await page.locator('li').filter({ hasText: 'Начинки' }).click();
  52 |     await expect(page.locator('li.tab_tab_type_current')).toContainText('Начинки');
  53 |     
  54 |     // Кликаем на вкладку "Соусы"
  55 |     await page.locator('li').filter({ hasText: 'Соусы' }).click();
  56 |     await expect(page.locator('li.tab_tab_type_current')).toContainText('Соусы');
  57 |   });
  58 | });
```