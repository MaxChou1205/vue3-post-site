<template>
  <div class="flex items-center">
    <button
      class="ml-auto p-2 border border-dark-400 rounded cursor-pointer transform duration-300 hover:scale-105 active:translate-y-1"
    >
      <router-link
        to="/post/new"
        class="text-dark-900 active:text-dark-400 hover:text-gray-500"
      >
        New Post
      </router-link>
    </button>
  </div>

  <Teleport to="#modal">
    test 123
  </Teleport>
</template>