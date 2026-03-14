const { test, expect } = require("@playwright/test");
const { text } = require("stream/consumers");

test("Popup validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  //await page.pause();

  page.on("dialog", (dialog) => dialog.accept());

  await page.locator("#confirmbtn").click();

  await page.locator("#mousehover").hover();

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();

  const textCheck = await framesPage.locator(".text h2").textContent();

  console.log(textCheck.split(" ")[1]);

  //await page.goto("https://google.com");
  //await page.goBack();
  //await page.goForward();
});

test("Screenhot & Visual comparision", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "partialscreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
  //await page.pause();
});

//screenshot -- store -> screenshot  ->
test.only("Visual testing ", async ({ page }) => {
  //await page.goto("https://flightaware.com/");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
