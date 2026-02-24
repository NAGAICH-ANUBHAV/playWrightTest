import { Page } from 'playwright'

export class Utils {
  static getRandomNumber(endNumber: number): number {
    return Math.floor(Math.random() * (endNumber + 1))
  }

  static getRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)])
      .join('')
      .toLowerCase()
  }

   static async getCountryInfo(page: Page): Promise<{ country: string; postalCode: string; country_iso: string; phoneCode: string }> {
    const urlStr = page.url()
    const url = new URL(urlStr)
    const hostnameParts = url.hostname.toLowerCase().split('.')
    let domain = ''

    if (hostnameParts.length === 2) {
      domain = hostnameParts[1]
    } else if (hostnameParts.length >= 3) {
      const possibleCountry = hostnameParts[0]
      const secondLevelDomain = hostnameParts[hostnameParts.length - 2]

      if (possibleCountry.length === 2) {
        domain = possibleCountry
      } else if (secondLevelDomain.length === 2) {
        domain = secondLevelDomain
      } else {
        domain = hostnameParts[hostnameParts.length - 1]
      }
    }
    if (hostnameParts.length === 2) {
      domain = hostnameParts[1]
    } else if (hostnameParts.length >= 3) {
      const possibleCountry = hostnameParts[0]
      const secondLevelDomain = hostnameParts[hostnameParts.length - 2]

      if (possibleCountry.length === 2) {
        domain = possibleCountry
      } else if (secondLevelDomain.length === 2) {
        domain = secondLevelDomain
      } else {
        domain = hostnameParts[hostnameParts.length - 1]
      }
    }

    const countryMap: Record<string, { country: string; postalCode: string; country_iso: string; phoneCode: string }> = {
      dev: { country: 'United Kingdom', postalCode: 'AA9A 9AA', country_iso: 'GB', phoneCode: '+44' },
      uk: { country: 'United Kingdom', postalCode: 'AA9A 9AA', country_iso: 'GB', phoneCode: '+44' },
      fr: { country: 'France', postalCode: '75008', country_iso: 'FR', phoneCode: '+33' },
      ch: { country: 'Switzerland', postalCode: '3030', country_iso: 'CH', phoneCode: '+41' },
      ca: { country: 'Canada', postalCode: 'K1A 0B1', country_iso: 'CA', phoneCode: '+1' },
      at: { country: 'Austria', postalCode: '2000', country_iso: 'AT', phoneCode: '+43' },
      nz: { country: 'New Zealand', postalCode: '5320', country_iso: 'NZ', phoneCode: '+64' },
      sa: { country: 'Saudi Arabia', postalCode: '65511', country_iso: 'SA', phoneCode: '+966' },
      ae: { country: 'United Arab Emirates', postalCode: '88888', country_iso: 'AE', phoneCode: '+971' },
      cz: { country: 'Czechia', postalCode: '37004', country_iso: 'CZ', phoneCode: '+420' },
      ie: { country: 'Ireland', postalCode: 'W23 F854', country_iso: 'IE', phoneCode: '+353' },
      au: { country: 'Australia', postalCode: '2599', country_iso: 'AU', phoneCode: '+61' },
    }

    return countryMap[domain!] || null
  }
}