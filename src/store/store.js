// объект с данными, обёрнутый в Proxy
// благодаря ловушкам Proxy можно избежать повторного ручного вызова функций, которые зависимы от того или иного свойства объекта

import { reactive } from "../utils/reactivity";

export const store = reactive({
  pending: true,
  ids: [],
  idsCount: 0,
  brands: [],
  products: [],
  items: [],
  currentPage: 1
})

