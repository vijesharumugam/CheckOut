# Test Plan: Mini Checkout – Online Store

## 1. Testing Objective

The objective of this test plan is to verify the functional correctness, responsiveness, UX reliability, error handling, duplicate order prevention, and reproducible browser automation of the **Mini Checkout – Online Store** e-commerce web application. The testing ensures that order calculations, validation routines, customer state preservation, and confirmation mechanisms function without defects under both automated and manual test scenarios.

---

## 2. Application Scope

The application scope comprises a single-page React and Vite e-commerce checkout interface featuring:
- **Header**: Store branding (`QuickCart`), navigation link, and shopping cart badge with live quantity count.
- **Product Catalog**: Two synthetic products with fixed INR pricing:
  - Wireless Headphones (`₹1,499`, Electronics)
  - Smart Watch (`₹2,499`, Wearables)
  - Local vector illustrations (SVG) and immediate quantity adjustments.
- **Shopping Cart**: Real-time line total calculations (`Price × Quantity`), item additions/removals, quantity increment/decrement with lower bound constraint (`minimum 1`), and empty cart messaging.
- **Order Summary**: Subtotal, free delivery badge, and prominent order total calculated via integer arithmetic (preventing IEEE 754 floating-point inaccuracies).
- **Checkout Form**: Mandatory Customer Name (*), mandatory Phone Number (*), mandatory Address (*), optional Customer Email input, inline accessible validation messages, and preservation of user inputs upon validation errors.
- **Order Confirmation & Duplicate Protection**: Immediate submission locking, unique order reference generation (`QC-YYYYMMDD-XXX`), order breakdown display with delivery info, and single-confirmation enforcement with reset capabilities.

Out of Scope:
- External backend APIs, databases, payment gateways, and user authentication systems (by design specification).

---

## 3. Functional Requirements

| Requirement ID | Description | Acceptance Criteria |
| :--- | :--- | :--- |
| **FR-01** | Add to Cart | User can add products to cart; cart count updates immediately. |
| **FR-02** | Quantity Controls | User can increment and decrement quantities; minimum quantity is strictly 1. |
| **FR-03** | Item Removal | User can remove an item entirely from the cart via the remove control. |
| **FR-04** | Line & Order Totals | Line total = `Price × Qty`. Order total = `Sum of Line Totals`. Integer math used. |
| **FR-05** | Mandatory Fields Validation | Submitting checkout without customer name, phone number, or address is blocked; displays clear error messages near respective inputs. |
| **FR-06** | Empty Cart Validation | Submitting checkout with 0 items is blocked; displays empty cart error message. |
| **FR-07** | Input Preservation | Cart items and entered customer name/email remain intact after validation errors. |
| **FR-08** | Order Confirmation | Valid checkout displays unique reference (`QC-YYYYMMDD-XXX`), customer name, items, and total. |
| **FR-09** | Duplicate Protection | Double-clicking or repeated clicks do not create multiple orders or multiple confirmations. |
| **FR-10** | Order Reset | Customer can click "Start New Order" to start a fresh checkout session. |

---

## 4. High-Priority Checkout Risks & Mitigation

| High-Priority Risk | Impact | Likelihood | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **1. Incorrect Order Total** | High | Low | Derive totals directly from state via integer arithmetic: `sum(price * quantity)`. No floating-point multiplication. |
| **2. Checkout Succeeding with Empty Cart** | High | Medium | Enforce strict cart length check prior to order processing; display inline alert: *"Please add at least one product to your cart."* |
| **3. Checkout Succeeding Without Customer Name** | High | Medium | Enforce non-empty trimmed string validation on `customerName`; trigger accessible error message and focus state. |
| **4. Cart Data Lost After Validation Errors** | High | Medium | Prevent form reset upon validation failure; preserve `cartItems`, `customerName`, and `customerEmail`. |
| **5. Duplicate Orders via Rapid Double-Clicking** | Critical | High | Implement synchronous ref lock (`isLockedRef`) combined with `isSubmitting` state to immediately disregard subsequent clicks. |
| **6. Incorrect Quantity Calculation (Negative / Zero)** | High | Medium | Enforce `quantity >= 1` clamp in state update handler; disable decrement button when quantity is 1. |
| **7. Missing or Duplicate Order Reference** | High | Low | Generate standardized reference `QC-YYYYMMDD-XXX` atomically within the successful submission block. |

---

## 5. Test Environment

- **Operating System**: Windows 11 Enterprise (x64)
- **Node.js Runtime**: v22.16.0
- **Package Manager**: npm 11.5.2
- **Testing Framework**: Playwright Test (`@playwright/test` v1.50.1)
- **Browser**: Chromium 159.0.8154.6 (Playwright build v1255)
- **Base URL**: `http://localhost:3000`
- **Execution Mode**: Headless Chromium with screenshot capture and HTML reporting

---

## 6. Test Cases & Execution Matrix

| Test ID | Test Category | Objective | Preconditions | Test Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Automated | Successful Checkout | Application loaded at `/` with clean state. | 1. Add Wireless Headphones.<br>2. Increase quantity to 2.<br>3. Enter customer name "Vijesh".<br>4. Click "Place Order". | Order confirmation displayed exactly once; customer name is "Vijesh"; order reference matches `QC-YYYYMMDD-XXX`; total is ₹2,998. | Confirmation displayed once; reference `QC-20261121-001`; total ₹2,998 verified. | **PASS** |
| **TC-02** | Automated | Missing Required Field Validation | Clean application state. | 1. Add Wireless Headphones.<br>2. Leave customer name blank.<br>3. Click "Place Order". | Checkout blocked; validation message *"Customer name is required."* visible; cart retains item; total remains ₹1,499. | Blocked; error message displayed; 1 item in cart; total ₹1,499 intact. | **PASS** |
| **TC-03** | Automated | Quantity and Total Calculation | Clean application state. | 1. Add Wireless Headphones (₹1,499).<br>2. Increase quantity to 2 (₹2,998).<br>3. Add Smart Watch (total ₹5,497).<br>4. Decrease Headphones to 1 (total ₹3,998). | All line totals and order total recalculate synchronously after each adjustment without rounding errors. | Line totals and order totals matched ₹1,499, ₹2,998, ₹5,497, and ₹3,998 precisely. | **PASS** |
| **TC-04** | Manual / Automated | Empty Cart Checkout Prevention | Clean application state; cart is empty. | 1. Enter customer name "Vijesh".<br>2. Click "Place Order" with 0 items in cart. | Checkout blocked; alert *"Please add at least one product to your cart."* displayed; no confirmation generated. | Blocked with alert; customer name preserved; no confirmation created. | **PASS** |
| **TC-05** | Manual / Automated | Rapid Double-Click Protection | 1 item in cart; customer name filled. | 1. Add Wireless Headphones.<br>2. Fill name "Vijesh DoubleClick".<br>3. Rapidly double-click "Place Order" simultaneously. | Button disables; only one order reference is generated; exactly one confirmation view renders. | Single order confirmation rendered; exactly 1 order reference generated. | **PASS** |

---

## 7. Pass / Fail Criteria

- **Pass**: 100% of high-priority risks mitigated; all automated tests pass with exact monetary calculations; zero console exceptions; all manual edge cases verified.
- **Fail**: Any calculation drift, duplicate confirmation, submission bypass with empty cart/name, or test assertion failure.
