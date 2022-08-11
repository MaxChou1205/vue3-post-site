<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-10 bg-dark-300 hidden"
    style=""
  >
    <div class="w-[600px] h-[600px] pos-center rounded-lg bg-white text-black">
      <div class="">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large"></button>
  </div>

  <div class="max-w-[1280px] m-auto py-10">
    <Navbar></Navbar>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';
</style>