<script setup>
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";
import axios from 'axios';

var map;
var homeMarker;

onMounted(() => {
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

  axios.get('http://localhost:3001/read')
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
   var type = e.layerType,
      layer = e.layer;
      console.log(e.layer._latlng);
  
    map.removeLayer(homeMarker);
    homeMarker = e.layer;
   map.addLayer(homeMarker);


   axios.post('http://localhost:3001/upload', {
    home: e.layer._latlng
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


  });
});

</script>

<style scoped>
#map {
  height: 600px;
  width: 100%;
}
</style>

<template>
  <div id="map"></div>
</template>