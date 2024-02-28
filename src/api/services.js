import { $axios } from "./$axios"
import { limit } from "../utils/constants"
import { store } from "../store/store"

export const getIds = async () => {
  const result = await $axios({
    data: {
      action: "get_ids",
    }
  })
  return [...new Set(result.data.result)]
}

export const getItems = async (ids, page = 1) => {
  const offset = (page - 1) * limit
  ids = ids.slice(offset, offset + limit)
  const result = await $axios({
    data: {
      action: "get_items",
      params: {ids}
    }
  })
  const buffer = {}
  const items = result.data.result.filter(item => {
    if(!buffer[item.id]) {
      buffer[item.id] = true
      return true
    }
    return false
  })
  return items
}

export const getBrands = async () => {
  const result = await $axios({
    data: {
      action: "get_fields",
      params: {field: "brand"}
    }
  })
  return [...new Set(result.data.result)]
}

export const filter = async (params) => {
  const result = await $axios({
    data: {
      action: "filter",
      params
    }
  })
  return [...new Set(result.data.result)]
}
