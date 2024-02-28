import loader from "../../../loader.gif"
import { store } from "../../store/store"
import { limit } from "../../utils/constants"

export const tableBody = (items, pending) => {
  let startCount = (store.currentPage - 1) * limit
  const tableBody = document.querySelector('[data-tbody]')
  if(pending) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.setAttribute('colspan', '5')
    td.setAttribute('class', 'w-full h-32 text-center')
    const loaderImg = document.createElement('img')
    loaderImg.setAttribute('src', loader)
    loaderImg.setAttribute('class', 'mx-auto')
    td.append(loaderImg)
    tr.append(td)
    tableBody.innerHTML = ''
    tableBody.append(tr)
  }else if(!items.length && !pending) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.setAttribute('colspan', '5')
    td.setAttribute('class', 'h-32 text-center')
    td.textContent = 'Нет данных'
    tr.append(td)
    tableBody.innerHTML = ''
    tableBody.append(tr)
  } else {
    const mapped = items.map((item) => (
      `<tr key=${item.id} class="divide-x bg-white even:bg-gray-200 hover:bg-indigo-200 *:p-2">
        <td class="text-center">${++startCount}</td>
        <td class="text-center">${item.id}</td>
        <td class="font-semibold">${item.product}</td>
        <td>${item.brand ? item.brand : "Без бренда"}</td>
        <td class="text-right">${item.price} &#8381</td>
      </tr>`
    )).join('')
    tableBody.innerHTML = mapped
  }
  
}
