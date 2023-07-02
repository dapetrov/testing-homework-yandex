const assert = require('assert');
const bugId = 'bug_id=0' //передаем bug-id

const bugidint = bugId !== '' ? ('?'+bugId) : ''


describe('Проверка кнопки', async function () {
  it('Проверка отображения товаров', async function () {
await this.browser.url(`http://localhost:3000/hw/store/catalog${bugidint}`);
    
        const products = await this.browser.$$('.ProductItem');
        assert.strictEqual(products.length, 27);

        const mainTabId = await this.browser.getWindowHandle();

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const cardBodyElement = await product.$('.card-body');
            const linkElement = await cardBodyElement.$('.ProductItem-DetailsLink');
    
            const href = await linkElement.getAttribute('href');
        
            await this.browser.newWindow(href, '_blank');
       
            const pageAddToCartElement = await this.browser.$('.ProductDetails-AddToCart');
            const pageAddToCart = await pageAddToCartElement.getText();
            assert.notStrictEqual(pageAddToCart, '');
       
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
      });