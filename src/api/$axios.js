/*
создаём экземпляр axios'а с настройками, которые не меняются от запроса к запросу: базовый url и метод запроса

создаём перехватчики на запрос и ответ.

добавляем к каждому запросу хедер с токеном

в перехватчике ответа проверяем ответ на ошибки. В случае ошибки выводим ошибку в консоль и производим повтор запроса
*/

import axios from "axios";
import { authToken } from "../utils/authToken";
import { baseURL } from "../utils/constants";

const errorMessage = (error, lastTry = false) => {
  console.error(`Ошибка запроса:\nСообщение: ${error.response.statusText}\nКод: ${error.response.status}\nДанные: ${error.response.data}`);
  lastTry 
    ? console.info("Повторите запрос вручную")
    : console.info("Повтор запроса...")
}

export const $axios = axios.create({
  baseURL,
  method: "POST",
});

$axios.interceptors.request.use(
  (config) => {
    config.headers["x-auth"] = `${authToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

$axios.interceptors.response.use(
  undefined,
  (error) => {
    if (!error.config.isRetry) {
      error.config.isRetry = true
      errorMessage(error)
      return $axios.request(error.config)
    } else {
      errorMessage(error, true)
      return Promise.reject(error)
    }
  }
)
