import { action} from "./src/utils/reactivity"
import { getBrands, getIds, getItems,  filter } from "./src/api/services"
import  {store}  from "./src/store/store"
import { tableBody } from "./src/components/TableBody/TableBody"
import { brandSelect } from "./src/components/BrandsSelect/BrandsSelect"
import { pagination } from "./src/components/Pagination/Pagination"
import "./style.css"

// вызываем действие, в которое передаём функцию отрисовки таблицы.
// аргументы функции отрисовки таблицы являются свойствами проксированного объекта
// благодаря этому функция отрисовки будет вызываться всякий раз при изменении значений переменных, выступающих в качестве аргументов
// action определена в файле src/utils/reactivity.js
action(() => {
  tableBody(store.items, store.pending)
})

// аналогично для отрисовки пагинации
action(() => {
  pagination(store.ids.length)
})

// аналогично для отрисовки селекта брендов
action(() => {
  brandSelect(store.brands)
})

let ids

// инициализирующая функция, загружающая данные
const init = async () => {
  store.ids = await getIds()

  // получение данных по id. Коллбэк экшна становится зависим от значения переменной ids
  // и будет срабатывать каждый раз, когда меняются id
  action(async() => {
    ids = store.ids
    store.items = await getItems(ids, 1)
    store.pending = false
  })

  // так же получаем данные по id, но в данном случае работа колбэка зависит от изменения значения текущей страницы
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


// обработчики событий на формах фильтрации
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
