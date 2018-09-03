const cards = document.querySelectorAll(".card-box");

const plus = document.querySelectorAll(".plus");

const mapElement = document.getElementById("map");

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const markers = JSON.parse(mapElement.dataset.markers);

const pin = document.getElementById('map').dataset['pin']

const bluePin = document.getElementById('map').dataset['bluepin']

const optimizeButton = document.querySelector('.optimize-button')

var legs = JSON.parse(mapElement.dataset.legs);

/////////////////////////////////

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';

// fetch data from optimization API

let legDistances = [];
let legDurations = [];
// console.log(legDurations)

var api_input = "";
legs.forEach ((leg) => {
  api_input += `${leg[1]},${leg[0]};`
});

api_input = api_input.slice(0, -1);

fetch(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${api_input}?access_token=${mapboxgl.accessToken}`)
  .then(response => response.json())
  .then((data) => {
    // console.log(data)
    const tripLegs = data.trips[0].legs
    tripLegs.forEach((leg) => {
      const legDurationsInMinutes = leg.duration / 60
      const legDistancesInKm = leg.distance / 1000
      const minutes = legDurationsInMinutes % 60;
      const hours = (legDurationsInMinutes - minutes) / 60;
      const finalTime = hours + "hr " + Math.round(minutes) + "mins";
      legDurations.push(finalTime)
      legDistances.push(legDistancesInKm)
    })
    // console.log(tripLegs)
    // console.log(legDurations[0]);
    var num = 0;
    document.querySelectorAll(".duration").forEach(function(ptag){
      ptag.innerHTML = legDurations[num];
      console.log(ptag);
      num++;
    });
  });


// fetch(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${api_input}?access_token=${mapboxgl.accessToken}`)
//   .then(response => response.json())
//   .then((data) => {
//     const tripLegs = data.trips[0].legs
//     tripLegs.forEach((leg) => {
//       // console.log(leg)
//       const legDurationsInMinutes = leg.duration / 60
//       const legDistancesInKm = leg.distance / 1000
//       legDurations.push(legDurationsInMinutes)
//       legDistances.push(legDistancesInKm)
//     })
//     console.log(tripLegs)
//   });

// document.querySelector('.duration').

/////////////////////////////////


var startPoint = [markers[0][1],markers[0][0]];
var alsoStartPoint = startPoint;
var lastQueryTime = 0;
var lastAtRestaurant = 0;
var keepTrack = [];
var currentSchedule = [];
var currentRoute = null;
var pointHopper = {};
var pause = true;
var speedFactor = 50;
// var legs = [[100.565,14.355],[98.998611, 18.795278]]
var count = 0

// const card = document.querySelector('.card-box')
// if (card) {
//   const cardID = card.dataset['name']
//   console.log(cardID)
// }

// Initialize a map
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  center: [markers[0][1], markers[0][0]],
  zoom: 4
});

map.on('load', function() {
  var marker = document.createElement('div');
  marker.classList = 'truck';

  // Create a new marker
  truckMarker = new mapboxgl.Marker(marker)
    .setLngLat(startPoint)
    .addTo(map);

  map.addLayer({
    id: 'warehouse',
    type: 'circle',
    source: {
      data: warehouse,
      type: 'geojson'
    },
    paint: {
      'circle-radius': 0,
      'circle-color': 'white',
      'circle-stroke-color': '#3887be',
      'circle-stroke-width': 3
    }
  });

  // Create a symbol layer on top of circle layer
  map.addLayer({
    id: 'warehouse-symbol',
    type: 'symbol',
    source: {
      data: warehouse,
      type: 'geojson'
    },
    layout: {
      'icon-image': 'grocery-15',
      'icon-size': 1
    },
    paint: {
      'text-color': '#3887be'
    }
  });

  map.addLayer({
    id: 'dropoffs-symbol',
    type: 'symbol',
    source: {
      data: dropoffs,
      type: 'geojson'
    },
    layout: {
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-image': 'marker-15',
    }
  });

  // Add POI markers

  map.loadImage(pin, function(error, image) {
    map.addImage('pin', image);
    //   if (error) throw error;
      markers.forEach((marker) => {
        map.addLayer({
            "id": `${marker[2]}`,
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                      "type": "Feature",
                      "properties": {
                        "description": `<p>${marker[2]}</p>`,
                        "id": `${marker[2]}`
                      },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [marker[1],marker[0]]
                    }
                }]
              }
            },
            "layout": {
                "icon-image": "pin",
                "icon-size": 0.5,
                "icon-allow-overlap": true
            }
      });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
      markers.forEach((marker) => {
        map.on('click', `${marker[2]}`, (ev) => {
          cards.forEach((card) => {
            card.style.borderStyle = "none";
          })
          let cardToLightUp = document.getElementById(`${marker[2]}`)
          cardToLightUp.style.borderStyle = "solid";
          cardToLightUp.style.borderColor = "red";
          cardToLightUp.scrollIntoView({ block: 'end',  behavior: 'smooth' })
        });

        map.on('click', `${marker[2]}`, function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
        })
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', `${marker[2]}`, function () {
          map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', `${marker[2]}`, function () {
          map.getCanvas().style.cursor = '';
      });
    });
  });

  // Pop up when hovering over card

  cards.forEach((card) => {
    card.addEventListener('mouseover', (e) => {
      // var coordinates = .features[0].geometry.coordinates.slice();
      // var description = e.features[0].properties.description;
      console.log(card)
      console.log("mouseover")
      console.log(markers)
      // var coordinates = markers.
      new mapboxgl.Popup()
              // .setLngLat(markers.find{name:card}.coordinates)
              // .setHTML(markers.find{name:card}.description)
              // .addTo(map);
          // console.log(description)
    })
  })

  // Listen for a click on Optimize Button
  optimizeButton.addEventListener('click', (e) => {
    console.log("button pressed")
    for (i = 1; i < legs.length; i++) {
      var coords = {
      lat: legs[i][0],
      lng: legs[i][1]
      }
      newDropoff(coords);
      updateDropoffs(dropoffs);
      count = count + 1
      }
    });

  map.addSource('route', {
    type: 'geojson',
    data: nothing
  });

  map.addLayer({
    id: 'routeline-active',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#93B7BE',
      'line-width': {
        base: 1,
        stops: [[12, 3], [22, 12]]
      }
    }
  }, 'waterway-label');


