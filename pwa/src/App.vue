<template>
  <router-view class="min-h-screen bg-neutral-50 dark:bg-neutral-700"></router-view>
</template>

<script lang="ts">
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from 'vue'
import useApollo from './composables/useApollo'

export default {
  setup() {
    const { apolloClient } = useApollo()
    provide(DefaultApolloClient, apolloClient)
    return {}
  },
}
</script>
