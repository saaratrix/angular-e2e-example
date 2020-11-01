import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {
  createItem(name: string): void {
    browser.wait(this.getNewItemInput().sendKeys(name));
    browser.sleep(500);
    const getCreateNewItembutton = this.getCreateNewItemButton();
    browser.wait(getCreateNewItembutton.isDisplayed());
    getCreateNewItembutton.click();
  }

  updateItem(currentName: string, newName: string): void {
    const inputElement = this.getItemInputElement(currentName);
    browser.wait(inputElement.isDisplayed());
    inputElement.clear();
    inputElement.sendKeys(newName);
  }

  deleteItem(name: string): void {
    const deleteButton = this.getItemDeleteButton(name);
    browser.wait(deleteButton.isDisplayed());
    deleteButton.click();
  }

  getNewItemInput(): ElementFinder {
    return element(by.css('.new-item-name'));
  }

  getCreateNewItemButton(): ElementFinder {
    return element(by.css('.create-item'));
  }

  getItemContainerElement(name: string): ElementFinder {
    return this.getItemInputElement(name).element(by.xpath('..'));
    // An alternative way to get the element using xpath instead.
    // return element(by.xpath(`//input[contains(@ng-reflect-model, '${name}')]/ancestor::div[contains(@class, 'item-container')]`));
  }

  getItemInputElement(name: string): ElementFinder {
    // Since we're not using [value] and only using [(ngModel)] we can get the value with the ng-reflect-model attribute.
    return element(by.css(`.item-name[ng-reflect-model='${name}']`));
  }

  getItemDeleteButton(name: string): ElementFinder {
    return this.getItemContainerElement(name).element(by.css('.item-delete-button'));
  }

  getItems(): ElementArrayFinder {
    return element.all(by.css('.item-container'));
  }
}
