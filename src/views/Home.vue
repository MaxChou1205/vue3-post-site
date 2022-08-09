<template>
  <Suspense>
    <Timeline></Timeline>

    <template #fallback>
      <div class="mt-[20%] flex justify-center items-center">
        Loading...
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
</script>