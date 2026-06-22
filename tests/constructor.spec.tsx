import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('должен загрузить ингредиенты и отобразить конструктор', async ({
    page
  }) => {
    await expect(page.locator('h1:has-text("Соберите бургер")')).toBeVisible();
    await expect(page.locator('[class*="items"]')).toBeVisible();
  });

  test('должен добавлять ингредиент в конструктор при клике', async ({
    page
  }) => {
    const addButton = page.locator('button:has-text("Добавить")').first();
    await addButton.click();
    await expect(page.locator('[class*="element"]')).toBeVisible();
  });

  test('должен открывать модальное окно с деталями ингредиента', async ({
    page
  }) => {
    await page.locator('[class*="article"]').first().click();
    await expect(page.locator('[class*="modal"]')).toBeVisible();
    await expect(page.locator('[class*="modal"] h3')).toBeVisible();
  });

  test('должен показывать цену конструктора', async ({ page }) => {
    const bunAddButton = page
      .locator('[class*="items"] button:has-text("Добавить")')
      .first();
    await bunAddButton.click();
    const mainAddButton = page
      .locator('[class*="items"] button:has-text("Добавить")')
      .nth(1);
    await mainAddButton.click();
    await expect(page.locator('[class*="text"]:has-text("0")')).not.toHaveText(
      '0'
    );
  });

  test('должен перенаправлять на логин при попытке оформить заказ без авторизации', async ({
    page
  }) => {
    const bunAddButton = page
      .locator('[class*="items"] button:has-text("Добавить")')
      .first();
    await bunAddButton.click();
    await page.click('button:has-text("Оформить заказ")');
    await expect(page).toHaveURL(/.*login/);
  });

  test('должен переключать вкладки ингредиентов', async ({ page }) => {
    await page.click('li:has-text("Начинки")');
    await expect(
      page.locator('li:has-text("Начинки")[class*="tab_tab_type_current"]')
    ).toBeVisible();
    await page.click('li:has-text("Соусы")');
    await expect(
      page.locator('li:has-text("Соусы")[class*="tab_tab_type_current"]')
    ).toBeVisible();
  });
});
