<template>
  <div class="min-h-[50vh]" ref="mapElement"></div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const mapElement = ref(null)

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

    onMounted(() => {
      const map = new mapboxgl.Map({
        container: mapElement.value,
        style: 'mapbox://styles/mapbox/streets:v11',
        center: [-74.5, 40],
        zoom: 9,
        projection: 'globe',
      })

      map.on('style.load', () => {
        map.setFog({})
      })
    })
    return {
      mapElement,
    }
  },
}
</script>
