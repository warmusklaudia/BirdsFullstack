<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from 'vue'
import useApollo from './composables/useApollo'
import useFirebase from './composables/useFirebase'

export default {
  setup() {
    const { app } = useFirebase()
    const { apolloClient } = useApollo()
    provide(DefaultApolloClient, apolloClient)
    return {}
  },
}
</script>
