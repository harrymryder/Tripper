const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/harryryder/cjldifzen78292spkv4kqj586',
zoom: 4.0
});

const pin = document.getElementById('map').dataset['pin']

console.log(pin)

map.on('load', function() {
    map.loadImage(pin, function(error, image) {
        if (error) throw error;

        map.addImage('cat', image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0, 0]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "cat",
                "icon-size": 0.25
            }
        });
    });
});

// var geojson = {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "type": "Feature",
//             "properties": {
//                 "message": "Foo",
//                 "iconSize": [60, 60]
//             },
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -66.324462890625,
//                     -16.024695711685304
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {
//                 "message": "Bar",
//                 "iconSize": [50, 50]
//             },
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -61.2158203125,
//                     -15.97189158092897
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {
//                 "message": "Baz",
//                 "iconSize": [40, 40]
//             },
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -63.29223632812499,
//                     -18.28151823530889
//                 ]
//             }
//         }
//     ]
// };

// geojson.features.forEach(function(marker) {
//     // create a DOM element for the marker
//     var el = document.createElement('div');
//     el.className = 'marker';
//     el.style.backgroundImage = 'url(../app/assets/images/pin.png)';
//     el.style.width = marker.properties.iconSize[0] + 'px';
//     el.style.height = marker.properties.iconSize[1] + 'px';

//     el.addEventListener('click', function() {
//         window.alert(marker.properties.message);
//     });

//     // add marker to map
//     new mapboxgl.Marker(el)
//         .setLngLat(marker.geometry.coordinates)
//         .addTo(map);
// });
