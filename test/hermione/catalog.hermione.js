const assert = require('assert');

const bugId = 'bug_id=0' //передаем bug-id
const bugidint = bugId !== '' ? ('?'+bugId) : ''

const startUrl = `http://localhost:3000/hw/store/catalog${bugidint}`


describe('Проверка каталога', async function () {
  it('Проверка отображения товаров', async function () {
    await this.browser.url(startUrl);

    const products = await this.browser.$$('.ProductItem');
    assert.strictEqual(products.length, 27);

    const mainTabId = await this.browser.getWindowHandle();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const cardBodyElement = await product.$('.card-body');
      const titleElement = await cardBodyElement.$('.ProductItem-Name');
      const priceElement = await cardBodyElement.$('.ProductItem-Price');
      const linkElement = await cardBodyElement.$('.ProductItem-DetailsLink');

      const title = await titleElement.getText();
      const price = await priceElement.getText();
      const link = await linkElement.getAttribute('href');

      assert.notStrictEqual(title, '');
      assert.notStrictEqual(price, '');
      assert.notStrictEqual(link, '');

      assert.strictEqual(await titleElement.isDisplayed(), true, 'Название не отображается');
      assert.strictEqual(await priceElement.isDisplayed(), true, 'Цена не отображается');
      assert.strictEqual(await linkElement.isDisplayed(), true, 'Ссылка на подробности не отображается');

      const href = await linkElement.getAttribute('href');
      await this.browser.newWindow(href+bugidint, '_blank');

      const pageTitleElement = await this.browser.$('.ProductDetails-Name');
      const pageDescriptionElement = await this.browser.$('.ProductDetails-Description');
      const pagePriceElement = await this.browser.$('.ProductDetails-Price');
      const pageColorElement = await this.browser.$('.ProductDetails-Color');
      const pageMaterialElement = await this.browser.$('.ProductDetails-Material');
      const pageButtonElement = await this.browser.$('.ProductDetails-AddToCart');

      const pageTitle = await pageTitleElement.getText();
      const pageDescription = await pageDescriptionElement.getText();
      const pagePrice = await pagePriceElement.getText();
      const pageColor = await pageColorElement.getText();
      const pageMaterial = await pageMaterialElement.getText();
      const pageButton = await pageButtonElement.getText();

      assert.notStrictEqual(pageTitle, '');
      assert.notStrictEqual(pageDescription, '');
      assert.notStrictEqual(pagePrice, '');
      assert.notStrictEqual(pageColor, '');
      assert.notStrictEqual(pageMaterial, '');
      assert.strictEqual(pageButton, 'Add to Cart');

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
  });

  it('Проверка добавления товара в корзину', async function () {
    await this.browser.url(`http://localhost:3000/hw/store/catalog${bugidint}`);
    const mainTabId = await this.browser.getWindowHandle();
  
    const products = await this.browser.$$('.ProductItem');
    const product = products[0];
    const cardBodyElement = await product.$('.card-body');
    const linkElement = await cardBodyElement.$('.ProductItem-DetailsLink');
    const href = await linkElement.getAttribute('href');
    await this.browser.newWindow(href+bugidint, '_blank');
    await this.browser.execute(() => {
      const elementsToReplace = document.querySelectorAll(".ProductDetails-Name, .ProductDetails-Description, .ProductDetails-Price, .ProductDetails-Color, .ProductDetails-Material");
      elementsToReplace.forEach(element => {
        element.textContent = "тестовое содержимое";
      });
    });
    await this.browser.assertView('plainProduct1', 'html', { 
      screenshotDelay: 500,
      ignoreElements: [".ProductDetails-Name", ".ProductDetails-Description", ".ProductDetails-Price", ".ProductDetails-Color", ".ProductDetails-Material"].filter(element => element !== "")
    });
    const pageButtonElement = await this.browser.$('.ProductDetails-AddToCart');
  
    await pageButtonElement.click();
    await pageButtonElement.click();
    await pageButtonElement.click();
    const randonElement = await this.browser.$('.CartBadge')
    await randonElement.click();
  
    await this.browser.execute(() => {
      const elementsToReplace = document.querySelectorAll(".Cart-Name, .Cart-Price, .Cart-Total, .Cart-OrderPrice");
      elementsToReplace.forEach(element => {
        element.textContent = "тестовое содержимое";
      });
    });
    await this.browser.assertView('plainProduct2', 'html', { 
      screenshotDelay: 500,
      ignoreElements: [".ProductDetails-Name", ".ProductDetails-Description", ".ProductDetails-Price", ".ProductDetails-Color", ".ProductDetails-Material"].filter(element => element !== "")
    });
  
    const goToCart = await this.browser.$('[href="/hw/store/cart"]')
    await goToCart.click();
  
    await this.browser.execute(() => {
      const elementsToReplace = document.querySelectorAll(".Cart-Name, .Cart-Price, .Cart-Total, .Cart-OrderPrice");
      elementsToReplace.forEach(element => {
        element.textContent = "тестовое содержимое";
      });
    });
    await this.browser.assertView('plainProduct3', 'html', { 
      screenshotDelay: 500,
      ignoreElements: [".Cart-Name", ".Cart-Price", ".Cart-Total", ".Cart-OrderPrice"].filter(element => element.textContent !== "")
    });
  
    await this.browser.refresh();
  
    await this.browser.execute(() => {
      const elementsToReplace = document.querySelectorAll(".Cart-Name, .Cart-Price, .Cart-Total, .Cart-OrderPrice");
      elementsToReplace.forEach(element => {
        element.textContent = "тестовое содержимое";
      });
    });
    await this.browser.assertView('plainProduct4', 'html', { 
      screenshotDelay: 1000,
      ignoreElements: [".Cart-Name", ".Cart-Price", ".Cart-Total", ".Cart-OrderPrice"].filter(element => element.textContent !== "")
    });
  
    const allTabIds = await this.browser.getWindowHandles();
  
    for (const tabId of allTabIds) {
      if (tabId !== mainTabId) {
        await this.browser.switchToWindow(tabId);
        await this.browser.closeWindow();
        break;
      }
    }
    await this.browser.switchToWindow(mainTabId);
  });
});