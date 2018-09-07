import flatpickr from 'flatpickr'

const dateElements = document.querySelectorAll('.flatpickr-input')

dateElements.forEach(dateElement => {
  flatpickr(dateElement, {
    dateFormat: "d-M-Y",
  })
})


