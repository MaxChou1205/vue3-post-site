import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import {
  IPost, TimelinePost 
} from '@/models/post'
import { Period } from '@/models/constants'

const delay = () => {
  return new Promise<void>((res) => setTimeout(res, 1500))
}

export const usePosts = defineStore('posts', {
  state: (): IState => ({
    ids: [],
    content: new Map(),
    selectedPeriod: 'Today',
  }),
  getters: {
    filteredPosts: (state: IState): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.content.get(id)

          if (!post) throw Error(`post ${ id } not found`)

          return {
            ...post,
            created: dayjs(post.created),
          }
        })
        .filter((post) => {
          if (state.selectedPeriod === 'Today') {
            return post.created.isSame(dayjs(), 'day')
          }
          if (state.selectedPeriod === 'This Week') {
            return post.created.isSame(dayjs(), 'week')
          }
          if (state.selectedPeriod === 'This Month') {
            return post.created.isSame(dayjs(), 'month')
          }

          return post
        })
    },
  },
  actions: {
    setSelectedPeriod (periods: Period) {
      this.selectedPeriod = periods
    },
    async fetchPosts () {
      const res = await fetch('/api/posts')
      const posts = (await res.json()) as IPost[]
      await delay()

      let ids: string[] = []
      let content: Map<string, IPost> = new Map()
      for (const post of posts) {
        ids.push(post.id)
        content.set(post.id, post)
      }

      this.ids = ids
      this.content = content
    },
    async createPost (post: IPost) {
      const body = JSON.stringify({
        ...post,
      })
      return await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
    },
    async updatePost (post: IPost) {
      const body = JSON.stringify({
        ...post,
      })
      return await fetch('/api/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
    },
  },
})

interface IState {
  ids: string[]
  // content: Record<string, Post>
  content: Map<string, IPost>
  selectedPeriod: Period
}