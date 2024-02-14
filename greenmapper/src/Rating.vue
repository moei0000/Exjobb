<template>
    <h1>Rate your area</h1>

    <b>(Score: 1 = bad, 6 = average, 10 = perfect)</b>

    <p></p>
    <v-rating
        hover
        :length="10"
        :size="32"
        :model-value="0"
        active-color="primary"
    />
</template>

<style>
h1 {
    color: green;
    font-size: 13pt;
}
</style>