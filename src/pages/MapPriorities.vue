<template>
    <h1>Should this placed be:</h1>

    <p></p>

    <q-list>
        <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="maintained" val="maintained"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Maintained (= keep it as it is)</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="strengthened" val="strengthened"   />
        </q-item-section>
        <q-item-section>
          <q-item-label>Strengthened (= improve its qualities)</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
import { ref } from 'vue';

export default {
  setup () {
    return {
        maintained: ref(''),
        strengthened: ref('')
    }
  }
}
</script>

<style>
h1 {
    color: green;
    font-size: 13pt;
}
</style>