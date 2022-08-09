<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
</script>

<template>
  <div class="max-w-[1280px] m-auto">
    <Suspense>
      <Timeline></Timeline>

      <template #fallback>
        <div class="mt-[20%] flex justify-center items-center">
          Loading...
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>