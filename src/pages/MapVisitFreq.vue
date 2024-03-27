<template>
  <div>
    <h1>How often do you visit your area?</h1>

    <q-list>
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="daily" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Daily</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="weekly" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Weekly</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="monthly" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Monthly</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="fewtimesayear" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Few times a year</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="yearly" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Yearly</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="rarely" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Rarely</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="never" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Never</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <p>Selected Frequency: {{ visitFreq }}</p>
  </div>
</template>

<style>
h1 {
  color: green;
  font-size: 13pt;
}
</style>

<script>
import { ref, watch } from "vue";

export default {
  emits: ["update:visitFreq"],
  setup(props, { emit }) {
    const visitFreq = ref("");

    // Emitting the updated value of visitFreq whenever it changes
    watch(visitFreq, (newValue) => {
      emit("update:visitFreq", newValue);
    });

    return {
      visitFreq,
    };
  },
};
</script>
