import { limit } from "../../utils/constants"
import { store } from "../../store/store"

export const pagination = (totalItems) => {
  const totalPages = Math.ceil(totalItems / limit)
  const paginationRoot = document.querySelector('[data-pagination]')
  const prevButton = document.createElement('button')
  prevButton.setAttribute('class', 'h-8 bg-indigo-200 px-2 py-1 m-1 rounded hover:bg-indigo-300 disabled:opacity-50 disabled:hover:bg-indigo-200 disabled:cursor-not-allowed')
  prevButton.innerHTML = '&lt; Назад'
  const nextButton = document.createElement('button')
  nextButton.setAttribute('class', 'h-8 bg-indigo-200 px-2 py-1 m-1 rounded hover:bg-indigo-300 disabled:opacity-50 disabled:hover:bg-indigo-200 disabled:cursor-not-allowed')
  nextButton.innerHTML = 'Вперед &gt;'

  if(store.currentPage === 1) prevButton.setAttribute('disabled', 'true')
  if(store.currentPage >= totalPages) nextButton.setAttribute('disabled', 'true')

  const pageCounter = document.createElement('div')
  pageCounter.setAttribute('class', 'self-center px-4 text-sm')

  const pageCounterInput = document.createElement('input')
  pageCounterInput.setAttribute('type', 'number')
  pageCounterInput.setAttribute('min', '1')
  pageCounterInput.setAttribute('max', totalPages)
  pageCounterInput.setAttribute('value', store.currentPage)
  pageCounterInput.setAttribute('class', 'text-right w-12 p-1 border rounded outline-indigo-200')

  pageCounter.append(pageCounterInput)
  pageCounter.append(`страница. Всего страниц: ${totalPages}`)

  pageCounterInput.addEventListener('change', async() => {
    if(pageCounterInput.value < 1) pageCounterInput.value = 1
    if(pageCounterInput.value > totalPages) pageCounterInput.value = totalPages
    store.currentPage = pageCounterInput.value
    store.pending = true
  })

  prevButton.addEventListener('click', async() => {
    if(store.currentPage > 1) {
      store.currentPage--
      store.pending = true
    }
  })
  nextButton.addEventListener('click', async() => {
    if(store.currentPage < totalPages) {
      store.currentPage++
      store.pending = true
    }
  })

  paginationRoot.innerHTML = ''
  paginationRoot.append(prevButton, pageCounter, nextButton)
}
