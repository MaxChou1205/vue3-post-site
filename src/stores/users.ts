import { defineStore } from 'pinia'
import { NewUser } from '@/models/user'

export const useUsers = defineStore('users', {
  actions: {
    async createUser (newUser: NewUser) {
      const body = JSON.stringify(newUser)

      return await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
    },
  },
})