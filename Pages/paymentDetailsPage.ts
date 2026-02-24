import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test'

export class PaymentDetailsPage {
    readonly page: Page
    readonly payNowButton: Locator
    readonly stripeRadio: Locator
    readonly iFrameLocator: FrameLocator
    readonly cardName: Locator
    readonly cardNumber: Locator
    readonly cardExpiry: Locator
    readonly cardCvc: Locator
    
    constructor(page: Page) {
        this.page = page
        this.payNowButton = page.getByTestId('pay_now_button')
        this.stripeRadio = page.getByRole('radio', { name: 'Stripe' })
        this.iFrameLocator = page.frameLocator('iframe[title="Secure payment input frame"]')
        this.cardName = page.locator('#cardholder-name')
        this.cardNumber = this.iFrameLocator.locator('input[name="number"]')
        this.cardExpiry = this.iFrameLocator.locator('#Field-expiryInput')
        this.cardCvc = this.iFrameLocator.locator('#Field-cvcInput')
    }

    async verifyPaymentDetailsURL(): Promise<void> {
        await expect(this.page).toHaveURL(/payment-details/)
    }

    async verifyStripeRadioSelected(): Promise<void> {
        await expect(this.stripeRadio).toBeChecked()
    }

    async fillCardDetails(name: string, number: string, expiry: string, cvc: string): Promise<void> {
        await expect(this.payNowButton).toBeVisible()
        await expect(this.cardName).toBeVisible()
        await this.cardName.fill(name)
        await this.page.waitForTimeout(1000)
        await expect(this.cardNumber).toBeVisible()
        await this.cardNumber.fill(number)
        await expect(this.cardExpiry).toBeVisible()
        await this.cardExpiry.fill(expiry)
        await expect(this.cardCvc).toBeVisible()
        await this.cardCvc.fill(cvc)
    }

    async clickPayNowButton(): Promise<void> {
        await Promise.all([this.page.waitForURL(/order-confirmation/), this.payNowButton.click()])
    }

}

