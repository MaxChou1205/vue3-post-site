<script setup lang="ts">
defineProps<{
  name: string
  modelValue: string
}>()

const emit = defineEmits<
  {(event: 'update:modelValue', value: string): void }
>()

function handleInput (e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <label :for="name">{{ name }}</label>
    <div>
      <input
        :id="name"
        type="text"
        :value="modelValue"
        @input="handleInput"
      >
    </div>
  </div>
</template>