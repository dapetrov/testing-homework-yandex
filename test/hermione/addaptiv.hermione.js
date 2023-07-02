// Тестирование функциональности шапки
const assert = require('assert');
const bugId = 'bug_id=0' //передаем bug-id

const bugidint = bugId !== '' ? ('?'+bugId) : ''

const url = `http://localhost:3000/hw/store${bugidint}`


describe('Аддаптивность', async function() {
    it('отображение 1920x1080', async function() {
        await this.browser.url(url);
        await this.browser.setWindowSize(1920, 3000);
        await this.browser.assertView('plain1920x1080', 'html');
    });

    it('отображение 1366x768', async function() {
        await this.browser.url(url);
        await this.browser.setWindowSize(1366, 3000);
        await this.browser.assertView('plain1366x768', 'html');
    });

    it('отображение 1024x768', async function() {
        await this.browser.url(url);
        await this.browser.setWindowSize(1024, 3000);
        await this.browser.assertView('plain1024x768', 'html');
    });

    it('отображение 800x480', async function() {
        await this.browser.url(url);
        await this.browser.setWindowSize(800, 3000);
        await this.browser.assertView('plain800x480', 'html');
    });

    it('отображение 480x320', async function() {
        await this.browser.url(url);
        await this.browser.setWindowSize(480, 3000);
        await this.browser.assertView('plain480x320', 'html');
    });


    it('появление бургер меню при 575px"', async function() {
        await this.browser.url(url);
        await this.browser.setWindowSize(575, 3000);
        const navbarNav = await this.browser.$('.navbar-nav');

        const flexDirection = await navbarNav.getCSSProperty('flex-direction');

        assert.strictEqual(flexDirection.value, 'column', 'бургер меню не появилось');
  });
});


