<template>
  <ul
    class="grid w-full grid-cols-4 items-center text-center text-sm font-medium sm:w-auto sm:space-x-3 md:text-left"
  >
    <li>
      <router-link
        to="/"
        exact-active-class="text-neutral-400"
        class="inline-block rounded-md font-medium outline-none focus-visible:ring-2 md:text-lg lg:text-2xl"
        ><Home class="mx-auto mb-2 h-6 sm:hidden" />Home</router-link
      >
    </li>
    <li>
      <router-link
        to="/birds"
        active-class="text-neutral-400"
        class="inline-block rounded-md font-medium outline-none focus-visible:ring-2 md:text-lg lg:text-2xl"
        ><Feather class="mx-auto mb-2 h-6 sm:hidden" />Vogels</router-link
      >
    </li>
    <li>
      <router-link
        to="/log"
        active-class="text-neutral-400"
        class="inline-block rounded-md font-medium outline-none focus-visible:ring-2 md:text-lg lg:text-2xl"
        ><Clipboard class="mx-auto mb-2 h-6 sm:hidden" />Logboek</router-link
      >
    </li>
    <li>
      <router-link
        to="/observations"
        active-class="text-neutral-400"
        class="inline-block rounded-md font-medium outline-none focus-visible:ring-2 md:text-lg lg:text-2xl"
        ><Scroll class="mx-auto mb-2 h-6 sm:hidden" />Observaties</router-link
      >
    </li>
    <li class="hidden pl-6 sm:block">
      <router-link
        to="/account"
        v-if="user"
        active-class="text-neutral-400"
        class="inline-block rounded-md font-medium outline-none first-letter:uppercase focus-visible:ring-2 md:text-lg lg:text-2xl"
        >{{ user?.displayName }}</router-link
      >
      <router-link
        to="/auth/login"
        v-else
        active-class="text-neutral-400"
        class="inline-block rounded-md font-medium outline-none focus-visible:ring-2 md:text-lg lg:text-2xl"
        >Login</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
import useAuthentication from '../../composables/useAuthentication'
import { Home, Feather, Scroll, Clipboard } from 'lucide-vue-next'

export default {
  components: {
    Home,
    Feather,
    Scroll,
    Clipboard,
  },
  setup() {
    const { user } = useAuthentication()
    return {
      user,
    }
  },
}
</script>
