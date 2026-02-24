import { test } from './../Fixtures/generalFixture'
import paymentData from '../test-data/payment.json'
import { Utils } from '../Utils/utils'
import { userDetailsDataWithEmail } from '../Test-Data/dataObjects'

test('Do a success stripe payment', async ({ page, homePage, cartPage, shippingDetailsPage, paymentDetailsPage, orderConfirmationPage }) => {
  let productName: string
  const userWithEmail = userDetailsDataWithEmail()
  const countryInfo = await Utils.getCountryInfo(page)
  const country = countryInfo?.country
  const postalCode = countryInfo?.postalCode
  userWithEmail.country = country
  userWithEmail.zipCode = postalCode!

  await test.step('Add product to cart from best sellers.', async () => {
    await homePage.scrollToBestSellerSection()
    productName = await homePage.getProductName()
    await homePage.addFirstBestSellerProductToCart()
  })

  await test.step('Verify cart, proceed to checkout', async () => {
    await cartPage.verifyCartURL()
    await cartPage.verifyProductNameInCart(0, productName)
    await cartPage.verifyCheckoutButtonVisible()
    await cartPage.clickOnCheckoutButton()
  })

  await test.step('Fill shipping details and continue to payment', async () => {
    await shippingDetailsPage.verifyShippingDetailsURL()
    await shippingDetailsPage.fillUserInformationForm(userWithEmail)
    await shippingDetailsPage.checkSaveThisInformationForNextTime()
    await shippingDetailsPage.clickContinueButton()
  })

  await test.step('Fill payment details and confirm order', async () => {
    await paymentDetailsPage.verifyPaymentDetailsURL()
    await paymentDetailsPage.verifyStripeRadioSelected()
    const { name, cardNumber, expiry, cvv } = paymentData.cardDetails
    await paymentDetailsPage.fillCardDetails(name, cardNumber, expiry, cvv)
    await paymentDetailsPage.clickPayNowButton()
  })

  await test.step('Verify order confirmation', async () => {
    await orderConfirmationPage.verifyOrderConfirmationURL()
    await orderConfirmationPage.verifyOrderConfirmationMessageVisible()
  })
})

test('Select all sort options', async ({ homePage, bestSellersPage }) => {
  await test.step('Navigate to best sellers page', async () => {
    await homePage.verifySearchButtonVisible()
    await homePage.clickOnSearchButton()
  })

  await test.step('Verify best sellers page elements and sort options', async () => {
    await bestSellersPage.verifyBestSellersURL()
    await bestSellersPage.verifyBestSellersTitleVisible()
    await bestSellersPage.verifySortByDropdownVisible()
    await bestSellersPage.verifyDefaultSortOption()
    await bestSellersPage.clickOnSortByDropdown()
    await bestSellersPage.verifySortOptionsVisible()
  })

  await test.step('Select and verify "Low to High" sort option', async () => {
    await bestSellersPage.selectLowToHighSortOption()
    await bestSellersPage.verifySortByDropdownShowsLowToHigh()
  })
})
