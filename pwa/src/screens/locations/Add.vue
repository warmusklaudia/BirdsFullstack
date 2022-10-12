<template>
  <route-holder title="Add location">
    <form class="mt-6 w-full max-w-3xl" @submit.prevent="submitForm">
      <div
        v-if="errorMessage"
        class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>

        <button
          @click="errorMessage = ''"
          class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
        >
          <X class="h-4 w-4 text-red-600" />
        </button>
      </div>

      <div>
        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="name">
          <span class="mb-2 block">Name</span>

          <input
            v-model="locationInput.name"
            id="name"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="name"
          />
        </label>
      </div>

      <div class="mt-3">
        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="locationId">
          <span class="mb-2 block">Location</span>
          <span class="sr-only">A map view to select the location of the observed bird.</span>
          <map-view
            class="rounded-md"
            :map-coordinates="{ lng: 3.3147737, lat: 50.8424814 }"
            @coordinateSelection="locationInput.location = $event"
          />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Add location</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>
    </form>
  </route-holder>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { reactive, ref, Ref } from 'vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from '../../composables/useAuthentication'
import { X, Loader2 } from 'lucide-vue-next'
import MapView from '../../components/generic/MapView.vue'
export default {
  components: {
    RouteHolder,
    X,
    Loader2,
    MapView,
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

    const ADD_LOCATION = gql`
      mutation createLocation($createLocationInput: CreateLocationInput!) {
        createLocation(createLocationInput: $createLocationInput) {
          id
          name
        }
      }
    `
    const locationInput = reactive({
      name: 'Bird',
      location: null,
    })

    const { result, loading, error } = useQuery(INSERT_DATA)
    const { mutate: addLocation } = useMutation(ADD_LOCATION, () => ({
      variables: {
        createLocationInput: locationInput,
      },
    }))

    const submitForm = async () => {
      const location = await addLocation().catch((err) => {
        errorMessage.value = err.message
      })
      console.log(location)
    }

    return {
      locationInput,
      result,
      loading,
      error,
      errorMessage,
      submitForm,
    }
  },
}
</script>
