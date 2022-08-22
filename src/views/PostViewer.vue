<script setup lang="ts">
import { usePosts } from '@/stores/posts'
import { useRoute } from 'vue-router'

const route = useRoute()
const postStore = usePosts()
const id = route.params.id as string

const post = postStore.content.get(id)
if (!post) {
  throw new Error(`post ${ id } is not defined`)
}
</script>

<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="post.html"></div>
  </div>
</template>