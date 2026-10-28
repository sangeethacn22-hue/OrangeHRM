import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator(
      "h6.oxd-topbar-header-breadcrumb-module",
    );
    this.userDropdown = page.locator(".oxd-userdropdown-tab");
    this.logoutButton = page.locator("a[href*='logout']");
  }

  async expectToBeOnDashboard() {
    await expect(this.page).toHaveURL(/.*\/dashboard\/index/);
    await expect(this.dashboardHeader).toHaveText("Dashboard");
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
  }
}
