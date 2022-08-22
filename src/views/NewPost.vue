<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePosts } from '@/stores/posts'
import { useUsers } from '@/stores/users'
import dayjs from 'dayjs'
import { IPost } from '@/models/post'
import PostWriter from '@/components/PostWriter.vue'

const router = useRouter()
const userStore = useUsers()
const postStore = usePosts()

if (!userStore.currentUserId) throw new Error('user is not authenticated')

const post: IPost = {
  id: '-1',
  title: '',
  created: dayjs().toISOString(),
  markdown: '## Title',
  html: '',
  authorId: userStore.currentUserId,
}

const createPost = async (post: IPost) => {
  await postStore.createPost(post)
  router.push('/')
}
</script>

<template>
  <div>new post</div>
  <PostWriter
    :post="post"
    :action="createPost"
  ></PostWriter>
</template>