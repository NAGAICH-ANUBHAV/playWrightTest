export interface UserDetailsModel {
  email?: string
  first_name: string
  last_name: string
  address1?: string
  address2?: string
  phone: string | number
  zipCode: string | number
  city: string
  password?: string
  country?: string
}