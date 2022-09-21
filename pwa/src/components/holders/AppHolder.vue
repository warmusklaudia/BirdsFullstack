<template>
        <header>
        <nav class="my-6 mx-10">
            <div class="flex justify-between items-center">
                <img src="/safari-pinned-tab.svg" class="w-18" alt="">
                <div class="flex gap-8">
                    <RouterLink to="/" class="invisible md:visible md:text-lg lg:text-2xl font-medium">Home</RouterLink>
                    <RouterLink to="/birds" class="invisible md:visible md:text-lg lg:text-2xl font-medium">Vogels</RouterLink>
                    <RouterLink to="/log" class="invisible md:visible md:text-lg lg:text-2xl font-medium">Logboek</RouterLink>
                    <RouterLink to="/observations" class="invisible md:visible md:text-lg lg:text-2xl font-medium">Observaties</RouterLink> 
                    <RouterLink to="/locations" class="invisible md:visible md:text-lg lg:text-2xl font-medium">Locaties</RouterLink> 
                    <RouterLink to="/account" class="invisible md:visible md:text-lg lg:text-2xl font-medium first-letter:uppercase">{{user?.displayName}}</RouterLink>
                </div>
            </div>
        </nav>
    </header>
    <router-view class="min-h-screen"></router-view>
    <AppFooter />
</template>

<script lang="ts">
import useAuthentication from '../../composables/useAuthentication';
import AppFooter from '../generic/AppFooter.vue'


    export default {                
        components: {
                AppFooter,
                },
        setup() {
            const { user } = useAuthentication()
            return {
                user
            }
        }

    }
</script>