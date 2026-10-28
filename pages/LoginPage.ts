import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("input[name='username']");
    this.passwordInput = page.locator("input[name='password']");
    this.loginButton = page.locator("button[type='submit']");
    this.errorMessage = page.locator(".oxd-alert-content-text");
  }

  async goto() {
    // Hardcoded full URL to avoid any baseURL configuration mismatch
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await expect(this.loginButton).toBeVisible();
  }

  async login(username?: string, password?: string) {
    if (username !== undefined) {
      await this.usernameInput.fill(username);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }

  async getErrorMessageText(): Promise<string> {
    await this.errorMessage.waitFor({ state: "visible" });
    return (await this.errorMessage.textContent()) || "";
  }

  async isUsernameRequiredErrorVisible(): Promise<boolean> {
    const errorSpan = this.page
      .locator("input[name='username']")
      .locator("xpath=../following-sibling::span");
    await errorSpan.waitFor({ state: "visible" });
    return await errorSpan.isVisible();
  }
}
