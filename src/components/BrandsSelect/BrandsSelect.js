import { filter } from "../../api/services"
import { store } from "../../store/store"

export const brandSelect = (brands) => {
  const selectLabel = document.querySelector('[data-brands-select]')
  const select = document.createElement('select')
  select.setAttribute('class', 'p-1 border rounded outline-indigo-200')
  const firstOption = document.createElement('option')
  firstOption.textContent = 'Фильтр по бренду'
  firstOption.setAttribute('disabled', 'true')
  firstOption.setAttribute('selected', 'true')

  const options = brands.map(brand => {
    const option = document.createElement('option')
    option.value = brand ? brand : ''
    option.textContent = brand ? brand : 'Без бренда'
    return option
  })

  options.unshift(firstOption)
  selectLabel.innerHTML = ''
  selectLabel.append(select)
  select.append(...options)
  
  select.addEventListener('change', async (event) => {
    store.currentPage = 1
    store.pending = true
    const brand = event.target.value === '' ? null : event.target.value
    store.ids = await filter({brand})
  })
}
