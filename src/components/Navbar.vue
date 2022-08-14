<script setup lang="ts">
import { useModal } from '@/composables/modal'
import SignupForm from '@/components/SignupForm.vue'

const modal = useModal()
</script>

<template>
  <div class="flex justify-end items-center">
    <button
      class="mr-2"
      @click="modal.toggle"
    >
      Sign up
    </button>
    <button
      class="p-2 border border-dark-400 rounded cursor-pointer transform duration-300 hover:scale-105 active:translate-y-1"
    >
      <router-link
        to="/post/new"
        class="text-dark-900 active:text-dark-400 hover:text-gray-500"
      >
        New Post
      </router-link>
    </button>
  </div>

  <Teleport to="#modal">
    <SignupForm></SignupForm>
  </Teleport>
</template>