<script>
  // export default {
  //   data () {
  //     return {
  //       activities: [
  //         {
  //           name: 'Cycling',
  //           icon: 'mdi-bike',
  //         },
  //         {
  //           name: 'Walking or running',
  //           icon: 'mdi-walk',
  //         },
  //         {
  //           name: 'Touring by car or motor',
  //           icon: 'mdi-car-back',
  //         },
  //         {
  //           name: 'Watching nature',
  //           icon: 'mdi-binoculars',
  //         },
  //         {
  //           name: 'Water sports',
  //           icon: 'mdi-swim',
  //         },
  //         {
  //           name: 'Playing or sitting',
  //           icon: 'mdi-seesaw',
  //         },
  //         {
  //           name: 'Winter sports',
  //           icon: 'mdi-ski',
  //         },
  //         {
  //           name: 'Mountain sports',
  //           icon: 'mdi-image-filter-hdr',
  //         },
  //       ],
  //     }
  //   },
  // }

import { ref } from 'vue';

export default {
  setup () {
    const activitiesRef = Array(8).fill(false);
    return {
      activities: ref(activitiesRef),

      options: [
        {
          label: 'Cycle',
          value: 'cycle',
          icon: "directions_bike",
        },
        {
          label: 'Walking or running',
          value: 'walkingrunning',
          icon: "hiking",
        },
        {
          label: 'Touring by car or motor',
          value: 'car',
          icon: "directions_car",
        },
        {
          label: 'Watching nature',
          value: 'watchingnature',
          icon: "directions_bike",
        },
        {
          label: 'Water sports',
          value: 'watersports',
          icon: "directions_bike",
        },
        {
          label: 'Playing or sitting',
          value: 'playingorsitting',
          icon: "directions_bike",
        },
        {
          label: 'Winter sports',
          value: 'wintersports',
          icon: "directions_bike",
        },
        {
          label: 'Mountain sports',
          value: 'mountain-sports',
          icon: "directions_bike",
        }
      ]
    }
  }
}

</script>

<template>
    <h1>What activities do you engage in at this area?</h1>

    <!-- <q-option-group
      v-model="activities"
      :options="options"
      color="blue"
      type="toggle"
    >
    <template v-slot:label="opt">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label><q-icon name="directions_bike" style="color: #116f43; font-size: 40px;" />{{ opt.label }}</q-item-label>
        </q-item-section>
        <q-item-section avatar> 
          <q-toggle color="blue" v-model="activity" val="battery" />
        </q-item-section>
      </q-item>
      </template>
    </q-option-group> -->

    <q-list>
      <template v-for="(o, i) in options" :key="i.id">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label><q-icon :name=o.icon style="color: #116f43; font-size: 40px;" />{{ o.label }}</q-item-label>
        </q-item-section>
        <q-item-section avatar> 
          <q-toggle color="blue" v-model=activities[i] :val=o.value />
        </q-item-section>
      </q-item>
      </template>
    </q-list>

    <!-- <v-table>
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
  </v-table> -->
    
</template>

<style>
h1 {
    color: green;
    font-size: 13pt;
}

.q-toggle, .q-item {
  width: 100%;
}
</style>