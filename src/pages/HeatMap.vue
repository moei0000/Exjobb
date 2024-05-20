<script setup>
import "../../leaflet-static-grid";
import "../../leaflet-mark-polygons";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted, toRaw } from "vue";
import axios from "axios";

let map;
let cells = [];
let maxCountOfCell = {
  worldCount: 0,
  countryCount: 0,
  regionCount: 0,
  neighbourHoodCount: 0,
};

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

  axios.get("http://localhost:3001/heatmap", {}).then(function (response) {
    response.data.forEach((donations) => {
      donations.cells.forEach((cell) => {
        if (
          !cells.find((e) => {
            return (
              e._id.lat === cell[0]._id.lat &&
              e._id.lon === cell[0]._id.lon &&
              e._id.size === cell[0]._id.size
            );
          })
        ) {
          cell[0].count = 1;
          cells.push(cell[0]);
        } else {
          let oldCell = cells.find((e) => {
            return (
              e._id.lat === cell[0]._id.lat &&
              e._id.lon === cell[0]._id.lon &&
              e._id.size === cell[0]._id.size
            );
          });
          oldCell.count++;
        }
      });
    });
    console.log(cells.length);
    for (const cell of cells) {
      if (
        cell.count > maxCountOfCell.worldCount &&
        cell._id.cellSize === 100000
      ) {
        maxCountOfCell.worldCount = cell.count;
      }
      if (
        cell.count > maxCountOfCell.countryCount &&
        cell._id.cellSize === 10000
      ) {
        maxCountOfCell.countryCount = cell.count;
      }
      if (
        cell.count > maxCountOfCell.regionCount &&
        cell._id.cellSize === 1000
      ) {
        maxCountOfCell.regionCount = cell.count;
      }
      if (
        cell.count > maxCountOfCell.neighbourHoodCount &&
        cell._id.cellSize === 100
      ) {
        maxCountOfCell.neighbourHoodCount = cell.count;
      }
    }
    console.log(maxCountOfCell);
    for (const cell of cells) {
      L.polygon(
        _invertCoordsArray(
          createPolygonFromPoint(
            cell.geometry.coordinates[0],
            cell.geometry.coordinates[1],
            cell.offset.lat,
            cell.offset.lon
          )
        ),
        {
          color: `rgb(${
            (cell.count / getMaxCountOfCellFromCellSize(cell._id.cellSize)) *
            255
          }, ${
            (1 -
              cell.count / getMaxCountOfCellFromCellSize(cell._id.cellSize)) *
            255
          }, ${
            (1 -
              cell.count / getMaxCountOfCellFromCellSize(cell._id.cellSize)) *
            255
          })`,
        }
      ).addTo(map);
    }
  });
});

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

function getMaxCountOfCellFromCellSize(cellSize) {
  switch (cellSize) {
    case 100000:
      return maxCountOfCell.worldCount;
    case 10000:
      return maxCountOfCell.countryCount;
    case 1000:
      return maxCountOfCell.regionCount;
    case 100:
      return maxCountOfCell.neighbourHoodCount;
    default:
      break;
  }
}

function _invertCoordsArray(array) {
  const newArray = [];
  array.forEach((coords) => {
    coords.forEach((c) => {
      newArray.push([c[1], c[0]]);
    });
  });
  return newArray;
}
</script>
<style>
#map {
  height: 500px;
  width: 100%;
}
</style>
<template>
  <div id="map"></div>
</template>
