<template>
  <route-holder title="Locations">
    <template #header-actions>
      <RouterLink
        to="locations/add"
        class="bg theme rounded-md bg-neutral-800 px-4 py-2 text-white"
      >
        Add location
      </RouterLink>
    </template>
    <MapView />
  </route-holder>
</template>

<script lang="ts">
import gql from 'graphql-tag'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import MapView from '../../components/generic/MapView.vue'
import { useQuery } from '@vue/apollo-composable'

export default {
  components: {
    RouteHolder,
    MapView,
  },

  setup() {
    return {}
  },
}
</script>
