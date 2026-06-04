import allureReporter from '@wdio/allure-reporter';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkout1Page from '../pageobjects/checkout1.page.js';
import checkout2Page from '../pageobjects/checkout2.page.js';
import checkoutCompletePage from '../pageobjects/checkout-complete.page.js';
import {
  generateCustomer,
  itemDataTest,
  URLS,
  PAGES_TITLES,
  MESSAGES,
  ERROR_MESSAGES,
} from '../fixtures/test.data.js';
import { login } from '../helpers/diff.help.js';

describe('Test Case Objective: Checkout', () => {
  beforeEach(async () => login());

  it('008 - should complete checkout successfully with valid data', async () => {
    await expect(inventoryPage.title).toHaveText(PAGES_TITLES.PRODUCTS);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.INVENTORY);

    const product = await inventoryPage.addItemToCart(itemDataTest);

    await expect(inventoryPage.shoppingCartBadge).toBeDisplayed();
    await expect(await inventoryPage.getCartItemCount()).toBe('1');

    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText(PAGES_TITLES.CART);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.CART);

    const productInCart = await cartPage.getProductDataByTitleDataTest(itemDataTest);
    await expect(productInCart.name).toBe(product.name);

    await cartPage.goToCheckout1();
    await expect(checkout1Page.title).toHaveText(PAGES_TITLES.CHECKOUT_STEP_1);
    await expect(await checkout1Page.getCurrentUrl()).toContain(URLS.CHECKOUT_STEP_1);

    const customer = generateCustomer();
    await checkout1Page.setFirstName(customer.firstName);
    await expect(checkout1Page.firstNameFld).toHaveValue(customer.firstName);

    await checkout1Page.setLastName(customer.lastName);
    await expect(checkout1Page.lastNameFld).toHaveValue(customer.lastName);

    await checkout1Page.setZip(customer.zip);
    await expect(checkout1Page.zipFld).toHaveValue(customer.zip);

    await checkout1Page.goToCheckOut2();
    await expect(checkout2Page.title).toHaveText(PAGES_TITLES.CHECKOUT_STEP_2);
    await expect(await checkout2Page.getCurrentUrl()).toContain(URLS.CHECKOUT_STEP_2);

    const productInOverview = await checkout2Page.getProductDataByTitleDataTest(itemDataTest);
    await expect(productInOverview.name).toBe(product.name);
    await expect(checkout2Page.itemTotalWOTax).toHaveText(
      `${MESSAGES.ITEM_TOTAL_PREFIX}${product.price}`,
    );

    await checkout2Page.finishBtnClick();
    await expect(checkoutCompletePage.title).toHaveText(PAGES_TITLES.CHECKOUT_COMPLETE);
    await expect(await checkoutCompletePage.getCurrentUrl()).toContain(URLS.CHECKOUT_COMPLETE);
    await expect(checkoutCompletePage.completeHeader).toHaveText(MESSAGES.ORDER_COMPLETE_HEADER);

    await checkoutCompletePage.backHomeBtnClick();
    await expect(inventoryPage.title).toHaveText(PAGES_TITLES.PRODUCTS);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.INVENTORY);
    await expect(inventoryPage.shoppingCartBadge).not.toBeExisting();
  });

  it('009 - Checkout without products. Should not allow checkout with empty cart', async () => {
    allureReporter.addIssue('BUG-009');
    allureReporter.addDescription(
      'This test fails currently because the system allows checkout with an empty cart. ' +
        'Expected behavior: user stays on the Cart page and sees an error message.',
    );
    await expect(inventoryPage.title).toHaveText(PAGES_TITLES.PRODUCTS);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.INVENTORY);

    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText(PAGES_TITLES.CART);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.CART);

    const items = await cartPage.cartItems;
    expect(items.length).toBe(0);

    await cartPage.goToCheckout1();

    // The fragments of the cat are empty, and our culprits will be lost at the end of the cat.
    // Going to '/checkout-step-one' is NOT responsible for waking up.
    await expect(cartPage.title).toHaveText(PAGES_TITLES.CART);
    await expect(await cartPage.getCurrentUrl()).not.toContain(URLS.CHECKOUT_STEP_1);

    // Check for an error message
    // (Make sure the errorMsg locator is correctly defined in cart.page.js)
    await expect(cartPage.errorMsg).toBeDisplayed();
    await expect(cartPage.errorMsg).toHaveTextContaining(ERROR_MESSAGES.EMPTY_CART);
  });
});
