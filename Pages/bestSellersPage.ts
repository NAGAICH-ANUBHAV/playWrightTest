import { expect, type Locator, type Page } from '@playwright/test'

export class BestSellersPage {
    readonly page: Page //instance variable
    readonly bestsellersHeader: Locator
    readonly filterContainer: Locator
    readonly sortByDropdown: Locator
    readonly sortByOptions: Locator

    constructor(page: Page) //property initialization 
    {
        this.page = page //initializing instance variable
        this.bestsellersHeader = page.getByRole('heading', { level: 1, name: 'Best Sellers' })
        this.filterContainer = page.locator('#options-menu')
        this.sortByDropdown = this.filterContainer.filter({ hasText: 'Sort by' })
        this.sortByOptions = page.locator('span[class^="SortDropdownMenu_sortDropdownLink"]')
    }

    async verifyBestSellersURL(): Promise<void> {
        await expect(this.page).toHaveURL(/bestsellers/)
    }

    async verifyBestSellersTitleVisible(): Promise<void> {
        await expect(this.bestsellersHeader).toBeVisible()
    }

    async verifySortByDropdownVisible(): Promise<void> {
        await expect(this.sortByDropdown).toBeVisible()
    }

    async verifyDefaultSortOption(): Promise<void> {
        await expect(this.sortByDropdown).toHaveText(/Relevance/)
    }

    async clickOnSortByDropdown(): Promise<void> {
        await expect(this.sortByDropdown).toBeVisible()
        await this.sortByDropdown.click()
    }

    async verifySortOptionsVisible(): Promise<void> {
        await expect(this.sortByOptions.filter({ hasText: 'Price: Low to High' })).toBeVisible()
        await expect(this.sortByOptions.filter({ hasText: 'Price: High to Low' })).toBeVisible()
        await expect(this.sortByOptions.filter({ hasText: 'Relevance' })).toBeVisible()
        await expect(this.sortByOptions.filter({ hasText: 'Bestsellers' })).toBeVisible()
    }

    async selectSortOption(option: string): Promise<void> {
        const optionLocator = this.sortByOptions.filter({ hasText: option })
        await expect(optionLocator).toBeVisible()
        await optionLocator.click()
    }

    async selectLowToHighSortOption(): Promise<void> {
        await this.selectSortOption('Price: Low to High')
    }

    async verifySortByDropdownShowsLowToHigh(): Promise<void> {
        await expect(this.sortByDropdown).toHaveText(/Price: Low to high/)
    }
}