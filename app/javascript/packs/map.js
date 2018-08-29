const mapElement = document.getElementById("map");

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const markers = JSON.parse(mapElement.dataset.markers);

const pin = document.getElementById('map').dataset['pin']

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';

poi_features = []
markers.forEach((marker) => {
  poi = {
    "type": "Feature",
    "properties": {
        "description": `<strong>${marker[2]}</strong><p>${marker[3]}</p>`,
    },
    "geometry": {
        "type": "Point",
        "coordinates": [marker[1],marker[0]]
    }
  }
  poi_features.push(poi)
});
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxjOGpweGc0bmNuM3Fxa3UzMnppOXo4In0.xn2gXm4R3rTIQaGNEXQdWg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/harryryder/cjldifzen78292spkv4kqj586',
    center: [markers[0][1], markers[0][0]],
    zoom: 4
});

map.on('load', function () {
    // Add a layer showing the places.
    map.loadImage(pin, function(error, image) {
      if (error) throw error;

      map.addImage('pin', image);
      map.addLayer({
          "id": "places",
          "type": "symbol",
          "source": {
              "type": "geojson",
              "data": {
                  "type": "FeatureCollection",
                  "features": poi_features
              }
          },
          "layout": {
              "icon-image": "pin",
              "icon-size": 0.5,
              "icon-allow-overlap": true
          }
      });
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', function (e) {
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
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});