//end of map load
});

var warehouse = turf.featureCollection([turf.point(alsoStartPoint)]);
var dropoffs = turf.featureCollection([]);
var nothing = turf.featureCollection([]);

function newDropoff(coords) {
  // Store the clicked point as a new GeoJSON feature with
  // two properties: `orderTime` and `key`
  var pt = turf.point(
    [coords.lng, coords.lat],
    {
      orderTime: Date.now(),
      key: Math.random()
    }
  );
  dropoffs.features.push(pt);
  pointHopper[pt.properties.key] = pt;

  // Make a request to the Optimization API
  $.ajax({
    method: 'GET',
    url: assembleQueryURL(),
  }).done(function(data) {
    // Create a GeoJSON feature collection
    var routeGeoJSON = turf.featureCollection([turf.feature(data.trips[0].geometry)]);

    // If there is no route provided, reset
    if (!data.trips[0]) {
      routeGeoJSON = nothing;
    } else {
      // Update the `route` source by getting the route source
      // and setting the data equal to routeGeoJSON
      map.getSource('route')
        .setData(routeGeoJSON);
    }

    if (data.waypoints.length === 12) {
      window.alert('Maximum number of points reached. Read more at mapbox.com/api-documentation/#optimization.');
    }
  });
}



function updateDropoffs(geojson) {
  map.getSource('dropoffs-symbol')
    .setData(geojson);
}

// Here you'll specify all the parameters necessary for requesting a response from the Optimization API
function assembleQueryURL() {

  // Store the location of the truck in a variable called coordinates
  var coordinates = [startPoint];
  var distributions = [];
  keepTrack = [startPoint];

  // Create an array of GeoJSON feature collections for each point
  var restJobs = objectToArray(pointHopper);

  // If there are actually orders from this restaurant
  if (restJobs.length > 0) {

    // Check to see if the request was made after visiting the restaurant
    var needToPickUp = restJobs.filter(function(d, i) {
      return d.properties.orderTime > lastAtRestaurant;
    }).length > 0;

    // If the request was made after picking up from the restaurant,
    // Add the restaurant as an additional stop
    if (needToPickUp) {
      var restaurantIndex = coordinates.length;
      // Add the restaurant as a coordinate
      coordinates.push(alsoStartPoint);
      // push the restaurant itself into the array
      keepTrack.push(pointHopper.warehouse);
    }

    restJobs.forEach(function(d, i) {
      // Add dropoff to list
      keepTrack.push(d);
      coordinates.push(d.geometry.coordinates);
      // if order not yet picked up, add a reroute
      if (needToPickUp && d.properties.orderTime > lastAtRestaurant) {
        distributions.push(restaurantIndex + ',' + (coordinates.length - 1));
      }
    });
  }

  // Set the profile to `driving`
  // Coordinates will include the current location of the truck,
  return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + coordinates.join(';') + '?distributions=' + distributions.join(';') + '&overview=full&steps=true&geometries=geojson&source=first&access_token=' + mapboxgl.accessToken;
}

function objectToArray(obj) {
  var keys = Object.keys(obj);
  var routeGeoJSON = keys.map(function(key) {
    return obj[key];
  });
  return routeGeoJSON;
}


///////////////////////////////

// mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';

plus.forEach(function(element) {
  element.addEventListener("click", (event) => {
    console.log(event.currentTarget.parentNode)
    if (event.currentTarget.classList.contains("fa-plus")) {
      event.currentTarget.classList.add('fa-minus')
      event.currentTarget.classList.remove('fa-plus')
    } else {
      event.currentTarget.classList.remove('fa-minus')
      event.currentTarget.classList.add('fa-plus')
    }

    event.currentTarget.parentNode.classList.toggle("card-active");
  });
});
