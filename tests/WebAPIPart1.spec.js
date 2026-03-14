const { test, expect, request } = require("@playwright/test");
const loginPayLoad = {
  userEmail: "dsankrit1995@gmail.com",
  userPassword: "Summar@28",
};
const orderPayload = {
  orders: { country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" },
};

let token;
let orderId;

test.beforeAll(async () => {
  //Login API
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayLoad,
    },
  );
  expect(await loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.token;
  console.log(token);

  //

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    },
  );
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {});

test("Client App login", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");
  //const products = page.locator(".card-body");
  await page.locator("button[roterlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  //const count = await products.count();
  for (let i = 0; i < count; ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();

  await page.pause();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
