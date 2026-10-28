import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("OrangeHRM Login Suite", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test("TC01 [Positive] - Successful login with valid credentials", async ({
    page,
  }) => {
    await loginPage.login("Admin", "admin123");
    await dashboardPage.expectToBeOnDashboard();
  });

  test("TC02 [Negative] - Unsuccessful login with invalid password", async ({
    page,
  }) => {
    await loginPage.login("Admin", "WrongPassword123");
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain("Invalid credentials");
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test("TC03 [Negative] - Unsuccessful login with empty fields", async ({
    page,
  }) => {
    await loginPage.login("", "");
    const usernameError = await loginPage.isUsernameRequiredErrorVisible();
    expect(usernameError).toBeTruthy();
  });
});
