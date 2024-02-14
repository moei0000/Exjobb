<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const map = ref();
const mapContainer = ref('mapContainer');

setTimeout(()=> {
onMounted(() => {
    map.value = L.map(mapContainer).setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map.value);
});
}, 1000);

</script>

<template>
    <div ref="mapContainer" style="width: 500px; height: 500px;"></div>
</template>