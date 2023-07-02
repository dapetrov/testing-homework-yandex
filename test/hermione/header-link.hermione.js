const assert = require('assert');
const bugId = 'bug_id=0' //передаем bug-id

const bugidint = bugId !== '' ? ('?'+bugId) : ''

describe('Проверка шапки', function () {
  it('Проверка отображения ссылок на страницы магазина и ссылки на корзину', async function () {
    await this.browser.url(`http://localhost:3000/hw/store${bugidint}`);

    const catalogLink = await this.browser.$('[href="/hw/store/catalog"]');
    assert.notStrictEqual(catalogLink.length, 0, 'Ссылка на каталог не найдена');
    assert.strictEqual(await catalogLink.isDisplayed(), true, 'Ссылка на каталог не отображается');

    const deliveryLink = await this.browser.$('[href="/hw/store/delivery"]');
    assert.notStrictEqual(deliveryLink.length, 0, 'Ссылка на доставку не найдена');
    assert.strictEqual(await deliveryLink.isDisplayed(), true, 'Ссылка на доставку не отображается');

    const contactsLink = await this.browser.$('[href="/hw/store/contacts"]');
    assert.notStrictEqual(contactsLink.length, 0, 'Ссылка на каталог не найдена');
    assert.strictEqual(await contactsLink.isDisplayed(), true, 'Ссылка на каталог не отображается');

    const cartLink = await this.browser.$('[href="/hw/store/cart"]');
    assert.notStrictEqual(cartLink.length, 0, 'Ссылка на каталог не найдена');
    assert.strictEqual(await cartLink.isDisplayed(), true, 'Ссылка на каталог не отображается');
  });
});