import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test'

export class OrderConfirmationPage {
    readonly page: Page
    readonly orderConfirmationMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.orderConfirmationMessage = page.getByRole('heading', { level: 3, name: 'Your order has been confirmed.' })
    }

    async verifyOrderConfirmationURL(): Promise<void> {
        await expect(this.page).toHaveURL(/order-confirmation/)
    }

    async verifyOrderConfirmationMessageVisible(): Promise<void> {
        await expect(this.orderConfirmationMessage).toBeVisible()
    }

}