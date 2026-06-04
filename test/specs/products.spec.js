import inventoryPage from '../pageobjects/inventory.page.js';
import { sortScenarios, URLS, PAGES_TITLES } from '../fixtures/test.data.js';
import { login } from '../helpers/diff.help.js';

describe('Test Case Objective: Products', () => {
  before(async () => login());

  it('006 - sorting should work: A-Z, Z-A, 0-9, 9-0', async () => {
    await expect(inventoryPage.title).toHaveText(PAGES_TITLES.PRODUCTS);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.INVENTORY);

    for (const { option, getData, sortFn } of sortScenarios) {
      await inventoryPage.sortBy(option);
      const actual = await getData();
      const expected = sortFn(actual);
      expect(actual).toEqual(expected);
    }
  });
});
