<script setup>
import "../../leaflet-static-grid";
import "../../leaflet-mark-polygons";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";
import axios from "axios";

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

let markCellMode = false;
let removeMarkCellMode = false;

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

function createPolygonFromPoint(lon, lat, latOffset, lonOffset) {
  return [
    [
      [lon, lat],
      [lonOffset, lat],
      [lonOffset, latOffset],
      [lon, latOffset],
      [lon, lat],
    ],
  ];
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
  const offsetLatitude = [0.015, 0.018];
  const offsetLongtiude = [0.028, 0.067];
  if (allowDrawGrid == false) {
    return;
  }
  allowDrawGrid = false;
  const latitude = latlon[0];
  const longitude = latlon[1];
}

onMounted(() => {
  // Renders leaflet correctly when refreshing page
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 300);

  // Create map
  map = L.map("map").setView([58.283, 12.293], 13);

  /** TESTING DELETE LATER */
  // test watermark
  L.control.watermark({ position: "bottomleft" }).addTo(map);

  L.control.markmode().addTo(map);

  map.on("moveend", function (ev) {
    // Only draw grid if zoomed enough
    if (map.getZoom() >= 15) {
      console.log("draw grid");
      drawGrid(getStartLocationForGrid(map.getBounds()._northEast));
    }
  });

  map.on("mouseup", () => {
    markCellMode = false;
    removeMarkCellMode = false;
  });
  /** */

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true,
  }).addTo(map);

  axios
    .get("http://localhost:3001/gethome")
    .then(function (response) {
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
      polygon = L.geoJSON(geoJSON).addTo(map);

      const northEast = polygon.getBounds()._northEast;
      const southWest = polygon.getBounds()._southWest;

      const center = polygon.getBounds().getCenter();

      const northEastDistance = map.distance(center, northEast);
      const southWestDistance = map.distance(center, southWest);

      const radius = Math.max(southWestDistance, northEastDistance);
      L.circle(center, { radius }).addTo(map);

      const polygonArea = L.GeometryUtil.geodesicArea(e.layer._latlngs[0]);

      axios
        .get("http://localhost:3001/getIntersectsInGrid", {
          params: {
            polygon: JSON.stringify(geoJSON.geometry.coordinates),
            center: JSON.stringify([center.lng, center.lat]),
            radius: radius,
            area: polygonArea,
          },
        })
        .then(function (response) {
          // Show intersecting cells
          response.data.forEach((cell) => {
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
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});

function setMarked(polygon, mark) {
  const originalColor = "yellow";
  const markColor = "green";

  // Om polygonen redan är grönljusad, återställ färgen till originalfärgen
  if (mark) {
    grid.push(polygon);
    polygon.setStyle({ color: markColor });
  } else {
    // Annars sätt färgen till grönt
    grid.splice(grid.indexOf(polygon), 1);
    polygon.setStyle({ color: originalColor });
  }
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
