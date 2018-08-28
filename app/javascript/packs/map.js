const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnlyeWRlciIsImEiOiJjamxkbDZ6eHYwOGxjM3dydjk4NGlyZHNtIn0.3I7XiB1k09ti1TZ3o2UH3A';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/harryryder/cjldifzen78292spkv4kqj586',
center: [-83.044818, 21.449322],
zoom: 4.0
});

console.log(map)
