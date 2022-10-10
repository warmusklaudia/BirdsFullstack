<template>
    <div class="grid h-screen min-h-screen grid-rows-[auto_1fr_auto] sm:h-auto">
        <AppHeader />
        <router-view class="min-h-screen"></router-view>
        <AppFooter />
    </div>

</template>

<script lang="ts">
import useAuthentication from '../../composables/useAuthentication';
import AppFooter from '../generic/AppFooter.vue'
import AppHeader from '../generic/AppHeader.vue';


    export default {                
        components: {
                AppFooter,
                AppHeader,
                },
    }
</script>