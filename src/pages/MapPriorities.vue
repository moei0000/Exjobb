<template>
  <h1>Should this placed be:</h1>

  <p></p>

  <q-list>
    <q-item tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio v-model="mapPriorities" val="maintained" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Maintained (= keep it as it is)</q-item-label>
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio v-model="mapPriorities" val="strengthened" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Strengthened (= improve its qualities)</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { ref, watch } from "vue";

export default {
  emits: ["update:mapPriorities"],
  setup(props, { emit }) {
    const mapPriorities = ref("");

    // Emitting the updated value of mapPriorities whenever it changes
    watch(mapPriorities, (newValue) => {
      emit("update:mapPriorities", newValue);
    });

    return {
      mapPriorities,
    };
  },
};
</script>

<style>
h1 {
  color: green;
  font-size: 13pt;
}
</style>
