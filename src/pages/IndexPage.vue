<template>
  <div class="wrapper">
    <!-- Title -->
    <header>
      <h1 style="font-size: 29px; color: green">Greenmapper</h1>
    </header>
    Polygon: {{ leafletPolygon }}<br />
    Title: {{ descTitle }}<br />
    Text: {{ descText }}<br />
    Rating: {{ ratingScore }} of 10<br />
    Freq: {{ visitFreq }} <br />
    Activites: {{ mapActivities }} <br />
    Priority: {{ mapPriorities }} <br />
    Amount: {{ donateAmount }} <br />
    <div class="stepper">
      <q-stepper
        v-model="step"
        ref="stepper"
        active-color="green-10"
        done-color="green-10"
        animated
        flat
        bordered
        :contracted="$q.platform.is.mobile"
      >
        <q-step :name="1" title="Map" prefix="1" :done="step > 1">
          <LeafletMap v-model:leafletPolygon="leafletPolygon" />
        </q-step>

        <q-step :name="2" title="Description" prefix="2" :done="step > 2">
          <MapDescription
            v-model:descTitle="descTitle"
            v-model:descText="descText"
          />
        </q-step>

        <q-step :name="3" title="Rating" prefix="3" :done="step > 3">
          <MapRating v-model:ratingScore="ratingScore" />
        </q-step>

        <q-step :name="4" title="Visit freq" prefix="4" :done="step > 4">
          <MapVisitFreq v-model:visitFreq="visitFreq" />
        </q-step>

        <q-step :name="5" title="Activities" prefix="5" :done="step > 5">
          <MapActivities
            v-model:mapActivities="mapActivities"
            @update:activitiesRef="updateMapActivities"
          />
        </q-step>

        <q-step :name="6" title="Priorities" prefix="6" :done="step > 6">
          <MapPriorities v-model:mapPriorities="mapPriorities" />
        </q-step>

        <q-step :name="7" title="Donate" prefix="7" :done="step > 7">
          <MapDonate v-model:donateAmount="donateAmount" />
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="step === 7 ? finish : $refs.stepper.next()"
              color="primary"
              :label="step === 7 ? 'Finish' : 'Next'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import LeafletMap from "./LeafletMap.vue";
import MapDescription from "./MapDescription.vue";
import MapRating from "./MapRating.vue";
import MapVisitFreq from "./MapVisitFreq.vue";
import MapActivities from "./MapActivities.vue";
import MapPriorities from "./MapPriorities.vue";
import MapDonate from "./MapDonate.vue";

export default {
  components: {
    LeafletMap,
    MapDescription,
    MapRating,
    MapVisitFreq,
    MapActivities,
    MapPriorities,
    MapDonate,
  },
  setup() {
    const step = ref(1);
    const leafletPolygon = ref({});
    const descTitle = ref("");
    const descText = ref("");
    const ratingScore = ref(0);
    const visitFreq = ref("");
    const mapActivities = ref([]);
    const mapPriorities = ref("");
    const donateAmount = ref(0);

    const updateMapActivities = (newValue) => {
      mapActivities.value = newValue;
    };

    // When stepper is finished
    function finish(event) {}

    return {
      step,
      leafletPolygon,
      descTitle,
      descText,
      ratingScore,
      visitFreq,
      mapActivities,
      updateMapActivities,
      finish,
      mapPriorities,
      donateAmount,
    };
  },
};
</script>

<style></style>
