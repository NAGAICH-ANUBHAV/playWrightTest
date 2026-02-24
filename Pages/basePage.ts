import { expect, type Locator, type Page } from '@playwright/test'


export class BasePage {
  readonly page: Page
  readonly cartIcon: Locator
  readonly searchButton: Locator

    constructor(page: Page) {
    this.page = page
    this.cartIcon = page.locator('a[aria-label="Cart"]')
    this.searchButton = page.getByRole('button', { name: 'Search' })
    }

    async verifyURL(url: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url)
    }

    async waitForPageToLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded')
  }

  async verifyCartIconVisible(): Promise<void> {
    await expect(this.cartIcon).toBeVisible()
  }

   async verifySearchButtonVisible(): Promise<void> {
    await expect(this.searchButton).toBeVisible()
  }

  async clickOnSearchButton(): Promise<void> {
    await expect(this.searchButton).toBeVisible()
    await this.searchButton.click()
  }


}