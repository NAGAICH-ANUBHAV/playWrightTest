import {test as base} from '@playwright/test'
import { HomePage } from '../Pages/homepage'
import { CartPage } from '../Pages/cartPage'
import { ShippingDetailsPage } from '../Pages/shippingDetailsPage'
import { PaymentDetailsPage } from '../Pages/paymentDetailsPage'
import { OrderConfirmationPage } from '../Pages/orderConfimationPage'
import { BestSellersPage } from '../Pages/bestSellersPage'
import { BasePage } from '../Pages/basePage'

type Pages = {
    homePage: HomePage
    cartPage: CartPage
    shippingDetailsPage: ShippingDetailsPage
    paymentDetailsPage: PaymentDetailsPage
    orderConfirmationPage: OrderConfirmationPage
    bestSellersPage: BestSellersPage
    basePage: BasePage
}

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await homePage.goToHomePage()
        await homePage.waitForPageToLoad()
        await homePage.acceptCookies()
        await homePage.verifyCartIconVisible()
        await homePage.verifySearchButtonVisible()
        use(homePage)
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page)
        use(cartPage)
    },

    shippingDetailsPage: async ({ page }, use) => {
        const shippingDetailsPage = new ShippingDetailsPage(page)
        await shippingDetailsPage.waitForPageToLoad()
        use(shippingDetailsPage)
    },

    paymentDetailsPage: async ({ page }, use) => {
        const paymentDetailsPage = new PaymentDetailsPage(page)
        use(paymentDetailsPage)
    },

    orderConfirmationPage: async ({ page }, use) => {
        const orderConfirmationPage = new OrderConfirmationPage(page)
        use(orderConfirmationPage)
    },

    bestSellersPage: async ({ page }, use) => {
        const bestSellersPage = new BestSellersPage(page)
        use(bestSellersPage)
    },
})