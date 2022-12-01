/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftb3JudGl5YW5nIiwiYSI6ImNrdDJmZWZmdDBvdDkyd3BrazJyenM3ZGgifQ.kFrXpm_qa8AOer5AxDgIew'; 
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/samorntiyang/cktjwmeue4gnp17mqk99fnwqg',
  center: [-2.212, -7.591],
  zoom: 2.00
});


map.on('load', e => {
  let layers = [{
      "name": "Arabica",
      "color": "#84a4f5"
    },
    {
      "name": "Robusta",
      "color": "#f7f397"
    }
  ];

  let legend = document.querySelector('#legend');

  for (let layer of layers) {
    let item = document.createElement('div');

    let key = document.createElement('span');
    key.classList.add('legend-key');
    key.style.backgroundColor = layer.color;

    let value = document.createElement('span');
    value.innerHTML = layer.name;

    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }

  map.on('mousemove', e => {
    let coffeeInfo = map.queryRenderedFeatures(e.point, {
      layers: ['raw coffee']
    });
    

    if (coffeeInfo.length > 0) {
      console.log(coffeeInfo[0].properties.color);
      /*document.querySelector('#info').innerHTML = '<p>' + buildinginfo[0].properties.status + 
        '</p><p><em>' + buildinginfo[0].properties.address + '</em></p>';*/
    } else {
      console.log('Move your mouse over a point to view details');
      /*document.querySelector('#info').innerHTML = '<p>Move your mouse over a building to view details.</p>';*/
    }
  });
  // Change the icon to a pointer icon when you mouse over a building
  map.on('mouseenter', 'raw coffee', e => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pan icon when it leaves.
  map.on('mouseleave', 'raw coffee', e => {
      map.getCanvas().style.cursor = '';
  });

  // Add pop-up on a pointer:
  map.on('click', 'raw coffee', e => {
    console.log(e.features[0].properties);
    new mapboxgl.Popup()
     .setLngLat(e.lngLat)
    .setHTML('<span class="popup-address">' + e.features[0].properties.country_of_origin + '</span><br>Altitude:' + e.features[0].properties.altitude_mean_meters + ' meters<br>Color type: ' + e.features[0].properties.color + '<br>Farm name: ' + e.features[0].properties.farm_name )
    .addTo(map);
});

});

map.on('idle',function(){
  map.resize()
})



 