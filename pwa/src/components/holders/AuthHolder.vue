<template>
    <div class="grid min-h-screen place-items-center bg-neutral-50">
        <div class="w-full max-w-lg px-6">
            <Logo class="mx-auto mb-12 h-20 animate-bounce" />
            <div class="mb-20 rounded-lg bg-white px-6 py-10">
               <router-view></router-view> 
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Logo from '../../components/generic/Logo.vue'
</script>