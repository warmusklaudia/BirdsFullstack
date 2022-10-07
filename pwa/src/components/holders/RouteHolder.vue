<template>
  <div class="px-6">
    <main class="mx-auto max-w-6xl">
      <h1 v-if="title" class="font-theme text-3xl font-bold">{{ title }}</h1>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
interface CustomPropType {
  title: {
    type: Object
    required: boolean
  }
}
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },

  setup(props: CustomPropType) {
    return { title: props.title }
  },
}
</script>
