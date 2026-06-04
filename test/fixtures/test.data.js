import { faker } from '@faker-js/faker';
import inventoryPage from '../pageobjects/inventory.page';
import footerPage from '../pageobjects/footer.page';

export const generateCustomer = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zip: faker.location.zipCode('#####'),
});

export const loginData = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'standarD_user',
    password: faker.internet.password(),
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
};

export const itemDataTest = 'item-4-title-link';

export const EXPECTED_MENU = ['All Items', 'About', 'Logout', 'Reset App State'];

export const sortScenarios = [
  {
    option: 'az',
    getData: () => inventoryPage.getAllNames(),
    sortFn: (arr) => [...arr].sort(),
  },
  {
    option: 'za',
    getData: () => inventoryPage.getAllNames(),
    sortFn: (arr) => [...arr].sort().reverse(),
  },
  {
    option: 'lohi',
    getData: () => inventoryPage.getAllPrices(),
    sortFn: (arr) => [...arr].sort((a, b) => a - b),
  },
  {
    option: 'hilo',
    getData: () => inventoryPage.getAllPrices(),
    sortFn: (arr) => [...arr].sort((a, b) => b - a),
  },
];

export const footerIconScenarios = [
  {
    name: 'Facebook',
    action: () => footerPage.clickFacebook(),
    expected: ['facebook.com'],
  },
  {
    name: 'LinkedIn',
    action: () => footerPage.clickLinkedin(),
    expected: ['linkedin.com'],
  },
  {
    name: 'Twitter/X',
    action: () => footerPage.clickTwitter(),
    expected: ['x.com', 'twitter.com'], // all domains that could be used
  },
];

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
  EMPTY_CART: 'Cart is empty',
};

export const URLS = {
  BASE: '/',
  INVENTORY: '/inventory',
  CART: '/cart',
  CHECKOUT_STEP_1: '/checkout-step-one',
  CHECKOUT_STEP_2: '/checkout-step-two',
  CHECKOUT_COMPLETE: '/checkout-complete',
};

export const PAGES_TITLES = {
  PRODUCTS: 'Products',
  CART: 'Your Cart',
  CHECKOUT_STEP_1: 'Checkout: Your Information',
  CHECKOUT_STEP_2: 'Checkout: Overview',
  CHECKOUT_COMPLETE: 'Checkout: Complete!',
};

export const MESSAGES = {
  ORDER_COMPLETE_HEADER: 'Thank you for your order!',
  ITEM_TOTAL_PREFIX: 'Item total: $',
};
