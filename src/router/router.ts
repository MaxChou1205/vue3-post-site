import {
  createRouter, createWebHistory 
} from 'vue-router'
import Home from '@/views/Home.vue'
import NewPost from '@/views/NewPost.vue'
import PostViewer from '@/views/PostViewer.vue'
import EditPost from '@/views/EditPost.vue'
import { useUsers } from '@/stores/users'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/post/new',
      component: NewPost,
      beforeEnter: async () => {
        const userStore = useUsers()
        await userStore.authenticate()
        if (!userStore.currentUserId) return { path: '/' }
      },
    },
    {
      path: '/post/:id',
      component: PostViewer,
    },
    {
      path: '/post/:id/edit',
      component: EditPost,
      beforeEnter: async () => {
        const userStore = useUsers()
        await userStore.authenticate()
        if (!userStore.currentUserId) return { path: '/' }
      },
    },
  ],
})