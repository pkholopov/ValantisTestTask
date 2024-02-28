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

