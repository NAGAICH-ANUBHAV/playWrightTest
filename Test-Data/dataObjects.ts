import { UserDetailsModel } from "../e2e_model/userData"
import { Utils } from "../Utils/utils"

export function userDetailsDataWithEmail(): UserDetailsModel {
  return {
    email: `${Utils.getRandomString(5)}-auto@${Utils.getRandomString(5)}.com`,
    first_name: Utils.getRandomString(5).concat('auto'),
    last_name: Utils.getRandomString(5).concat('auto'),
    address1: Utils.getRandomString(20).concat('auto'),
    phone: 1234567890,
    zipCode: 'AA9A 9AA',
    city: 'London',
  }
}

//test