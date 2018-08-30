const cards = document.querySelectorAll(".card-box");

const plus = document.querySelectorAll(".plus");

const mapElement = document.getElementById("map");

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const markers = JSON.parse(mapElement.dataset.markers);

const pin = document.getElementById('map').dataset['pin']

const bluePin = document.getElementById('map').dataset['bluepin']

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';

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

var keepTrack = [];
var currentSchedule = [];
var currentRoute = null;
var pointHopper = {};
var pause = true;
var speedFactor = 50;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/harryryder/cjldifzen78292spkv4kqj586',
    center: [markers[0][1], markers[0][0]],
    zoom: 4
});

map.on('load', function () {
    // Add a layer showing the places.
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
        map.on('mouseover', `${marker[2]}`, (ev) => {
          // console.log(`${marker[2]}`)
          cards.forEach((card) => {
            card.style.borderStyle = "none";
          })
          let cardToLightUp = document.getElementById(`${marker[2]}`)
          cardToLightUp.style.borderStyle = "solid";
          cardToLightUp.style.borderColor = "red";
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
          console.log(description)
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


  // Add blue pin if POI selected for trip

  map.loadImage(bluePin, function(error, image) {
    map.addImage('bluepin', image);
      // if card is selected by user
      // add blue pin to map over red pin with same coordinates as markers
      // add map.on('click') for blue pins (same code as above)
  });

  // Generate and add route
  // add new layer with an empty source - this will be used to display the route after API request
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
        'line-color': '#3887be',
        'line-width': {
          base: 1,
          stops: [[12, 3], [22, 12]]
        }
      }
    }, 'waterway-label');

});

// var nothing = turf.featureCollection([]);

// (coordinates in thailand)
var nothing = turf.featureCollection([
  turf.point( [13.752222, 100.493889]),
  turf.point( [14.355, 100.565]),
  turf.point( [18.795278, 98.998611])
  ]);


  // OPTIMISATION

  // let add = document.querySelector('.addLeg')
  // add.addEventListener('click', (e) => {
  //   // console.log(coordinates)
  //   // console.log(legs)
  //   // add layerlegs
  //   newLeg(coordinates)
  //   updateLegs(legs)
  // })

  //   map.addLayer({
  //     id: 'legs-symbol',
  //     type: 'symbol',
  //     source: {
  //       data: legs,
  //       type: 'geojson'
  //     },
  //     layout: {
  //       'icon-allow-overlap': true,
  //       'icon-ignore-placement': true,
  //       'icon-image': 'pin',
  //       "icon-size": 0.5
  //     }
  //   });

  // });

    // map.on('click', function(e) {
    //   // When the map is clicked, add a new drop-off point
    //   // and update the `dropoffs-symbol` layer
    //   newLeg(map.unproject(e.point));
    //   updateLegs(legs);
    // });

// function newLeg(coords) {
//   // Store the clicked point as a new GeoJSON feature with
//   // two properties: `orderTime` and `key`
//   var pt = turf.point(
//     [coords[0], coords[1]],
//     {
//       orderTime: Date.now(),
//       key: Math.random()
//     }
//   );
//   legs.features.push(pt);
// }

// function updateLegs(geojson) {
//   map.getSource('legs-symbol')
//     .setData(geojson);
// }

