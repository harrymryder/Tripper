import autoComplete from 'js-autocomplete'

// select the input
const input = document.getElementById('start-location-autocomplete')

// select the element with a data attribute containing points of interests
const pointsOfInterestElement = document.getElementById('points-of-interest')
// build javascript objects out of a JSON with the points of interests
const pointsOfInterest = JSON.parse(pointsOfInterestElement.dataset.poi)
// select only the names of the poi
const poiNames = pointsOfInterest.map(poi => poi.country)

const suggestion = (term, suggest) => {
  // only keep the names that start like the input value
  const names = poiNames.filter(name => {
    return name.toLowerCase().startsWith(term.toLowerCase())
  })

  // select and clean the dropdown
  const list = document.getElementById('suggestions')
  list.innerHTML = ''

  // iterate on the suggestions names and add them to the drop down
  names.forEach(name => {
    const suggestion = `<div class="suggestion"><p>${name}</p></div>`
    list.insertAdjacentHTML('beforeend', suggestion)
  })

  // add an on click event listener on each suggestion
  document.querySelectorAll('.suggestion').forEach(suggestion => {
    suggestion.addEventListener('click', event => {
      // change input value to the suggestion clicked
      input.value = event.target.innerText
      list.innerHTML = ''
    })
  })
}

const autocomplete = new autoComplete({
  selector: input,
  source: suggestion,
  minChars: 1,

})
