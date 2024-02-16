<script setup>
import Description from './Description.vue';
import Rating from './Rating.vue';
import VisitFreq from './VisitFreq.vue';
import Activites from './Activities.vue';
import Priorities from './Priorities.vue';
import LeafletMap from './Map.vue';
import Donate from './Donate.vue';

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "@vue-leaflet/vue-leaflet";


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
    <l-map
    v-if="showMap"
    :zoom="zoom"
    :center="center"
    style="height: 80%"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
  >
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    />
  </l-map>
  <div class="wrapper">
    <!-- Title -->
    <header>
      Greenmapper   <img id="icon" src="./assets/img/pin.png" />
    </header>
    
    <div class="stepper">
        <v-stepper color="#008918" prev-text="Back"  :items="['Map', 'Description', 'Rating', 'Visit freq', 'Activities', 'Priorities', 'Donate']">
      <template v-slot:item.1>
          <LeafletMap />
      </template>
  
      <template v-slot:item.2>
        <Description />
      </template>
  
      <template v-slot:item.3>
        <Rating />
      </template>
  
      <template v-slot:item.4>
        <VisitFreq />
      </template>
  
      <template v-slot:item.5>
        <Activites />
      </template>
  
      <template v-slot:item.6>
        <Priorities />
      </template>
  
      <template v-slot:item.7>
        <Donate />
      </template>
  
    </v-stepper>
    </div>
  </div>
</template>