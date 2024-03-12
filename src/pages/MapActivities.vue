<script>
import { ref, watch } from "vue";

export default {
  emits: ["update:activitiesRef"],
  setup(props, { emit }) {
    const activities = ref(Array(8).fill(false));

    // Emitting the updated value of activitiesRef whenever it changes
    watch(activities, (newValue) => {
      console.log("Activities changed, emitting event");
      emit("update:activitiesRef", newValue);
    });

    const options = [
      {
        label: "Cycle",
        value: "cycle",
        icon: "directions_bike",
      },
      {
        label: "Walking or running",
        value: "walkingrunning",
        icon: "hiking",
      },
      {
        label: "Touring by car or motor",
        value: "car",
        icon: "directions_car",
      },
      {
        label: "Watching nature",
        value: "watchingnature",
        icon: "directions_bike",
      },
      {
        label: "Water sports",
        value: "watersports",
        icon: "directions_bike",
      },
      {
        label: "Playing or sitting",
        value: "playingorsitting",
        icon: "directions_bike",
      },
      {
        label: "Winter sports",
        value: "wintersports",
        icon: "directions_bike",
      },
      {
        label: "Mountain sports",
        value: "mountain-sports",
        icon: "directions_bike",
      },
    ];

    return {
      activities,
      options,
    };
  },
};
</script>

<template>
  <h1>What activities do you engage in at this area?</h1>
  <q-list>
    <template v-for="(o, i) in options" :key="i.id">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label
            ><q-icon :name="o.icon" style="color: #116f43; font-size: 40px" />{{
              o.label
            }}</q-item-label
          >
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="blue" v-model="activities[i]" :val="o.value" />
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<style>
h1 {
  color: green;
  font-size: 13pt;
}

.q-toggle,
.q-item {
  width: 100%;
}
</style>
