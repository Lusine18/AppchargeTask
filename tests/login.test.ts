import { test, expect } from "@playwright/test";

test.describe("AppCharge Web Application Tests", () => {
  test("login with player ID", async ({page}) => {
    //navigate to login page
    await page.goto('https://home-challenge.appcharge.com/login');

    // Accept all button 
    await page.getByRole('button', { name: 'Accept all' }).click();

    //click on "Login with player ID"
    await page.getByRole('button', { name: 'Login with Player ID' }).click();

    //fill in the player id field
    await page.getByPlaceholder('Player ID').fill('123456');

    //log in to the app
    await page.getByRole('button', { name: 'Login' }).click();
    
    
    //check if logged in
   await expect(page).toHaveURL("https://home-challenge.appcharge.com/shop");

  });
  test('Click on a product and navigate to Checkout page', async ({ page }) => {
    // Login step (reuse the previous login logic)
    await page.goto('https://home-challenge.appcharge.com/login');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Login with Player ID' }).click();
    await page.getByPlaceholder('Player ID').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assuming you're on the home/dashboard page, find and click on the product
    await page.getByTestId('66c834fd18c6726d4ffa41f3').locator('div').filter({ hasText: /^1$/ }).nth(2).click(); 

    await page.waitForTimeout(5000);
    const payButton = await page.locator('#submit');
    const hasPayText = await payButton.locator('text=Pay').isVisible();
  });
  
});
