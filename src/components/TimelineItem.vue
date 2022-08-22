<script setup lang="ts">
import { TimelinePost } from '@/models/post'

const props = defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <router-link
    :to="`post/${post.id}`"
    class="py-2 mb-2 flex flex-col items-center justify-center hover:bg-gray-100 hover:text-blue-600"
  >
    <span>{{ props.post.title }}</span>
    <div>{{ props.post.created.format('YYYY/MM/DD') }}</div>
  </router-link>
</template>