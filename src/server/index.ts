import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
  today, thisWeek, thisMonth, IPost 
} from '../models/post'
import { IUser } from '../models/user'

const app = express()
app.use(cors())
app.use(bodyParser.json())

let allPosts: IPost[] = [ today, thisWeek, thisMonth ]
let allUsers: IUser[] = []

app.get('/posts', (req, res) => {
  res.json(allPosts)
})

app.post<{}, {}, IPost>('/posts', (req, res) => {
  const post: IPost = {
    ...req.body,
    id: (Math.random() * 10000).toFixed(),
  }
  allPosts.push(post)

  res.json(post)
})

app.post<{}, {}, IUser>('/users', (req, res) => {
  const user: IUser = {
    ...req.body,
    id: (Math.random() * 10000).toFixed(),
  }
  allUsers.push(user)
  const {
    password, ...userWithoutPassword 
  } = user

  res.json(userWithoutPassword)
})

app.listen(8000, () => {
  console.log('listening on port 8000')
})