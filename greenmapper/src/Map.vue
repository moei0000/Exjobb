<script >
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data() {
    return {
      zoom: 15,
      center: latLng(58.283, 12.293),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      showMap: true,
      mapOptions: {
        zoomSnap: 0.5
      }
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  }
};

</script>

<style scoped>
.map {
  height: 500px;
  width: 100%;
}
</style>

<template>
    <div class="map">
          <l-map
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
          </l-map>
        </div>
</template>