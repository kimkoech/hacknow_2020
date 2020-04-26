mapboxgl.accessToken = 'pk.eyJ1IjoiZGFycmVsbHkiLCJhIjoiY2s5ZzA3cHVrMGEyaTNla2YyMmZhaWlkbyJ9.FddwgtfiCFnN7yqNLc3ecg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/darrelly/ck9g8nmk60dxy1ik0gqniryaw',
    center: [-96, 37.8],
    zoom: 3
});
// add markers

$.each(data, function(idx, story){
  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat([story.lat, story.long])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + story.name + '</h3><p>' + story.story + '</p>'))
    .addTo(map);
})

// TESTING
// var geojson = {
//     type: 'FeatureCollection',
//     features: [{
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-77.032, 38.913]
//       },
//       properties: {
//         title: 'Washington D.C.',
//         description: 'Washington, D.C.'
//       }
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-122.414, 37.776]
//       },
//       properties: {
//         title: 'San Francisco',
//         description: 'San Francisco, California'
//       }
//     }]
//   };
// // add markers to map
// geojson.features.forEach(function(marker) {
//   // create a HTML element for each feature
//   var el = document.createElement('div');
//   el.className = 'marker';

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//     .setLngLat(marker.geometry.coordinates)
//     .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
//     .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
//     .addTo(map);
// });


