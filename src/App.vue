<template>
  <div class="max-w-[1280px] m-auto py-10">
    <Navbar></Navbar>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped></style>