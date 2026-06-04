import Page from './page.js';
import { removeDollarSign } from '../helpers/diff.help.js';

class Checkout2Page extends Page {
  get title() {
    return $('[data-test="title"]');
  }
  get finishBtn() {
    return $('[data-test="finish"]');
  }
  get itemTotalWOTax() {
    return $('[data-test="subtotal-label"]');
  }
  get itemNameSelector() {
    return '.inventory_item_name';
  }
  get itemPriceSelector() {
    return '.inventory_item_price';
  }

  async getProductContainerByItemTitleDataTest(dataTest) {
    return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class,"cart_item_label")]`);
  }

  async getProductDataByTitleDataTest(dataTest) {
    const container = await this.getProductContainerByItemTitleDataTest(dataTest);

    return {
      name: await container.$(this.itemNameSelector).getText(),
      price: removeDollarSign(await container.$(this.itemPriceSelector).getText()),
    };
  }

  async finishBtnClick() {
    await this.finishBtn.waitForClickable();
    await this.finishBtn.click();
  }

  open() {
    return super.open('checkout-step-two');
  }
}

export default new Checkout2Page();
