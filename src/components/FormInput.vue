<script setup lang="ts">
import { IStatus } from '@/models/validation'

defineProps<{
  name: string
  modelValue: string
  status: IStatus,
  type: string
}>()

const emit = defineEmits<{(event: 'update:modelValue', value: string): void}>()

function handleInput (e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <label :for="name">{{ name }}</label>
    <div class="mt-2">
      <input
        :id="name"
        class="w-full"
        :type="type"
        :value="modelValue"
        @input="handleInput"
      >
    </div>
    <div
      v-if="!status.valid"
      class="form_error"
    >
      {{ status.message }}
    </div>
  </div>
</template>