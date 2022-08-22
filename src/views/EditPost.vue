<script setup lang="ts">
import {
  useRoute, useRouter 
} from 'vue-router'
import { usePosts } from '@/stores/posts'
import { IPost } from '@/models/post'
import PostWriter from '@/components/PostWriter.vue'

const route = useRoute()
const router = useRouter()
const postStore = usePosts()

const id = route.params.id as string
const post = postStore.content.get(id)
if (!post) {
  throw new Error(`post ${ id } is not defined`)
}

const updatePost = async (post: IPost) => {
  await postStore.updatePost(post)
  router.push('/')
}
</script>

<template>
  <div class="uppercase">
    edit post
  </div>
  <PostWriter
    :post="post"
    :action="updatePost"
  ></PostWriter>
</template>