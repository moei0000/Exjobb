<template>
    <h1>Describe your area</h1>

    Provide a title that represents your area
    <q-input v-model="title" label="Title" filled />

    State in your own words what makes this particular area attractive, valuable or important to you
    <q-input
      v-model="text"
      label="Description"
      filled
      type="textarea"
    />
</template>

<style>
h1 {
    color: green;
    font-size: 13pt;
}
</style>

<script setup> 
    const title = "";
    const text = "";
</script>