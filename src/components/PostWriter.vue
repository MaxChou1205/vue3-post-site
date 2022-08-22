<script setup lang="ts">
import {
  ref, watch 
} from 'vue'
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { useUsers } from '@/stores/users'
import { IPost } from '@/models/post'
import { Dayjs } from 'dayjs'

const props = defineProps<{
  post: IPost
  action(post: IPost): void
}>()

const userStore = useUsers()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref<string>(props.post.html)
// const editBlock = ref<HTMLDivElement>()

// onMounted(() => {
//   if (!editBlock.value) throw Error('editBlock is not defined')
//   editBlock.value.innerText = content.value
// })

// const handleInput = () => {
//   if (!editBlock.value) throw Error('editBlock is not defined')
//   content.value = editBlock.value?.innerText
// }

const parseHtml = (markdown: string) => {
  marked(
    markdown,
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
}

const handleSave = async () => {
  if (!userStore.currentUserId) {
    throw new Error('user is not authenticated')
  }

  const params: IPost = {
    ...props.post,
    created:
      typeof props.post.created === 'string'
        ? props.post.created
        : (props.post.created as Dayjs).toISOString(),
    title: title.value,
    markdown: content.value,
    html: html.value,
    authorId: userStore.currentUserId,
  }
  props.action(params)
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent)
  }, 250),
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

  <div class="mt-3">
    <button
      type="button"
      class="block ml-auto primary"
      @click="handleSave"
    >
      Save
    </button>
  </div>
</template>