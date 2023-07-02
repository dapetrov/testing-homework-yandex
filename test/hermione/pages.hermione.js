// const assert = require('assert');

// const bugId = 'bug_id=0'; // передаем bug-id

// const bugidint = bugId !== '' ? ('?' + bugId) : '';

// const url = `http://localhost:3000/hw/store${bugidint}`;

// describe('Проверка страниц на сайте', function () {

//   // beforeEach(async function () {
//   //   await this.browser.url('http://localhost:3000/hw/store/cart');
//   //   const CartClearButton = await this.browser.$('.Cart-Clear');
//   //   if (CartClearButton) {
//   //     await CartClearButton.click();
//   //   }
//   // });

//   it('Каталог', async function () {
//     await this.browser.url(url);
//     const catalogLink = await this.browser.$('[href="/hw/store/catalog"]');
//     assert(await catalogLink.isDisplayed(), 'Ссылка на каталог не отображается');
//     // await catalogLink.click();
//     await this.browser.url(`http://localhost:3000/hw/store/catalog${bugidint}`);
//     await this.browser.assertView('plainCatalog', 'html', {
//       screenshotDelay: 500,
//       ignoreElements: [".card-body"].filter(element => element !== "")
//     });
//   });

//   it('Доставка', async function () {
//     await this.browser.url(url);
//     const deliveryLink = await this.browser.$('[href="/hw/store/delivery"]');
//     assert(await deliveryLink.isDisplayed(), 'Ссылка на доставку не отображается');
//     // await deliveryLink.click();
//     await this.browser.url(`http://localhost:3000/hw/store/delivery${bugidint}`);
//     await this.browser.assertView('plainDelivery', 'html', { screenshotDelay: 1000 });
//   });

//   it('Контакты', async function () {
//     await this.browser.url(url);
//     const contactsLink = await this.browser.$('[href="/hw/store/contacts"]');
//     assert(await contactsLink.isDisplayed(), 'Ссылка на контакты не отображается');
//     // await contactsLink.click();
//     await this.browser.url(`http://localhost:3000/hw/store/contacts${bugidint}`);
//     await this.browser.assertView('plainContacts', 'html', { screenshotDelay: 1000 });
//   });

//   it('Корзина', async function () {
//     await this.browser.url(url);
//     const cartLink = await this.browser.$('[href="/hw/store/cart"]');
//     assert(await cartLink.isDisplayed(), 'Ссылка на корзину не отображается');
//     // await cartLink.click();
//     await this.browser.url(`http://localhost:3000/hw/store/cart${bugidint}`);

//     // const CartClearButton = await this.browser.$('.Cart-Clear');
//     // if (CartClearButton) {
//     //   await CartClearButton.click();
//     // }

//     await this.browser.assertView('plainCart', 'html', { screenshotDelay: 1000 });
//   });
// });