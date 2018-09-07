import flatpickr from 'flatpickr'

const dateElements = document.querySelectorAll('.flatpickr-input')

dateElements.forEach(dateElement => {
  flatpickr(dateElement, {
    // altInput: true,
    // altFormat: "j, Y",
    // dateFormat: "Y-M-d",
  })
})


