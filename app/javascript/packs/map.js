const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/harryryder/cjldifzen78292spkv4kqj586',
zoom: 0
});

map.addControl(new mapboxgl.FullscreenControl());

const pin = document.getElementById('map').dataset['pin']
console.log(pin)


map.on('load', function() {
    map.loadImage(pin, function(error, image) {
        if (error) throw error;

        map.addImage('pin', image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                          "description": "<strong>Big Ben</strong><p>Big Ben is Great!</p>"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-3.9328740744334425, 38.98169520864454]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "pin",
                "icon-size": 0.5
            }
        });
    });
});


// "coordinates": [-3.4, 38.98169520864454]


map.on('click', 'points', function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

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
    map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
    });
