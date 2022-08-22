<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '@/stores/posts'
import { useUsers } from '@/stores/users'

const route = useRoute()
const postStore = usePosts()
const userStore = useUsers()
const id = route.params.id as string

const post = postStore.content.get(id)
if (!post) {
  throw new Error(`post ${ id } is not defined`)
}

const canEdit = computed(() => {
  if (!userStore.currentUserId || userStore.currentUserId !== post.authorId) {
    return false
  }
  return true
})
</script>

<template>
  <router-link
    v-if="canEdit"
    :to="`/post/${id}/edit`"
    class="inline-block p-2 mb-2 bg-blue-500 text-white rounded transform duration-300 hover:scale-105 active:translate-y-1"
  >
    Edit Post
  </router-link>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="post.html"></div>
  </div>
</template>