<script setup lang="ts">
import {
  computed, ref 
} from 'vue'
import FormInput from '@/components/FormInput.vue'
import {
  validate, required, length 
} from '@/models/validation'
import { NewUser } from '@/models/user'

defineProps<{
  type: string
  error?: string
}>()

const emit = defineEmits<{(event: 'submit', value: NewUser): void }>()

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
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

const handleSubmit = async () => {
  if (inValid.value) return

  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }

  emit('submit', newUser)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      v-model="username"
      name="Username"
      :status="usernameStatus"
      type="text"
    ></FormInput>
    <FormInput
      v-model="password"
      name="Password"
      :status="passwordStatus"
      type="password"
    ></FormInput>
    <div
      v-if="error"
      class="mt-2 text-red-500 text-xs italic"
    >
      {{ error }}
    </div>
    <button
      class="mt-4 uppercase"
      :disabled="inValid"
    >
      {{ type }}
    </button>
  </form>
</template>