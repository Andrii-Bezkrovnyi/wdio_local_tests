describe('Test Case - Checking entered data test', () => {
  it('010 - should check entered data on the page', async () => {
    // 1. Open the page with the form
    await browser.url('https://testpages.eviltester.com/apps/client-server-form-validation/submit');

    // 2. We find the elements and fill out the form (corrected id for the name)
    const firstNameInput = await $('#firstname');
    await firstNameInput.setValue('Andrii');

    const lastNameInput = await $('#surname');
    await lastNameInput.setValue('Test123456789');

    const ageInput = await $('#age');
    await ageInput.setValue('30');

    // 3. Click on the send button
    const submitBtn = await $('input[type=submit]');
    await submitBtn.click();

    // 4. We find elements on the results page
    const firstNameResult = await $('#firstname-value');
    const surnameResult = await $('#surname-value');
    const ageResult = await $('#age-value');
    const countryResult = await $('#country-value');

    // 5. Check the results (added await before expect)
    await expect(firstNameResult).toHaveText('Andrii');
    await expect(surnameResult).toHaveText('Test123456789');
    await expect(ageResult).toHaveText('30');
    await expect(countryResult).toHaveText('Afghanistan'); // Default value from the form
  });
});
