<template>
  <h1>Rate your area</h1>

  <b>(Score: 1 = bad, 6 = average, 10 = perfect)</b>

  <p></p>
  <q-rating v-model="ratingScore" size="24px" :max="10" color="primary" />
</template>

<style>
h1 {
  color: green;
  font-size: 13pt;
}
</style>

<script setup>
const ratingScore = defineModel("ratingScore");
</script>
