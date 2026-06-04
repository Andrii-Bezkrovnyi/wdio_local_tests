import { removeDollarSign } from '../helpers/diff.help.js';
import Page from './page.js';

class InventoryPage extends Page {
  get shoppingCartContainer() {
    return $('.shopping_cart_container');
  }

  get shoppingCartBadge() {
    return $('[data-test="shopping-cart-badge"]');
  }

  get sortDropdown() {
    return $('[data-test="product-sort-container"]');
  }

  get title() {
    return $('[data-test="title"]');
  }

  get itemPriceSelector() {
    return '.inventory_item_price';
  }

  get itemPrices() {
    return $$(this.itemPriceSelector);
  }

  get itemNameSelector() {
    return '.inventory_item_name';
  }

  get itemNames() {
    return $$(this.itemNameSelector);
  }

  get childAddToCartBtnSelector() {
    return '[data-test^="add-to-cart"]';
  }

  get inventorySelector() {
    return 'inventory';
  }

  async getProductContainerByItemTitleDataTest(dataTest) {
    return $(`//*[@data-test="${dataTest}"]/ancestor::div[contains(@class, "inventory_item")]`);
  }

  async getProductDataByTitleDataTest(dataTest) {
    const container = await this.getProductContainerByItemTitleDataTest(dataTest);
    await this.waitForElementDisplayed(container);
    return {
      name: await container.$(this.itemNameSelector).getText(),
      price: removeDollarSign(await container.$(this.itemPriceSelector).getText()),
      addToCartBtn: await container.$(this.childAddToCartBtnSelector),
    };
  }

  async getCartItemCount() {
    return await this.shoppingCartBadge.getText();
  }

  async openCart() {
    await this.shoppingCartContainer.click();
  }

  async addItemToCart(dataTest) {
    const product = await this.getProductDataByTitleDataTest(dataTest);
    await product.addToCartBtn.click();
    return product;
  }

  async sortBy(value) {
    await this.sortDropdown.selectByAttribute('value', value);
  }

  async getAllPrices() {
    const priceEls = await this.itemPrices;
    const prices = [];
    for (const el of priceEls) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async getAllNames() {
    const nameEls = await this.itemNames;
    const names = [];
    for (const el of nameEls) {
      names.push(await el.getText());
    }
    return names;
  }

  open() {
    return super.open(this.inventorySelector);
  }
}

export default new InventoryPage();
