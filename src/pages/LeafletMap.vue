<script setup>
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";
import axios from 'axios';

const model = defineModel();

var map;
var homeMarker;

onMounted(() => {
  // var exampleGeoJSON = {
  //   "type": "FeatureCollection",
  //   "features": [
  //     {
  //       "properties": {},
  //       "type": "Feature",
  //       "geometry": {
  //         "coordinates": [
  //           36.8198475311531,
  //           -1.2952871483350066
  //         ],
  //         "type": "Point"
  //       }
  //     }
  //   ]
  // }

  // Renders leaflet correctly when refreshing page
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 300);

  // Create map
  map = L.map('map').setView([58.283, 12.293], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  axios.get('http://localhost:3001/gethome')
  .then(function (response) {
    console.log(response.data);

    homeMarker = L.marker([response.data[0].home.lat, response.data[0].home.lng]).addTo(map);
  })
  .catch(function (error) {
    console.log(error);
  });

  // FeatureGroup is to store editable layers
  var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
      draw: {
        circle: false,
        circlemarker: false,
        rectangle: false,
        polyline: false,
      },
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {
    const geoJSON = {
      type: "FeatureCollection",
      features: [
      {
        properties: {},
        type: "Feature",
        geometry: {
          coordinates: e.layerType == "marker" ? [e.layer._latlng.lat, e.layer._latlng.lng] : e.layer._latlngs,
          type: e.layerType == "marker" ? "Point" : "Polygon"
        }
      }
      ]
    }
    console.log(geoJSON);
    // If marker update home location
    if(geoJSON.features[0].geometry.type == "Point") { 
      var type = e.layerType,
         layer = e.layer;
      if(homeMarker != null) {
        map.removeLayer(homeMarker);
      }
       homeMarker = e.layer;
      map.addLayer(homeMarker);
      L.geoJSON(geoJSON).addTo(map);

      axios.post('http://localhost:3001/sethome', {
       home: e.layer._latlng
     })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
    }

    // If adding polygon
    if(geoJSON.features[0].geometry.type == "Polygon") {
      // props.polygonData.latlngs = geoJSON.features[0].geometry.coordinates;
      console.log('update leafletmap');
      model.value = 3;
    }


  });
});

</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}
</style>

<template>
  <div>parent bound v-model is: {{ model }}</div>
  <div id="map"></div>
</template>