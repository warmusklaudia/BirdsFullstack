<template>
  <route-holder title="Birds"></route-holder>
  <div
    class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
    v-if="loading"
  >
    <div v-for="i of skeletons" :key="i">
      <div class="aspect-square bg-neutral-200"></div>
      <p class="my-2 h-8 w-12 rounded bg-neutral-200"></p>
      <p class="h-10 w-12 rounded bg-neutral-100"></p>
    </div>
  </div>
  <div v-else-if="error">Error happened.</div>
  <div class="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5" v-else-if="result">
    <RouterLink :to="`birds/${b.id}`" v-for="b of result.birds" :key="b.id">
      <img class="aspect-square" :src="`./birds/${b.name}.webp`" :alt="`Drawing of a ${b.name}`" />
      <h2 class="font-theme text-xl font-bold">{{ b.name }}</h2>
      <p class="text-sm">{{ b.category }}</p>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Ref, ref } from 'vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'

export default {
  components: {
    RouteHolder,
  },
  setup() {
    const BIRDS = gql`
      query birds {
        birds {
          id
          name
          url
          description
          category
        }
      }
    `
    const { result, loading, error } = useQuery(BIRDS)
    const skeletons: Ref<number> = ref(10)
    console.table(result.value?.birds)

    return {
      result,
      loading,
      error,
    }
  },
}
</script>
