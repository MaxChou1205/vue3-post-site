<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
</script>

<template>
  <Modal></Modal>

  <div class="max-w-[1280px] m-auto py-10">
    <Navbar></Navbar>
    <RouterView></RouterView>
  </div>
</template>

<style>
@import 'highlight.js/styles/atom-one-dark.css';
</style>