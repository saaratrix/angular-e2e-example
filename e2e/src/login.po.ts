import { browser, by, element, ElementFinder } from 'protractor';

export class LoginPage {
  login(username: string, password: string): void {
    this.navigateTo();
    browser.wait(this.getUsernameInput().sendKeys(username), 1000);
    browser.wait(this.getPasswordInput().sendKeys(password));
    // Wait to show what happens for the demo.
    browser.sleep(500);
    const signInButton = this.getSignInButton();
    browser.wait(signInButton.isDisplayed(), 1000, 'sign in button not visible');
    signInButton.click();
  }

  logout(): void {
    const logoutButton = this.getLogoutButton();
    browser.wait(logoutButton.isDisplayed());
    logoutButton.click();
  }

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getUsernameInput(): ElementFinder {
    return element(by.css('.username'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.css('.password'));
  }

  getSignInButton(): ElementFinder {
    return element(by.css('.sign-in'));
  }

  getLogoutButton(): ElementFinder {
    return element(by.css('.logout'));
  }
}
