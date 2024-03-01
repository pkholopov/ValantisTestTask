import md5 from "md5"
import { password } from "./constants"

export const authToken = () => {
  const date = new Date()
  const token = md5(`${password}_${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`)
  return token
}
