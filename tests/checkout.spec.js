import { test, expect } from '@playwright/test';
import { createServer } from 'vite';

let server;

test.beforeAll(async () => {
  server = await createServer({
    configFile: './vite.config.js',
    server: { port: 3000 },
  });
  await server.listen();
});

test.afterAll(async () => {
  if (server) {
    await server.close();
  }
});

test.describe('Mini Checkout – Online Store Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Open application with a clean state before each test
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Mini Checkout' })).toBeVisible();
  });

  test('TEST CASE 1: Successful Checkout', async ({ page }) => {
    // 1. Open application is handled in beforeEach

    // 2. Add Wireless Headphones
    const addHeadphonesBtn = page.getByRole('button', { name: 'Add Wireless Headphones to Cart' });
    await addHeadphonesBtn.click();

    // Verify headphones added to cart
    const cartItem = page.getByTestId('cart-item-prod-headphones');
    await expect(cartItem).toBeVisible();

    // 3. Increase its quantity to 2
    const increaseBtn = page.getByRole('button', { name: 'Increase quantity of Wireless Headphones' }).first();
    await increaseBtn.click();
    await expect(page.getByTestId('quantity-prod-headphones')).toHaveText('2');

    // 4. Enter a valid customer name
    const nameInput = page.getByLabel(/Customer Name/i);
    await nameInput.fill('Vijesh');

    // Optional: Enter email
    const emailInput = page.getByLabel(/Email Address/i);
    await emailInput.fill('vijesh@example.com');

    // 5. Click Place Order
    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    await placeOrderBtn.click();

    // 6. Verify the order confirmation is displayed
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();

    // 7. Verify the customer name is correct
    const customerNameDisplay = page.getByTestId('confirmed-customer-name');
    await expect(customerNameDisplay).toHaveText('Vijesh');

    // 8. Verify an order reference is displayed
    const orderRef = page.getByTestId('order-reference');
    await expect(orderRef).toBeVisible();
    await expect(orderRef).toHaveText(/^QC-\d{8}-\d{3}$/);

    // 9. Verify the exact total is ₹2,998
    const totalDisplay = page.getByTestId('confirmed-total');
    await expect(totalDisplay).toHaveText('₹2,998');

    // 10. Verify that only one confirmation is visible
    await expect(page.getByTestId('order-confirmation')).toHaveCount(1);

    // Capture screenshot for evidence
    await page.screenshot({ path: 'screenshots/test-case-1-successful-checkout.png', fullPage: true });
  });

  test('TEST CASE 2: Missing Required Field', async ({ page }) => {
    // 1. Clean state in beforeEach

    // 2. Add Wireless Headphones
    const addHeadphonesBtn = page.getByRole('button', { name: 'Add Wireless Headphones to Cart' });
    await addHeadphonesBtn.click();

    // 3. Leave the customer name blank
    const nameInput = page.getByLabel(/Customer Name/i);
    await expect(nameInput).toHaveValue('');

    // 4. Click Place Order
    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    await placeOrderBtn.click();

    // 5. Verify the validation message appears
    const nameError = page.getByTestId('customer-name-error');
    await expect(nameError).toBeVisible();
    await expect(nameError).toHaveText(/Customer name is required/i);

    // 6. Verify the checkout confirmation is not displayed
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).not.toBeVisible();

    // 7. Verify the product remains in the cart
    const cartItem = page.getByTestId('cart-item-prod-headphones');
    await expect(cartItem).toBeVisible();
    await expect(page.getByTestId('quantity-prod-headphones')).toHaveText('1');

    // 8. Verify the cart total remains correct (₹1,499)
    const orderTotal = page.getByTestId('order-total');
    await expect(orderTotal).toHaveText('₹1,499');

    // Capture screenshot for evidence
    await page.screenshot({ path: 'screenshots/test-case-2-missing-required-field.png', fullPage: true });
  });

  test('TEST CASE 3: Quantity and Total Calculation', async ({ page }) => {
    // 1. Clean state in beforeEach

    // 2. Add Wireless Headphones
    const addHeadphonesBtn = page.getByRole('button', { name: 'Add Wireless Headphones to Cart' });
    await addHeadphonesBtn.click();

    // 3. Verify the initial total is ₹1,499
    const orderTotal = page.getByTestId('order-total');
    await expect(orderTotal).toHaveText('₹1,499');
    await expect(page.getByTestId('line-total-prod-headphones')).toHaveText('₹1,499');

    // 4. Increase the quantity to 2
    const increaseHeadphonesBtn = page.getByRole('button', { name: 'Increase quantity of Wireless Headphones' }).first();
    await increaseHeadphonesBtn.click();

    // 5. Verify the line total is ₹2,998
    await expect(page.getByTestId('line-total-prod-headphones')).toHaveText('₹2,998');
    await expect(orderTotal).toHaveText('₹2,998');

    // 6. Add Smart Watch
    const addSmartwatchBtn = page.getByRole('button', { name: 'Add Smart Watch to Cart' });
    await addSmartwatchBtn.click();

    // 7. Verify the final order total is ₹5,497 (₹2,998 + ₹2,499)
    await expect(page.getByTestId('line-total-prod-smartwatch')).toHaveText('₹2,499');
    await expect(orderTotal).toHaveText('₹5,497');

    // 8. Decrease the headphone quantity to 1
    const decreaseHeadphonesBtn = page.getByRole('button', { name: 'Decrease quantity of Wireless Headphones' }).first();
    await decreaseHeadphonesBtn.click();

    // 9. Verify the final order total becomes ₹3,998 (₹1,499 + ₹2,499)
    await expect(page.getByTestId('quantity-prod-headphones')).toHaveText('1');
    await expect(page.getByTestId('line-total-prod-headphones')).toHaveText('₹1,499');
    await expect(orderTotal).toHaveText('₹3,998');

    // Capture screenshot for evidence
    await page.screenshot({ path: 'screenshots/test-case-3-quantity-and-total-calculation.png', fullPage: true });
  });

  test('EXTRA VERIFICATION: Empty Cart Checkout Prevention', async ({ page }) => {
    // Verify checkout blocked with empty cart
    const nameInput = page.getByLabel(/Customer Name/i);
    await nameInput.fill('Vijesh');

    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    await placeOrderBtn.click();

    const cartError = page.getByTestId('cart-error');
    await expect(cartError).toBeVisible();
    await expect(cartError).toHaveText(/Please add at least one product to your cart/i);

    // Confirmation must NOT be visible
    await expect(page.getByTestId('order-confirmation')).not.toBeVisible();

    // Name must be preserved
    await expect(nameInput).toHaveValue('Vijesh');

    await page.screenshot({ path: 'screenshots/manual-test-1-empty-cart-checkout.png', fullPage: true });
  });

  test('EXTRA VERIFICATION: Rapid Double-Click Duplicate Order Prevention', async ({ page }) => {
    const addHeadphonesBtn = page.getByRole('button', { name: 'Add Wireless Headphones to Cart' });
    await addHeadphonesBtn.click();

    const nameInput = page.getByLabel(/Customer Name/i);
    await nameInput.fill('Vijesh DoubleClick');

    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });

    // Rapid double click
    await Promise.all([
      placeOrderBtn.click(),
      placeOrderBtn.click()
    ]);

    // Verify exactly one confirmation is rendered
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toHaveCount(1);

    // Verify exactly one order reference
    const orderRefs = page.getByTestId('order-reference');
    await expect(orderRefs).toHaveCount(1);

    await page.screenshot({ path: 'screenshots/manual-test-2-rapid-double-click.png', fullPage: true });
  });
});
