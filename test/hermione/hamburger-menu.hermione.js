const assert = require('assert');
const bugId = 'bug_id=0' //передаем bug-id

const bugidint = bugId !== '' ? ('?'+bugId) : ''


describe('Проверка закрытия меню', function () {
  it('При выборе элемента из меню "гамбургера", меню должно закрываться', async function () {
    await this.browser.url(`http://localhost:3000/hw/store${bugidint}`);
    await this.browser.setWindowSize(575, 768);

    const hamburgerMenuButton = await this.browser.$('.navbar-toggler-icon');
    await hamburgerMenuButton.click();

    const menu = await this.browser.$('.Application-Menu');
    assert.strictEqual(await menu.isDisplayed(), true, 'Меню не отображается');

    const menuItem = await this.browser.$('.nav-link');
    await menuItem.click();

    assert.strictEqual(await menu.isDisplayed(), false, 'Меню не закрывается после выбора элемента');
  });
});