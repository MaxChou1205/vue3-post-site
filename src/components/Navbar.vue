<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { useUsers } from '@/stores/users'
// import SignupForm from '@/components/SignupForm.vue'

const modal = useModal()
const userStore = useUsers()

userStore.authenticate()
</script>

<template>
  <div
    v-if="userStore.currentUserId"
    class="flex justify-end items-center"
  >
    <button
      class="mr-2"
      @click="userStore.logout()"
    >
      Log out
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

  <div
    v-else
    class="flex justify-end items-center"
  >
    <button
      class="mr-2"
      @click="modal.toggle('signup')"
    >
      Sign up
    </button>
    <button
      class="p-2 border border-dark-400 rounded cursor-pointer transform duration-300 hover:scale-105 active:translate-y-1"
      @click="modal.toggle('signin')"
    >
      Sign in
    </button>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value"></component>
  </Teleport>
</template>