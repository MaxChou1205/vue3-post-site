<script setup lang="ts">
import {
  computed, ref 
} from 'vue'
import FormInput from '@/components/FormInput.vue'
import {
  validate, required, length 
} from '@/models/validation'
import { useUsers } from '@/stores/users'
import { NewUser } from '@/models/user'
import { useModal } from '@/composables/modal'

const userStore = useUsers()
const modal = useModal()

const username = ref('')
const usernameStatus = computed(() =>
  validate(username.value, [
    required,
    length({
      min: 3,
      max: 20,
    }),
  ])
)

const password = ref('')
const passwordStatus = computed(() =>
  validate(password.value, [
    required,
    length({
      min: 6,
      max: 40,
    }),
  ])
)

const inValid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const handleSubmit = async () => {
  if (inValid.value) return
  
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }

  try {
    await userStore.createUser(newUser)
  } catch (err) {
    console.error(err)
  } finally {
    modal.toggle()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      v-model="username"
      name="username"
      :status="usernameStatus"
      type="text"
    ></FormInput>
    <FormInput
      v-model="password"
      name="password"
      :status="passwordStatus"
      type="password"
    ></FormInput>
    <button
      class="mt-4"
      :disabled="inValid"
    >
      Sign up
    </button>
  </form>
</template>