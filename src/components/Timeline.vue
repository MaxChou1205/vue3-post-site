<script setup lang="ts">
import { usePosts } from '@/stores/posts'
import { periods } from '@/models/constants'
import TimelineItem from './TimelineItem.vue'

const postStore = usePosts()
</script>

<template>
  <nav class="mt-5 px-4 py-4 shadow rounded">
    <span class="flex justify-center gap-6 mb-4">
      <a
        v-for="period in periods"
        :key="period"
        class="p-1 cursor-pointer"
        :class="{ active: postStore.selectedPeriod === period }"
        @click="postStore.setSelectedPeriod(period)"
      >{{ period }}</a>
    </span>

    <TimelineItem
      v-for="post in postStore.filteredPosts"
      :key="post.id"
      :post="post"
    ></TimelineItem>
  </nav>
</template>

<style lang="scss" scoped>
.active {
  color: #555;
  border-bottom: 2px solid #5e5e5e;
}
</style>