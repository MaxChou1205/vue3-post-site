<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import {
  ref, watch 
} from 'vue'
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import { TimelinePost } from '@/models/post'

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref<string>('')
// const editBlock = ref<HTMLDivElement>()

// onMounted(() => {
//   if (!editBlock.value) throw Error('editBlock is not defined')
//   editBlock.value.innerText = content.value
// })

// const handleInput = () => {
//   if (!editBlock.value) throw Error('editBlock is not defined')
//   content.value = editBlock.value?.innerText
// }

watch(
  content,
  (newVal) => {
    marked(
      newVal,
      {
        gfm: true,
        breaks: true,
        highlight: (code) => {
          return highlightjs.highlightAuto(code).value
        },
      },
      (err, parseResult) => {
        html.value = parseResult
      }
    )
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <label for="title">Post Title</label>
    <input
      id="title"
      v-model="title"
      type="text"
      class="block w-full mt-2"
    >
  </div>

  <div class="flex mt-4">
    <textarea
      ref="editBlock"
      v-model="content"
      class="w-[50%] mr-2"
    ></textarea>
    <div>
      <div v-html="html"></div>
    </div>
  </div>
</template>