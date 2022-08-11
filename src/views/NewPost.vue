<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import { TimelinePost } from '@/models/post'
import dayjs from 'dayjs'

const post: TimelinePost = {
  id: '-1',
  title: '',
  created: dayjs(),
  markdown: '## Title',
  html: '',
}
</script>

<template>
  <div>new post</div>
  <PostWriter :post="post"></PostWriter>
</template>