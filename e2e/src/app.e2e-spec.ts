import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from './login.po';

describe('example test', () => {
  let loginPage: LoginPage;
  let appPage: AppPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    appPage = new AppPage();
  });

  it('should login, create item, edit item, delete item and then log out.', () => {
    loginPage.login('saaratrix', '123456');
    // Waiting because of the demo so many steps can be visualized.
    browser.sleep(500);
    appPage.createItem('item Nuu');
    const currentItems = appPage.getItems();
    expect(currentItems.count()).toBe(1);
    browser.sleep(500);
    appPage.updateItem('item Nuu', 'modified Nuu');
    browser.sleep(500);
    appPage.deleteItem('modified Nuu');
    // We don't need to get the items again because it re-evaluates the count when called.
    expect(currentItems.count()).toBe(0);
    browser.sleep(500);
    loginPage.logout();
    browser.sleep(500);

    expect(loginPage.getSignInButton().isDisplayed()).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
