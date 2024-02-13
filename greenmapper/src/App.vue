<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
const map = ref();
const mapContainer = ref()

onMounted(() => {
  var map = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map.value);
})
</script>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    font-size: 30pt;
    font-weight: bold;
    color: green;
    padding-right: calc(var(--section-gap) / 2);
  }
  .wrapper {
    margin:0 auto;
    width: 1000px;
}
}

#icon {
  height: 40px;
  padding-top: 12px;
}
</style>

<template>
  
    <div ref="mapContainer" style="width: 400px; height: 400px;"></div>
 
  
  
    <div class="wrapper">
      <!-- Title -->
      <header>
        Greenmapper   <img id="icon" src="./assets/img/pin.png" />
      </header>
      <!-- Stepper -->
      <div class="stepper">
        <v-stepper :items="['Map', 'Description', 'Rating', 'Visit freq', 'Activities', 'Priorities', 'Donate']">
      <template v-slot:item.1>
        <v-card title="Map" flat>
          <!-- <l-map ref="myMap"> </l-map> -->
        </v-card>
      </template>
  
      <template v-slot:item.2>
        <v-card title="Description" flat>...</v-card>
      </template>
  
      <template v-slot:item.3>
        <v-card title="Rating" flat>...</v-card>
      </template>
  
      <template v-slot:item.4>
        <v-card title="Visit freq" flat>...</v-card>
      </template>
  
      <template v-slot:item.5>
        <v-card title="Activites" flat>...</v-card>
      </template>
  
      <template v-slot:item.6>
        <v-card title="Priorities" flat>...</v-card>
      </template>
  
      <template v-slot:item.7>
        <v-card title="Donate" flat>...</v-card>
      </template>
  
    </v-stepper>
      </div>
      <main>
        <!-- Map -->
      </main>
    </div>
  </template>