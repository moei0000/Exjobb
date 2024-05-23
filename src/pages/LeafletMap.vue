<script setup>
import "../../leaflet-static-grid";
import "../../leaflet-mark-polygons";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted, toRaw } from "vue";
import axios from "axios";

import { inverse } from "mgrs";

const leafletPolygon = defineModel("leafletPolygon");
const selectedCells = defineModel("selectedCells");
const polygonArea = defineModel("polygonArea");
const regionMinArea = defineModel("regionMinSlider");
const countryMinArea = defineModel("countryMinSlider");
const worldMinArea = defineModel("worldMinSlider");

let map;

// Markmode true will set cells to markSetting
let markMode = false;
// Wheter to to select or deselct a cell while in markmode
let markSetting = false;

/**
 * Inverts the latitude and longitude of an array
 * @param {*} array
 */
function _invertCoordsArray(array) {
  const newArray = [];
  array.forEach((coords) => {
    coords.forEach((c) => {
      newArray.push([c[1], c[0]]);
    });
  });
  return newArray;
}

/**
 *
 * @param {Genertes a leaflet polygon fron a latitude, longitude and offset}
 * @param {*} lon
 * @param {*} lat
 * @param {*} latOffset
 * @param {*} lonOffset
 */
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

onMounted(() => {
  // Renders leaflet correctly when refreshing page
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 300);

  // Create map
  map = L.map("map").setView([58.283, 12.293], 13);

  map.on("mouseup", () => {
    map.dragging.enable();
    markMode = false;
  });
  /** */

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true,
  }).addTo(map);

  //Default EPSG3857
  map.options.crs = L.CRS.EPSG3857;

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
      featureGroup: drawnItems,
    },
  });
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, async function (e) {
    const geoJSON = e.layer.toGeoJSON();
    // If adding polygon
    if (geoJSON.geometry.type == "Polygon") {
      let polygon;
      leafletPolygon.value = geoJSON;
      polygon = L.geoJSON(geoJSON).addTo(map);

      const northEast = polygon.getBounds()._northEast;
      const southWest = polygon.getBounds()._southWest;

      const center = polygon.getBounds().getCenter();

      const northEastDistance = map.distance(center, northEast);
      const southWestDistance = map.distance(center, southWest);

      const radius = Math.max(southWestDistance, northEastDistance);

      polygonArea.value = Math.ceil(
        L.GeometryUtil.geodesicArea(e.layer._latlngs[0]) / 1000000
      );
      await new Promise((resolve) => setTimeout(resolve, 200));
      axios
        .get("http://localhost:3001/getIntersectsInGrid", {
          params: {
            polygon: JSON.stringify(geoJSON.geometry.coordinates),
            center: JSON.stringify([center.lng, center.lat]),
            radius: radius,
            area: polygonArea.value,
            regionMinArea: regionMinArea.value,
            countryMinArea: countryMinArea.value,
            worldMinArea: worldMinArea.value,
          },
        })
        .then(function (response) {
          response.data.mgrsGrid.forEach((mgrsString, index) => {
            createMGRSCell(mgrsString).addTo(map);
          });

          // Show intersecting cells
          response.data.createdGrid.forEach((cell, index) => {
            console.log(cell);
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
                color:
                  polygonArea.value > worldMinArea.value ? "red" : "yellow",
              }
            );
            gridCell.on("mousedown", (cell) => {
              markMode = !markMode;
              markSetting = !selectedCells.value.includes(gridCell);
              map.dragging.disable();
            });
            gridCell.on("mouseover", (clickedCell) => {
              if (markMode) {
                setMarked(gridCell, cell._id.cellSize, markSetting);
              }
            });
            gridCell.addTo(map);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});

/**
 * set a cell to be marked or not
 * @param {*} polygon
 * @param {*} size
 * @param {*} mark
 */
function setMarked(polygon, size, mark) {
  const originalColor = "yellow";
  const markColor = "green";

  // Om polygonen redan är grönljusad, återställ färgen till originalfärgen
  polygon.size = size;
  if (mark) {
    if (!selectedCells.value.includes(polygon)) {
      selectedCells.value.push(polygon);
      polygon.setStyle({ color: markColor });
    }
  } else {
    // Annars sätt färgen till grönt
    if (selectedCells.value.includes(polygon)) {
      selectedCells.value.splice(selectedCells.value.indexOf(polygon), 1);
      polygon.setStyle({ color: originalColor });
    }
  }
}

/**
 * Generate a leaflet rectangle from a MGRS string
 * @param {*} mgrsString
 */
function createMGRSCell(mgrsString) {
  var rectBounds = inverse(mgrsString);
  var mgrsCell = L.rectangle([
    [rectBounds[1], rectBounds[0]],
    [rectBounds[3], rectBounds[2]],
  ]);
  return mgrsCell;
}
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}
</style>

<template>
  <div id="map"></div>
</template>
