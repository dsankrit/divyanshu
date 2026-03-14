const { test, expect } = require("@playwright/test");

test("@webst Client App login", async ({ page }) => {
  const email = "dsankrit1995@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Summar@28");
  await page.getByRole("button", { name: "Login" }).click();

  //await page.locator("[value='Login']").click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();

  //const titles = await page.locator(".card-body b").allTextContents();

  //console.log(titles);

  // const count = await products.count();
  // for (let i = 0; i < count; i++) {
  //   if ((await products.nth(i).locator("b").textContent()) === productName) {
  //     // add to cart
  //     await products.nth(i).locator("text= Add To Cart").click();
  //     break;
  //   }
  // }
  // await page.pause();

  //await page.locator("[routerlink*='cart']").click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();

  //const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  //expect(bool).toBeTruthy();

  //await page.locator("text=Checkout").click();
  await page.getByRole("button", { name: "checkout" }).click();

  //await page.locator("[placeholder*=Country]").pressSequentially("ind");
  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.getByRole("button", { name: "India" }).nth(1).click();

  // const dropdown = page.locator(".ta-results");
  // await dropdown.waitFor();
  // const optionCount = await dropdown.locator("button").count();
  // for (let i = 0; i < optionCount; i++) {
  //   const text = await dropdown.locator("button").nth(i).textContent();
  //   if (text === " India") {
  //     // click -
  //     await dropdown.locator("button").nth(i).click();
  //     break;
  //   }
  // }

  //await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  //await page.locator(".action__submit").click();
  await page.getByText("PLACE ORDER").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

//   await expect(page.locator(".hero-primary")).toHaveText(
//     " Thankyou for the order.",
//   );
//   const oredrId = await page
//     .locator(".em-spacer-1 .ng-star-inserted")
//     .textContent();
//   console.log(oredrId);

//   await page.locator("button[routerlink*='myorders']").click();
//   await page.locator("tbody").waitFor();
//   const rows = await page.locator("tbody tr");

//   for (let i = 0; i < (await rows.count()); i++) {
//     const rowOrderId = await rows.nth(i).locator("th").textContent();
//     if (oredrId.includes(rowOrderId)) {
//       await rows.nth(i).locator("button").first().click();
//       break;
//     }
//   }

//   const orderIdDetails = await page.locator(".col-text").textContent();
//   expect(oredrId.includes(orderIdDetails)).toBeTruthy();

//   //await page.pause();

//   // Zara Coat 3
// });
