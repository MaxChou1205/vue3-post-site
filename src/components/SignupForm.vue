<script setup lang="ts">
import {
  computed, ref 
} from 'vue'
import FormInput from '@/components/FormInput.vue'
import {
  validate, required, length 
} from '@/models/validation'
import { NewUser } from '@/models/user'

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
      min: 10,
      max: 40,
    }),
  ])
)

const inValid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const handleSubmit = () => {
  if (inValid.value) return
  
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }

  console.log(newUser)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      v-model="username"
      name="username"
      :status="usernameStatus"
    ></FormInput>
    <FormInput
      v-model="password"
      name="password"
      :status="passwordStatus"
    ></FormInput>
    <button
      class="mt-4"
      :disabled="inValid"
    >
      Sign up
    </button>
  </form>
</template>