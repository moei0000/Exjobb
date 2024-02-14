<script>
  export default {
    data () {
      return {
        activities: [
          {
            name: 'Cycling',
            icon: 'mdi-bike',
          },
          {
            name: 'Walking or running',
            icon: 'mdi-walk',
          },
          {
            name: 'Touring by car or motor',
            icon: 'mdi-car-back',
          },
          {
            name: 'Watching nature',
            icon: 'mdi-binoculars',
          },
          {
            name: 'Water sports',
            icon: 'mdi-swim',
          },
          {
            name: 'Playing or sitting',
            icon: 'mdi-seesaw',
          },
          {
            name: 'Winter sports',
            icon: 'mdi-ski',
          },
          {
            name: 'Mountain sports',
            icon: 'mdi-image-filter-hdr',
          },
        ],
      }
    },
  }

</script>

<template>
    <h1>What activities do you engage in at this area?</h1>

    <p></p>

    <v-table>
    <thead>
    </thead>
    <tbody>
      <tr
        v-for="item in activities"
        :key="item.name"
      >
      <td><v-icon
        size="50px"
        color="green-darken-2"
        :icon="`${item.icon}`"
      ></v-icon></td>
      <td>{{ item.name }}</td>
      <v-switch color="blue">
      </v-switch>
      </tr>
    </tbody>
  </v-table>
    
</template>

<style>
h1 {
    color: green;
    font-size: 13pt;
}
</style>