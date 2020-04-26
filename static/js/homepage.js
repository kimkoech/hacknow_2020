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
  var tooltip = `<div class='tooltip'><h1>${story.name}</h1><p>${story.story}</p>
  <a href='/post/${idx}' class='tooltip-link'>Read More</a></div>`
  var marker = new mapboxgl.Marker(el)
    .setLngLat([story.lat, story.long])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML(tooltip))
    .addTo(map);

  var markerDiv = marker.getElement();
  var popup = marker.getPopup();
  document.addEventListener('mouseenter', event => {
    if (event.target !== markerDiv && event.target !== popup) {
      return
    }
    popup.addTo(map);
  });
  document.addEventListener('mouseleave', event => {
    if (event.target !== markerDiv && event.target !== popup) {
      return
    }
    popup.remove();
  });
  markerDiv.addEventListener('click', () => map.flyTo({ center: [story.lat, story.long], zoom: 12}));
  document.addEventListener('keypress', () => map.flyTo({ center: [story.lat, story.long], zoom: 3}));
})

// const marker = new mapboxgl.Marker({/* options */});
// const markerDiv = marker.getElement();

// markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
// markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

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


