import { defineStore } from 'pinia'
import {
  IUser, NewUser, UserState 
} from '@/models/user'

export const useUsers = defineStore('users', {
  state: (): UserState => ({
    currentUserId: undefined,
  }),
  actions: {
    async authenticate () {
      try {
        const res = await fetch('/api/user', {
          headers: {
            'content-type': 'application/json',
          },
        })
        const result: IUser = await res.json()
        this.currentUserId = result.id
        return result
      } catch (err) {
        this.currentUserId = undefined
      }
    },
    async logout () {
      await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      })
      this.authenticate()
    },
    async createUser (newUser: NewUser) {
      const body = JSON.stringify(newUser)

      await await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      return this.authenticate()
    },
  },
})