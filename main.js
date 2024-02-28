import { action} from "./src/utils/reactivity"
import { getBrands, getIds, getItems,  filter } from "./src/api/services"
import  {store}  from "./src/store/store"
import { tableBody } from "./src/components/TableBody/TableBody"
import { brandSelect } from "./src/components/BrandsSelect/BrandsSelect"
import { pagination } from "./src/components/Pagination/Pagination"
import "./style.css"

action(() => {
  tableBody(store.items, store.pending)
})

action(() => {
  pagination(store.ids.length)
})

action(() => {
  brandSelect(store.brands)
})

let ids

const init = async () => {
  store.ids = await getIds()

  action(async() => {
    ids = store.ids
    store.items = await getItems(ids, 1)
    store.pending = false
  })

  action(async() => {
    if(store.currentPage !== 1) {
      store.items = await getItems(ids, store.currentPage)
      store.pending = false
    }
  })

  store.brands = await getBrands()
}

window.addEventListener('DOMContentLoaded', async () => {
  await init()
})

const productSearchForm = document.querySelector('[data-product-search-form]')
productSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  store.currentPage = 1
  const product = event.target.product.value
  store.pending = true
  store.ids = await filter({product})
})

const priceSearchForm = document.querySelector('[data-price-search-form]')
priceSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  store.currentPage = 1
  const price = Number(event.target.price.value)
  store.pending = true
  store.ids = await filter({price})
})

const resetButton = document.querySelector('[data-reset]')
resetButton.addEventListener('click', async () => {
  productSearchForm.product.value = ''
  priceSearchForm.price.value = ''
  document.querySelector('[data-brands-select] select').options[0].selected = true
  store.pending = true
  store.ids = await getIds()
})

const topButton = document.querySelector('[data-top-button]')
topButton.addEventListener('click', async (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
})

window.addEventListener('scroll', () => {
  if(window.scrollY > 100) {
    topButton.classList.remove('hidden')
    topButton.classList.add('flex')
  } else {
    topButton.classList.add('hidden')
    topButton.classList.remove('flex')
  }
})
