import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
  today, thisWeek, thisMonth, IPost 
} from '../models/post'

const app = express()
app.use(cors())
app.use(bodyParser.json())

let allPosts: IPost[] = [ today, thisWeek, thisMonth ]

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

app.listen(8000, () => {
  console.log('listening on port 8000')
})