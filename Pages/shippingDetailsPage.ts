import { expect, type Locator, type Page } from '@playwright/test'
import { UserDetailsModel } from '../e2e_model/userData'
import { BasePage } from './basePage'

export class ShippingDetailsPage extends BasePage {
  readonly page: Page
  readonly basePage: BasePage
  readonly emailInput: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly addressInput1: Locator
  readonly addressInput2: Locator
  readonly cityInput: Locator
  readonly postalCodeInput: Locator
  readonly phoneInput: Locator
  readonly saveThisInformationForNextTime: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.basePage = new BasePage(page)
    this.emailInput = page.getByRole('textbox', { name: 'email' })
    this.firstNameInput = page.locator('#firstname')
    this.lastNameInput = page.locator('#lastname')
    this.addressInput1 = page.locator('#address1')
    this.addressInput2 = page.locator('#address2')
    this.cityInput = page.locator('#city')
    this.postalCodeInput = page.locator('#zipcode')
    this.phoneInput = page.locator('#phone')
    this.saveThisInformationForNextTime = page.locator('#saveNext')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
  }

  async verifyShippingDetailsURL(): Promise<void> {
    await this.basePage.verifyURL(/shipping-details/)
  }

  async fillEmailInput(email: string): Promise<void> {
    await expect(this.emailInput).toBeVisible()
    await expect(this.emailInput).toBeEditable()
    await this.emailInput.fill(email)
  }

  async fillFirstNameInput(firstName: string): Promise<void> {
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.firstNameInput).toBeEditable()
    await this.firstNameInput.fill(firstName)
  }

  async fillLastNameInput(lastName: string): Promise<void> {
    await expect(this.lastNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeEditable()
    await this.lastNameInput.fill(lastName)
  }

  async fillAddressInput(address1: string): Promise<void> {
    await expect(this.addressInput1).toBeVisible()
    await expect(this.addressInput1).toBeEditable()
    await this.addressInput1.fill(address1)
  }

  async fillZipCodeInput(postalCode: string): Promise<void> {
    await expect(this.postalCodeInput).toBeVisible()
    await expect(this.postalCodeInput).toBeEditable()
    await this.postalCodeInput.fill(postalCode)
  }

  async fillCityInput(city: string): Promise<void> {
    await expect(this.cityInput).toBeVisible()
    await expect(this.cityInput).toBeEditable()
    await this.cityInput.fill(city)
  }

  async fillPhoneInput(phone: string): Promise<void> {
    await expect(this.phoneInput).toBeVisible()
    await expect(this.phoneInput).toBeEditable()
    await this.phoneInput.fill(phone)
  }

  async fillUserInformationForm(shippingDetailsObject: UserDetailsModel): Promise<void> {
    await this.page.waitForTimeout(1000) // to improve

    if (shippingDetailsObject.email && (await this.emailInput.isVisible())) {
      await this.fillEmailInput(shippingDetailsObject.email.toString())
    }

    await this.fillFirstNameInput(shippingDetailsObject.first_name)
    await expect(this.firstNameInput).toHaveValue(shippingDetailsObject.first_name)

    await this.fillLastNameInput(shippingDetailsObject.last_name)
    await expect(this.lastNameInput).toHaveValue(shippingDetailsObject.last_name)

    await this.fillAddressInput(shippingDetailsObject.address1 || 'test address1')
    await expect(this.addressInput1).toHaveValue(shippingDetailsObject.address1 || 'test address1')

    if (shippingDetailsObject.address2) {
      await expect(this.addressInput2).toBeEditable()
      await this.addressInput2.fill(shippingDetailsObject.address2)
      await expect(this.addressInput2).toHaveValue(shippingDetailsObject.address2)
    }

    await expect(this.phoneInput).toBeEditable()
    await this.phoneInput.fill(shippingDetailsObject.phone.toString())
    await expect(this.phoneInput).toHaveValue(shippingDetailsObject.phone.toString())

    await this.fillZipCodeInput(shippingDetailsObject.zipCode.toString())

    await this.cityInput.isEditable()
    await this.cityInput.fill(shippingDetailsObject.city)
    await expect(this.cityInput).toHaveValue(shippingDetailsObject.city)

    await this.page.waitForTimeout(2000) // to improve
  }

  async checkSaveThisInformationForNextTime(): Promise<void> {
    await expect(this.saveThisInformationForNextTime).toBeVisible()
    await this.saveThisInformationForNextTime.check()
  }

  async clickContinueButton(): Promise<void> {
    await expect(this.continueButton).toBeVisible()
    await this.continueButton.click()
  }

}
