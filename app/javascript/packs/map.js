const cards = document.querySelectorAll(".card-box");

const plus = document.querySelectorAll(".plus");

// plus.addEventListener("click", (event) => {
//   console.log("hi there")
//   card.classList.toggle("card-active");
// });

// const cardID = document.getElementById(`${markers[2]}`)

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

const mapElement = document.getElementById("map");

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const markers = JSON.parse(mapElement.dataset.markers);

const pin = document.getElementById('map').dataset['pin']

const cardID = document.querySelector('.card-box').dataset['name']
console.log(cardID)

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';

// const addLeg = document.getElementById(`${marker[2]}`)

// poi_features = []
// markers.forEach((marker) => {
//   // poi = {
//   //   "type": "Feature",
//   //   "properties": {
//   //       "description": `<p>${marker[2]}</p>`
//   //   },
//   //   "geometry": {
//   //       "type": "Point",
//   //       "coordinates": [marker[1],marker[0]]
//   //   }
//   // }
//   // poi_features.push(poi)
// });

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
  // poi = {
  //   "type": "Feature",
  //   "properties": {
  //       "description": `<p>${marker[2]}</p>`
  //   },
  //   "geometry": {
  //       "type": "Point",
  //       "coordinates": [marker[1],marker[0]]
  //   }
  // }
  // poi_features.push(poi)
    // });

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
      // let add = document.querySelector('.addLeg')
      // add.addEventListener('click', (e) => {
      //   // console.log(coordinates)
      //   // console.log(legs)
      //   // add layerlegs
      //   newLeg(coordinates)
      //   updateLegs(legs)
      // })
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

});


    // OPTIMISATION

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

// var legs = turf.featureCollection([
//   turf.point( [-97.522259, 35.4691]),
//   turf.point( [-97.502754, 35.463455]),
//   turf.point( [-97.508269, 35.463245])
//   ]);
