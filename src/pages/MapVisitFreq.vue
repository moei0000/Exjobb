<template>
    <h1>How often do you vistit your area?</h1>

    <p></p>
    <q-list>
        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="daily"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Daily</q-item-label>
        </q-item-section>
      </q-item>

        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="weekly"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Weekly</q-item-label>
        </q-item-section>
      </q-item>

        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="monthly"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Monthly</q-item-label>
        </q-item-section>
      </q-item>

        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="fewtimesayear"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Few times a year</q-item-label>
        </q-item-section>
      </q-item>

        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="yearly"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Yearly</q-item-label>
        </q-item-section>
      </q-item>

        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="rarely"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Rarely</q-item-label>
        </q-item-section>
      </q-item>

        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="visitFreq" val="never"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Never</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</template>

<style>
h1 {
    color: green;
    font-size: 13pt;
}
</style>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      visitFreq: ref('')
    }
  }
}
</script>