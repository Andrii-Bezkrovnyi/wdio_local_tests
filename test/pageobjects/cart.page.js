import Page from './page.js';

class CartPage extends Page {
  get title() {
    return $('[data-test="title"]');
  }
  get checkOutBtn() {
    return $('[data-test="checkout"]');
  }
  get itemNameSelector() {
    return '.inventory_item_name';
  }
  get itemPriceSelector() {
    return '.inventory_item_price';
  }
  get cartItems() {
    return $$('.cart_item');
  }
  get errorMsg() {
    return $('[data-test="error"]');
  }

  async getProductContainerByItemTitleDataTest(dataTest) {
    return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class,"cart_item")]`);
  }

  async getProductDataByTitleDataTest(dataTest) {
    const container = await this.getProductContainerByItemTitleDataTest(dataTest);

    return {
      name: await container.$(this.itemNameSelector).getText(),
      price: await container.$(this.itemPriceSelector).getText(),
    };
  }

  async goToCheckout1() {
    await this.checkOutBtn.waitForClickable();
    await this.checkOutBtn.click();
  }

  open() {
    return super.open('cart');
  }
}

export default new CartPage();
