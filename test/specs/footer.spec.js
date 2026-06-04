import inventoryPage from '../pageobjects/inventory.page.js';
import { footerIconScenarios, URLS, PAGES_TITLES } from '../fixtures/test.data.js';
import { login } from '../helpers/diff.help.js';

describe('Test Case Objective: Footer', () => {
  before(async () => login());

  it('007 - footer social links sould be opened in new tab', async () => {
    await expect(inventoryPage.title).toHaveText(PAGES_TITLES.PRODUCTS);
    await expect(await inventoryPage.getCurrentUrl()).toContain(URLS.INVENTORY);

    for (const { name, action, expected } of footerIconScenarios) {
      await action();
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[1]);

      const url = await browser.getUrl();
      expect(expected.some((domain) => url.includes(domain))).toBe(true);

      await browser.closeWindow();
      await browser.switchToWindow(handles[0]);
    }
  });
});
