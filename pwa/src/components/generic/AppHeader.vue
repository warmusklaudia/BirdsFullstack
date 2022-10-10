<template>
  <header class="px-6 py-6">
    <nav class="mx-auto flex max-w-6xl items-center justify-between">
      <router-link class="inline-block rounded-md outline-none focus-visible:ring-2" to="">
        <img src="/safari-pinned-tab.svg" class="md:w-18 w-12 pr-2" alt="" />
      </router-link>
      <AppNavigation class="hidden sm:flex" />
    </nav>
  </header>
</template>

<script lang="ts">
import useAuthentication from '../../composables/useAuthentication'
import Logo from './Logo.vue'
import AppNavigation from '../generic/AppNavigation.vue'

export default {
  components: {
    Logo,
    AppNavigation,
  },
  setup() {
    const { user } = useAuthentication()
    return {
      user,
    }
  },
}
</script>
