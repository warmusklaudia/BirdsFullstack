<template>
  <route-holder title="Observations">
    <template #header-actions>
      <RouterLink
        to="/observations/add"
        class="bg-theme rounded-md bg-neutral-800 px-4 py-2 text-white"
        >Create observation</RouterLink
      >
    </template>
    <ObservationsTable v-if="result" :observations="result.observations" />
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import ObservationsTable from '../../components/observation/ObservationsTable.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const OBSERVATIONS = gql`
      query observations {
        observations {
          id
          name
          bird {
            id
            name
          }
          location {
            id
            name
          }
          userId
          createdAt
        }
      }
    `

    const { result, loading, error } = useQuery(OBSERVATIONS)

    return {
      result,
      loading,
      error,
    }
  },
}
</script>
