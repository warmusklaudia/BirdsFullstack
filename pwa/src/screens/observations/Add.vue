<template>
  <route-holder title="Add observation"></route-holder>
  <form @submit.prevent="submitForm">
    <div
      v-if="errorMessage"
      class="border-1 mb-3 flex items-center justify-between rounded-md border-red-500 bg-red-100 px-3 py-1"
    >
      <p class="text-sm text-red-600">{{ errorMessage }}</p>
      <button
        @click="errorMessage = ''"
        class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-1"
      >
        <X class="h-4 w-4 text-red-600" />
      </button>
    </div>
    <div class="mt-3">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="name">
        <span class="mb-2 block">Name</span>
        <input
          v-model="observationInput.name"
          id="name"
          class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          type="text"
          name="name"
        />
      </label>
    </div>
    <div class="mt-3">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="birdId">
        <span class="mb-2 block">Bird specie</span>
        <select
          :disabled="loading"
          class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          v-model="observationInput.birdId"
          name="birdId"
          id="birdId"
        >
          <option selected disabled>Pick a bird species</option>
          <option v-if="result" v-for="b of result.birds" :key="b.id">{{ b.name }}</option>
        </select>
      </label>
    </div>
    <div class="mt-3">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="location">
        <span class="mb-2 block">Location</span>
        <select
          :disabled="loading"
          class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          v-model="observationInput.locationId"
          name="location"
          id="location"
        >
          <option selected disabled>Pick a location</option>
          <option v-if="result" v-for="l of result.locations" :key="l.id">{{ l.name }}</option>
        </select>
      </label>
    </div>
    <div class="mt-3">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="description">
        <span class="mb-2 block">Description</span>
        <textarea
          class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          v-model="observationInput.description"
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>
      </label>
    </div>
    <div class="mt-3">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="weather">
        <span class="mb-2 block">Weather</span>
        <input
          v-model="observationInput.weather"
          id="weather"
          class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          type="text"
          name="weather"
        />
      </label>
    </div>
    <button
      class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
      :disabled="loading"
    >
      <span v-if="!loading" class="">Add observation</span>
      <div v-else>
        <Loader2 class="animate-spin" />
      </div>
    </button>
  </form>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { reactive, ref, Ref } from 'vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from '../../composables/useAuthentication'
import { X, Loader2 } from 'lucide-vue-next'
export default {
  components: {
    RouteHolder,
    X,
    Loader2,
  },

  setup() {
    const { user } = useAuthentication()

    const errorMessage: Ref<string> = ref('')

    const INSERT_DATA = gql`
      query birds {
        birds {
          id
          name
        }
        locations {
          id
          name
        }
      }
    `

    const ADD_OBSERVATION = gql`
      mutation createObservation($createObservationInput: createObservationInput) {
        createObservation(
          createObservationInput: {
            name: $name
            birdId: $birdId
            description: $description
            locationId: $locationId
            active: true
            userId: $userId
            weather: $weather
          }
        ) {
          id
          name
        }
      }
    `
    const observationInput = reactive({
      name: 'Bird',
      birdId: 'Pick a bird specie',
      locationId: '',
      description: 'Beautiful bird',
      weather: 'Clouded',
      userId: user.value?.uid,
    })

    const { result, loading, error } = useQuery(INSERT_DATA)
    const { mutate: addObservation } = useMutation(ADD_OBSERVATION, {
      variables: {
        createObservationInput: { ...observationInput },
      },
    })

    const submitForm = async () => {
      const observation = await addObservation().catch((err) => {
        errorMessage.value = err.message
      })
      console.log(observation)
    }

    return {
      observationInput,
      result,
      loading,
      error,
      errorMessage,
      submitForm,
    }
  },
}
</script>
