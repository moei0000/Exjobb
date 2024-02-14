<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Description from './Description.vue';
import Rating from './Rating.vue';
import VisitFreq from './VisitFreq.vue';
import Activites from './Activities.vue';
import Priorities from './Priorities.vue';

const map = ref();
const mapContainer = ref();

// onMounted(() => {
//   map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map.value);
// })

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
    <!-- <div ref="mapContainer" style="width: 500px; height: 500px;"></div> -->
    <div class="wrapper">
      <!-- Title -->
      <header>
        Greenmapper   <img id="icon" src="./assets/img/pin.png" />
      </header>
      
      <div class="stepper">
        <v-stepper color="#008918" prev-text="Back"  :items="['Map', 'Description', 'Rating', 'Visit freq', 'Activities', 'Priorities', 'Donate']">
      <template v-slot:item.1>
        <v-card title="Map" flat>...</v-card>
      </template>
  
      <template v-slot:item.2>
        <description />
      </template>
  
      <template v-slot:item.3>
        <rating />
      </template>
  
      <template v-slot:item.4>
        <visit-freq />
      </template>
  
      <template v-slot:item.5>
        <activites />
      </template>
  
      <template v-slot:item.6>
        <priorities />
      </template>
  
      <template v-slot:item.7>
        <v-card title="Donate" flat>...</v-card>
      </template>
  
    </v-stepper>
      </div>
    </div>
  </template>