<script setup>
import "../../leaflet-static-grid";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";
import axios from "axios";
import MapPriorities from "./MapPriorities.vue";
import { latLngBounds } from "leaflet";

const leafletPolygon = defineModel("leafletPolygon");

var map;
var homeMarker;

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
  // Raster image overlay
  let latlngs = [
    [58.28, 12.189],
    [58.4, 12.409],
  ];
  let testBound = L.latLngBounds([
    [58.1, 12.8],
    [58.4, 12.1],
  ]);
  L.rectangle(testBound).addTo(map);
  // var polyline = L.polyline(latlngs, { color: "red" }).addTo(map);
  // map.fitBounds(polyline.getBounds());

  // for (let x = 0; x < 10; x++) {
  //   var polyline = L.polyline(
  //     [
  //       [58.28 - x / 500, 12.289],
  //       [58.28 - x / 500, 12.309],
  //     ],
  //     {
  //       color: "red",
  //     }
  //   ).addTo(map);
  // }

  // for (let x = 0; x < 10; x++) {
  //   var polyline = L.polyline(
  //     [
  //       [58.28, 12.3 + x / 500],
  //       [58.26, 12.3 + x / 500],
  //     ],
  //     {
  //       color: "red",
  //     }
  //   ).addTo(map);
  // }

  console.log(map.getBounds());
  map.on("moveend", function (ev) {
    console.log("stopped");
    console.log(testBound.intersects(map.getBounds()));
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
      leafletPolygon.value = geoJSON;
      console.log(leafletPolygon.value);

      axios
        .get("http://localhost:3001/checkpolygon", {
          params: {
            polygon: JSON.stringify(geoJSON.geometry.coordinates),
          },
        })
        .then(function (response) {
          console.log(response.data);
          L.geoJSON(geoJSON, {
            style: { color: response.data == true ? "red" : "green" },
          }).addTo(map);
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
