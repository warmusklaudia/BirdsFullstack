<template>
    <div class="grid min-h-screen place-items-center bg-neutral-50">
        <div class="w-full max-w-lg px-6">
            <h1 class="text-4xl text-neutral-800 font-semibold mb-6">Birds</h1>
            <div class="mb-20 rounded-md bg-white p-6 shadow">
               <router-view></router-view> 
            </div>
        </div>
    </div>
</template>