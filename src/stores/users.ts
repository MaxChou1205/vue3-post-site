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
    async login (newUser: NewUser) {
      const body = JSON.stringify(newUser)

      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if ([ 401, 403, 404 ].includes(res.status)) {
        throw new Error('Invalid credentials')
      }

      this.currentUserId = (await res.json()).id
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