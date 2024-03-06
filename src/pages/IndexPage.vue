<template>
<div class="wrapper">
    <!-- Title -->
    <header>
       <h1 style="font-size: 29px; color: green;">Greenmapper</h1>
    </header>
    
    <div class="stepper">
      
      <q-stepper 
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step
          :name="1"
          title="Map"
          prefix="1"
          :done="step > 1"
        >
          <!-- <LeafletMap /> -->
          hej
        </q-step>
  
        <q-step
          :name="2"
          title="Description"
          prefix="2"
          :done="step > 2"
        >
          <!-- <Description /> -->
        </q-step>
  
        <q-step
          :name="3"
          title="Rating"
          prefix="3"
          :done="step > 3"
        >
          <!-- <Rating /> -->
        </q-step>
  
        <q-step
          :name="4"
          title="Visit freq"
          prefix="4"
          :done="step > 4"
        >
          <!-- <VisitFreq /> -->
        </q-step>
  
        <q-step
          :name="5"
          title="Activities"
          prefix="5"
          :done="step > 5"
        >
          <!-- <Activities /> -->
        </q-step>
  
        <q-step
          :name="6"
          title="Priorities"
          prefix="6"
          :done="step > 6"
        >
          <!-- <Priorities /> -->
        </q-step>
  
        <q-step
          :name="7"
          title="Donate"
          prefix="7"
          :done="step > 7"
        >
          <!-- <Donate /> -->
        </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 7 ? 'Finish' : 'Next'" />
        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
      </q-stepper-navigation>
    </template>
    </q-stepper>
    </div>
  </div>
</template>

<style>

</style>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      step: ref(1)
    }
  }
}
</script>
