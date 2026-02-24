import { expect, type Locator, type Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartItem: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.cartItem = this.page.locator('[data-sentry-component="CartItem"]')
    this.checkoutButton = page.getByTestId('cart_proceed_button')
  }

  async verifyCartURL(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/)
  }

  async getCartProductNameByIndex(index: number): Promise<string> {
    const productNameLocator = this.cartItem.nth(index).getByRole('link').filter({ hasText: /\S+/ })
    await expect(productNameLocator).toBeVisible()
    return await productNameLocator.innerText()
  }

  async verifyCheckoutButtonVisible(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible()
  }

  async clickOnCheckoutButton(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible()
    await Promise.all([this.page.waitForURL(/shipping-details/), this.checkoutButton.click()])
  }

  async verifyProductNameInCart(index: number, productName: string): Promise<void> {
    const cartProductName = await this.getCartProductNameByIndex(index)
    expect(cartProductName).toEqual(productName)
  }
}
