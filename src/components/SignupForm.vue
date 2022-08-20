<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { NewUser } from '@/models/user'
import { useUsers } from '@/stores/users'
import { useModal } from '@/composables/modal'

const userStore = useUsers()
const modal = useModal()

const handleSignup = async (newUser: NewUser) => {
  try {
    await userStore.createUser(newUser)
  } finally {
    modal.hide()
  }
}
</script>

<template>
  <UserForm @submit="handleSignup"></UserForm>
</template>