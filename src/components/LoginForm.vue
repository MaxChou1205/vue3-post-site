<script setup lang="ts">
import { ref } from 'vue'
import UserForm from '@/components/UserForm.vue'
import { NewUser } from '@/models/user'
import { useUsers } from '@/stores/users'
import { useModal } from '@/composables/modal'

const userStore = useUsers()
const modal = useModal()
const error = ref('')

const handleLogin = async (newUser: NewUser) => {
  try {
    await userStore.login(newUser)
    await userStore.authenticate()
    modal.hide()
  } catch (e) {
    error.value = 'Invalid credentials'
  }
}
</script>

<template>
  <UserForm
    type="login"
    :error="error"
    @submit="handleLogin"
  ></UserForm>
</template>