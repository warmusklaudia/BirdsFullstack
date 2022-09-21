<template>
    <h1>Hi, {{user?.displayName}}</h1>
    <button @click="handleLogout">Log out</button>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import useAuthentication from '../composables/useAuthentication';

export default {
    setup () {
        const { replace } = useRouter()
        const { user, logout } = useAuthentication()

        const handleLogout = () => {
            logout().then(() => {
                replace ('/auth/login')
            })
        }

        return {
            user,
            handleLogout,
        }
    }
}
</script>