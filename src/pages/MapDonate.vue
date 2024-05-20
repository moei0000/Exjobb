<script setup>
import "../../leaflet-static-grid";
import "../../leaflet-mark-polygons";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted, toRaw } from "vue";
import axios from "axios";

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
    let cellBounds = toRaw(cell)._bounds;
    let gridCell = L.polygon(
      _invertCoordsArray(
        createPolygonFromPoint(
          cellBounds._southWest.lng,
          cellBounds._southWest.lat,
          cellBounds._northEast.lat - cellBounds._southWest.lat,
          cellBounds._northEast.lng - cellBounds._southWest.lng
        )
      ),
      {
        color: "blue",
      }
    );
    gridCell.addTo(map);
  });
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

function donate() {
  axios
    .post("http://localhost:3001/donate", {
      params: {
        cells: Array.from(selectedCells.value, (cell) => {
          let size = toRaw(cell).size;
          return {
            southWest: toRaw(cell)._bounds._southWest,
            size: size,
          };
        }),
        cardNumber: 0,
        cardHolder: 0,
        cvv: 0,
        amount: 100,
      },
    })
    .then(function (response) {
      console.log(response);
    });
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
  <br />
  <q-btn color="primary" label="Donate" v-on:click="donate" />
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
