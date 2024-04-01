<script setup>
import "../../leaflet-static-grid";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";
import axios from "axios";
import MapPriorities from "./MapPriorities.vue";
import { latLngBounds, polygon } from "leaflet";

const leafletPolygon = defineModel("leafletPolygon");

var map;
var homeMarker;

// Size of one cell in meters
const cellSize = 1000;
// 1 meter in degrees
const oneMeterInDegree = 1 / 111319.45;

const degreesPerCell = cellSize * oneMeterInDegree;
let latitudeRatio = 1;

let allowDrawGrid = true;

const grid = [];

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
 * Returns the starting position of the grid
 * @param {*} lat
 * @param {*} lon
 */
function getStartLocationForGrid(latlon) {
  // How far the inputed latitude is from a correct cell location
  const degreeFromInputLatitude = latlon.lat % degreesPerCell;

  // How far the inputed longitude is from a correct cell location
  const degreeFromInputLongitude = latlon.lng % degreesPerCell;

  // latitudeRatio = 1 / (1 - latlon.lat / 90);
  let phi = latlon.lat * (Math.PI / 180);
  latitudeRatio = 1 / Math.sqrt(1 - Math.sin(phi) ** 2 * Math.sin(phi) ** 2);
  console.log("Ratio: ", latitudeRatio);

  const correctLatitude = latlon.lat - degreeFromInputLatitude;
  const correctLongitude = latlon.lng - degreeFromInputLongitude;
  return [correctLatitude, correctLongitude];
}

function drawGrid(latlon) {
  if (allowDrawGrid == false) {
    return;
  }
  allowDrawGrid = false;
  const latitude = latlon[0];
  const longitude = latlon[1];

  console.log("create rectangles");
  for (let x = latitude; x > latitude - 0.02; x -= degreesPerCell) {
    for (
      let y = longitude;
      y > longitude - 0.02;
      y -= degreesPerCell * latitudeRatio
    ) {
      let rectangle = L.rectangle([
        [x, y],
        [x - degreesPerCell, y - degreesPerCell * latitudeRatio],
      ]);
      grid.push(rectangle);
      rectangle.addTo(map);
    }
  }
}

onMounted(() => {
  // Renders leaflet correctly when refreshing page
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 300);

  // Create map
  map = L.map("map").setView([58.283, 12.293], 13);

  axios
    .get("http://localhost:3001/getGrid")
    .then(function (response) {
      response.data.forEach((cell) => {
        console.log(_invertCoordsArray(cell.geometry.coordinates));
        L.polygon(_invertCoordsArray(cell.geometry.coordinates), {
          color: "red",
        }).addTo(map);
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  /** TESTING DELETE LATER */
  // test watermark
  L.control.watermark({ position: "bottomleft" }).addTo(map);

  map.on("moveend", function (ev) {
    // Only draw grid if zoomed enough
    if (map.getZoom() >= 15) {
      drawGrid(getStartLocationForGrid(map.getBounds()._northEast));
    }
  });
  /** */

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  axios
    .get("http://localhost:3001/gethome")
    .then(function (response) {
      console.log(response.data[0].location.coordinates);
      homeMarker = L.marker([
        response.data[0].location.coordinates[1],
        response.data[0].location.coordinates[0],
      ]).addTo(map);
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
      featureGroup: drawnItems,
    },
  });
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {
    const geoJSON = e.layer.toGeoJSON();
    console.log(geoJSON);
    // If marker update home location
    if (geoJSON.geometry.type == "Point") {
      var type = e.layerType,
        layer = e.layer;
      if (homeMarker != null) {
        map.removeLayer(homeMarker);
      }
      homeMarker = e.layer;
      map.addLayer(homeMarker);
      L.geoJSON(geoJSON).addTo(map);

      console.log(geoJSON.geometry.coordinates);
      axios
        .post("http://localhost:3001/sethome", geoJSON.geometry.coordinates)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }

    // If adding polygon
    if (geoJSON.geometry.type == "Polygon") {
      let polygon;
      leafletPolygon.value = geoJSON;
      console.log(geoJSON.geometry.coordinates);

      axios
        .get("http://localhost:3001/checkpolygon", {
          params: {
            polygon: JSON.stringify(geoJSON.geometry.coordinates),
          },
        })
        .then(function (response) {
          polygon = L.geoJSON(geoJSON, {
            style: { color: response.data == true ? "red" : "green" },
          }).addTo(map);
          console.log("polygon", polygon.getBounds());
          grid.forEach((cell) => {
            if (polygon.getBounds().intersects(cell.getBounds())) {
              cell.setStyle({ fillColor: "yellow" });
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get("http://localhost:3001/getIntersectsInGrid", {
          params: {
            polygon: JSON.stringify(geoJSON.geometry.coordinates),
          },
        })
        .then(function (response) {
          console.log("getIntersects", response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
  <div id="map"></div>
</template>
