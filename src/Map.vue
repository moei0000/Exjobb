<script setup>
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";

var map;

onMounted(() => {
  // Renders leaflet correctly when refreshing page
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 300);

  // Create map
  map = L.map('map').setView([58.283, 12.293 ], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // FeatureGroup is to store editable layers
  var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl);
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