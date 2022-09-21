<template>
                <ul class="grid w-full sm:w-auto grid-cols-4 items-center font-medium sm:space-x-3 text-center md:text-left text-sm">
                <li><Home class="h-6 sm:hidden mb-2 mx-auto" /><router-link to="/" class=" md:text-lg lg:text-2xl font-medium">Home</router-link></li>
                <li><Feather class="h-6 sm:hidden mb-2 mx-auto" /><router-link to="/birds" class=" md:text-lg lg:text-2xl font-medium">Vogels</router-link></li>
                <li><Clipboard class="h-6 sm:hidden mb-2 mx-auto" /><router-link to="/log" class=" md:text-lg lg:text-2xl font-medium">Logboek</router-link></li>
                <li><Scroll class="h-6 sm:hidden mb-2 mx-auto" /><router-link to="/observations" class=" md:text-lg lg:text-2xl font-medium">Observaties</router-link> </li>
                <li class="hidden pl-6 sm:block">
                    <router-link  to="/account" v-if="user" class="md:text-lg lg:text-2xl font-medium first-letter:uppercase">{{user?.displayName}}</router-link>
                    <router-link to="/auth/login" v-else class="md:text-lg lg:text-2xl font-medium first-letter:uppercase">Login</router-link>
                </li>
            </ul>
</template>

<script lang="ts">
    import useAuthentication from '../../composables/useAuthentication';
    import { Home, Feather, Scroll, Clipboard } from 'lucide-vue-next'


    export default {
            components: {
                Home, Feather, Scroll, Clipboard
    },
        setup () {
            const { user } = useAuthentication()
            return {
                user
            }
        }
    }
</script>