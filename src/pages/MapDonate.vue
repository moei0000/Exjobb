<script setup>
import "../../leaflet-static-grid";
import "../../leaflet-mark-polygons";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted, toRaw } from "vue";

const selectedCells = defineModel("selectedCells");

let map;

onMounted(() => {
  // Renders leaflet correctly when refreshing page
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 300);

  map = L.map("map").setView([58.283, 12.293], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true,
  }).addTo(map);

  selectedCells.value.forEach((cell) => {
    console.log(toRaw(cell)._bounds);
    let gridCell = L.polygon(
      _invertCoordsArray(
        createPolygonFromPoint(
          cell.geometry.coordinates[0],
          cell.geometry.coordinates[1],
          cell.offset.lat,
          cell.offset.lon
        )
      ),
      {
        color: "yellow",
      }
    );
    gridCell.addTo(map);
  });
  // selectedCells.value.forEach((cell, index) => {

  // });
});

function _invertCoordsArray(array) {
  const newArray = [];
  array.forEach((coords) => {
    coords.forEach((c) => {
      newArray.push([c[1], c[0]]);
    });
  });
  return newArray;
}

function createPolygonFromPoint(lon, lat, latOffset, lonOffset) {
  return [
    [
      [lon, lat],
      [lon, lat + latOffset],
      [lon + lonOffset, lat + latOffset],
      [lon + lonOffset, lat],
      [lon, lat],
    ],
  ];
}
</script>

<template>
  <div id="map"></div>
  <h1>Donate</h1>

  <!-- Card Number -->
  <q-input v-model="donateNumber" label="Card Number" filled />

  <!-- Card Holder -->
  <q-input v-model="donateHolder" label="Card Holder" filled />

  <!-- Expiration date -->
  <!-- Date picker -->

  <!-- CVV -->
  <q-input v-model="donateCVV" label="CVV" filled />

  <!-- Amount -->
  <q-input v-model="donateAmount" label="Amount" filled />

  <ul v-if="selectedCells.length">
    <li v-for="cell in selectedCells" :key="cell._bounds">
      <span>Lat: {{ cell._bounds._southWest.lat }}</span
      ><br />
      <span>Lon: {{ cell._bounds._southWest.lng }}</span>
    </li>
  </ul>
</template>

<style>
#map {
  height: 200px;
  width: 100%;
}
h1 {
  color: green;
  font-size: 13pt;
}
</style>
