const assert = require('assert');
const bugId = 'bug_id=0'; // Передаем bug-id

const bugidint = bugId !== '' ? ('?' + bugId) : '';
const url = `http://localhost:3000/hw/store/catalog${bugidint}`;
const urlCart = `http://localhost:3000/hw/store/cart${bugidint}`;

describe('Проверка корзины', async function () {
  it('Проверка отображения товаров и удаления товаров', async function () {
    await this.browser.url(url);
    const mainTabId = await this.browser.getWindowHandle();

    const products = await this.browser.$$('.ProductItem');
    const productHandles = [products[0], products[1]];

    for (const prod of productHandles) { 
      const cardBodyElement = await prod.$('.card-body');
      const linkElement = await cardBodyElement.$('.ProductItem-DetailsLink');
      const href = await linkElement.getAttribute('href');
      await this.browser.newWindow(href + bugidint, '_blank');

      const pageButtonElement = await this.browser.$('.ProductDetails-AddToCart');
      await pageButtonElement.click();

      const allTabIds = await this.browser.getWindowHandles();

      for (const tabId of allTabIds) {
        if (tabId !== mainTabId) {
          await this.browser.switchToWindow(tabId);
          await this.browser.closeWindow();
          break;
        }
      }
      await this.browser.switchToWindow(mainTabId);
    }

    await this.browser.url(urlCart);

    const CartClearButton = await this.browser.$('.Cart-Clear');
    await CartClearButton.click();

    const linkToCatalog = await this.browser.$('[href="/hw/store/catalog"]');

    const isDisplayed = await linkToCatalog.isDisplayed();
    assert.strictEqual(isDisplayed, true, 'Ссылка на каталог не отображается');

    await this.browser.assertView('CartClear', 'html', {
      screenshotDelay: 500,
    });
  });
});