import { expect, type Locator, type Page } from '@playwright/test'
import { BasePage } from './basePage'

export class HomePage extends BasePage {
  readonly page: Page
  readonly acceptAll: Locator
  readonly addToCartButtonOnBestSellerSection: Locator
  readonly productName: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.acceptAll = page.getByRole('button', { name: 'Accept All' })
    this.addToCartButtonOnBestSellerSection = page.locator('button[aria-label="Add to Cart"]').first()
    this.productName = page.locator('span[class^="ProductCard_description"]').first()
  }

  async goToHomePage(): Promise<void> {
    await this.page.goto('https://ch-staging.handelnine.dev')
  }

  async acceptCookies(): Promise<void> {
    await expect(this.acceptAll).toBeVisible()
    await this.acceptAll.click()
  }

  async scrollToBestSellerSection(): Promise<void> {
    await this.page.locator('[class^="carousel-root"]').scrollIntoViewIfNeeded()
  }

  async addFirstBestSellerProductToCart(): Promise<void> {
    await expect(this.addToCartButtonOnBestSellerSection).toBeVisible()
    await this.addToCartButtonOnBestSellerSection.click()
  }

  async getProductName(): Promise<string> {
    await expect(this.productName).toBeVisible()
    return await this.productName.innerText()
  }
}
