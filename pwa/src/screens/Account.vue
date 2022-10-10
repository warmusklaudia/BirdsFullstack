<template>
  <route-holder :title="`Hi, ${user.displayName}`"></route-holder>
  <button @click="handleLogout">Log out</button>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import useAuthentication from '../composables/useAuthentication'
import RouteHolder from '../components/holders/RouteHolder.vue'

export default {
  components: {
    RouteHolder,
  },
  setup() {
    const { replace } = useRouter()
    const { user, logout } = useAuthentication()

    const handleLogout = () => {
      logout().then(() => {
        replace('/auth/login')
      })
    }

    return {
      user,
      handleLogout,
    }
  },
}
</script>
