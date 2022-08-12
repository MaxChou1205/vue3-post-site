<script setup lang="ts">
import { useModal } from '@/composables/modal'

const modal = useModal()
</script>

<template>
  <div
    v-if="modal.isOpen.value"
    class="fixed inset-0 overflow-y-auto"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Modal Close Button -->
        <div class="pr-2 flex justify-end items-center z-50">
          <span
            class="cursor-pointer"
            @click="modal.toggle"
          >&times;</span>
        </div>

        <!-- Modal Content -->
        <div
          id="modal"
          class="p-4"
        ></div>
      </div>
    </div>
  </div>
</template>