# Test Results: Mini Checkout – Online Store

## 1. Execution Summary

- **Execution Date**: 2026-11-21
- **Test Engineer Role**: Senior QA Automation Engineer
- **Environment**: Windows 11 Enterprise (x64), Node.js v22.16.0, npm 11.5.2
- **Testing Engine**: Playwright Test v1.50.1
- **Browser Tested**: Chromium 159.0.8154.6 (Playwright chromium v1255)
- **Application URL**: `http://localhost:3000`
- **Total Test Cases Executed**: 5 (3 Mandatory Automated + 2 Mandatory Manual Verification Scenarios)
- **Tests Passed**: 5
- **Tests Failed**: 0
- **Pass Rate**: 100%
- **Overall Quality Gate Status**: **PASSED**

---

## 2. Automated Test Execution Results

```text
Running 5 tests using 1 worker

  ok 1 [chromium] › tests\checkout.spec.js:27:3 › Mini Checkout – Online Store Suite › TEST CASE 1: Successful Checkout (2.8s)
  ok 2 [chromium] › tests\checkout.spec.js:79:3 › Mini Checkout – Online Store Suite › TEST CASE 2: Missing Required Field (813ms)
  ok 3 [chromium] › tests\checkout.spec.js:116:3 › Mini Checkout – Online Store Suite › TEST CASE 3: Quantity and Total Calculation (1.2s)
  ok 4 [chromium] › tests\checkout.spec.js:157:3 › Mini Checkout – Online Store Suite › EXTRA VERIFICATION: Empty Cart Checkout Prevention (737ms)
  ok 5 [chromium] › tests\checkout.spec.js:178:3 › Mini Checkout – Online Store Suite › EXTRA VERIFICATION: Rapid Double-Click Duplicate Order Prevention (683ms)

  5 passed (10.7s)
```

### Detailed Breakdown

#### TEST CASE 1: Successful Checkout
- **Test Objective**: Verify that a customer can successfully place an order with multiple units.
- **Steps Executed**:
  1. Navigated to `http://localhost:3000`.
  2. Clicked "Add to Cart" on Wireless Headphones (`prod-headphones`).
  3. Incremented quantity to 2 units.
  4. Filled Customer Name input with "Vijesh" and optional email "vijesh@example.com".
  5. Clicked "Place Order".
  6. Verified order confirmation element was rendered.
  7. Verified customer name was "Vijesh".
  8. Verified order reference matched regex pattern `^QC-\d{8}-\d{3}$` (actual: `QC-20261121-001`).
  9. Verified exact order total amounted to `₹2,998`.
  10. Verified that exactly one confirmation view was rendered in the DOM.
- **Status**: **PASS**
- **Evidence Screenshot**: `screenshots/test-case-1-successful-checkout.png`

---

#### TEST CASE 2: Missing Required Field
- **Test Objective**: Verify that checkout is blocked when the customer name is omitted.
- **Steps Executed**:
  1. Opened application with fresh context.
  2. Added Wireless Headphones to the cart.
  3. Left Customer Name field blank.
  4. Clicked "Place Order".
  5. Verified validation error message appeared: *"Customer name is required."*
  6. Verified no order confirmation screen was displayed.
  7. Verified the cart retained the 1 Wireless Headphone unit.
  8. Verified cart order total remained unchanged at `₹1,499`.
- **Status**: **PASS**
- **Evidence Screenshot**: `screenshots/test-case-2-missing-required-field.png`

---

#### TEST CASE 3: Quantity and Total Calculation
- **Test Objective**: Verify line totals and cumulative order totals update synchronously without rounding drift.
- **Steps Executed**:
  1. Started with clean cart.
  2. Added Wireless Headphones (Unit Price: ₹1,499).
  3. Verified initial order total: `₹1,499`.
  4. Incremented quantity to 2.
  5. Verified line total updated to `₹2,998` and order total updated to `₹2,998`.
  6. Added Smart Watch (Unit Price: ₹2,499, Quantity: 1).
  7. Verified Smart Watch line total `₹2,499` and cumulative order total updated to `₹5,497` (`₹2,998 + ₹2,499`).
  8. Decremented Wireless Headphones quantity from 2 to 1.
  9. Verified Wireless Headphones line total reverted to `₹1,499` and order total updated to `₹3,998` (`₹1,499 + ₹2,499`).
- **Status**: **PASS**
- **Evidence Screenshot**: `screenshots/test-case-3-quantity-and-total-calculation.png`

---

## 3. Manual Testing Verification

Both mandatory manual checks specified in the project requirements were executed against the running application in Chromium.

### Manual Test 1: Empty Cart Checkout
- **Steps Executed**:
  1. Opened application in browser with an empty cart.
  2. Left cart with 0 items.
  3. Entered valid customer name "Vijesh".
  4. Clicked "Place Order" button.
- **Observed Behavior**:
  - Checkout was blocked immediately.
  - Clear empty-cart alert displayed: *"Please add at least one product to your cart."*
  - No order confirmation appeared.
  - No order reference was generated.
  - Customer name "Vijesh" was preserved in the form.
- **Actual Result**: Verified and working as specified.
- **Status**: **PASS**
- **Evidence Screenshot**: `screenshots/manual-test-1-empty-cart-checkout.png`

### Manual Test 2: Rapid Double-Click Protection
- **Steps Executed**:
  1. Added Wireless Headphones to cart.
  2. Entered customer name "Vijesh DoubleClick".
  3. Simulated rapid back-to-back double-clicking of the "Place Order" button (`Promise.all([click(), click()])`).
- **Observed Behavior**:
  - Immediate submission lock (`isLockedRef`) engaged on the first synchronous event.
  - The submit button state switched to "Processing Order..." and disabled.
  - Exactly one order was processed (`QC-20261121-001`).
  - Exactly one order reference was generated.
  - Exactly one order confirmation was rendered.
  - The button cannot submit the completed order again.
- **Actual Result**: Verified and working as specified.
- **Status**: **PASS**
- **Evidence Screenshot**: `screenshots/manual-test-2-rapid-double-click.png`

---

## 4. Test Evidence & Screenshots Reference

| Test Name | File Path | Verification Point |
| :--- | :--- | :--- |
| Test Case 1 | `screenshots/test-case-1-successful-checkout.png` | Order confirmation screen, reference `QC-20261121-001`, ₹2,998 total. |
| Test Case 2 | `screenshots/test-case-2-missing-required-field.png` | Error message near name input, intact cart state and total ₹1,499. |
| Test Case 3 | `screenshots/test-case-3-quantity-and-total-calculation.png` | Exact arithmetic calculations across dynamic quantity adjustments. |
| Manual Test 1 | `screenshots/manual-test-1-empty-cart-checkout.png` | Inline empty cart banner preventing checkout submission. |
| Manual Test 2 | `screenshots/manual-test-2-rapid-double-click.png` | Single order confirmation card following rapid concurrent button clicks. |
| HTML Report | `playwright-report/index.html` | Self-contained Playwright HTML report with full execution telemetry. |

---

## 5. Defect Log

No defects were observed during the executed automated and manual test scenarios. All functional and accessibility requirements met the acceptance criteria.
