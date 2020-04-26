
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFycmVsbHkiLCJhIjoiY2s5ZzA3cHVrMGEyaTNla2YyMmZhaWlkbyJ9.FddwgtfiCFnN7yqNLc3ecg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/darrelly/ck9g8nmk60dxy1ik0gqniryaw',
    center: [-96, 37.8],
    zoom: 3
});

var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Washington D.C.',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'San Francisco',
        description: 'San Francisco, California'
      }
    }]
  };

  map.on('load', function() {
    map.loadImage(
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
      function(error, image) {
        if(error) throw error;
      // Add a GeoJSON source with 2 points.
        map.addImage('marker', image);
        map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-77.032, 38.913]
                }
              },
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-122.414, 37.776]
                }
              },
            ]
          }
        });
        
        // Add a symbol layer.
        map.addLayer({
          'id': 'symbols',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'marker',
            'icon-size': 0.042
          }
        });
        // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
        map.on('click', 'symbols', function(e) {
          map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 12});
        });
      }
    );
  });

// add markers to map
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
      .addTo(map);

    //el.addEventListener("click", myFunction);

    //function myFunction() {
      //map.zoom = 15;
      //map.center = marker.geometry.coordinates;
    //}

  });

  