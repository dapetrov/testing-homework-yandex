const bugId = 'bug_id=0' //передаем bug-id

const bugidint = bugId !== '' ? ('?'+bugId) : ''


describe('Проверка формы', function () {
  it('НеверныйОтветФормы', async function () {
    await this.browser.url(`http://localhost:3000/hw/store/cart${bugidint}`);

    const nameInput = await this.browser.$('.Form-Field_type_name');
    const phoneInput = await this.browser.$('.Form-Field_type_phone');
    const adreessInput = await this.browser.$('.Form-Field_type_address');

    await nameInput.setValue('beb');
    await phoneInput.setValue('78888888888');
    await adreessInput.setValue('ebebebe');

    const acceptbtn = await this.browser.$('.Form-Submit');
    await acceptbtn.click();

    await this.browser.assertView('WellDone', 'html', { 
      screenshotDelay: 500,
      ignoreElements: [".Cart-Number"]
    });

  });
});