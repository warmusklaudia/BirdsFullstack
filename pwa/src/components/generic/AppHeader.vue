<template>
    <header class="px-6 py-6">
        <nav class="max-w-6xl mx-auto flex items-center justify-between">
            <router-link class="" to="">
                <img src="/safari-pinned-tab.svg" class="w-12 pr-2 md:w-18" alt="">
            </router-link>
            <AppNavigation class="hidden sm:flex"/>
        </nav>
    </header>
</template>

<script lang="ts">
    import useAuthentication from '../../composables/useAuthentication';
    import Logo from './Logo.vue'
    import AppNavigation from '../generic/AppNavigation.vue'

    export default {

        components: {
            Logo,
            AppNavigation
        },
        setup () {
            const { user } = useAuthentication()
            return {
                user
            }
        }
    }
</script>