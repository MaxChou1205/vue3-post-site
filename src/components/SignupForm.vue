<script setup lang="ts">
import {
  computed, ref 
} from 'vue'
import FormInput from '@/components/FormInput.vue'
import {
  validate, required, length 
} from '@/models/validation'

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
</script>

<template>
  <form>
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
  </form>
</template>