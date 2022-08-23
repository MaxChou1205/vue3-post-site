import express, {
  Request, Response 
} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import {
  today, thisWeek, thisMonth, IPost 
} from '../models/post'
import { IUser } from '../models/user'
import { types } from 'sass'
import Error = types.Error

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

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

app.patch<{}, {}, IPost>('/posts', (req, res) => {
  const index = allPosts.findIndex(p => p.id === req.body.id)
  if (index === -1)
    throw new Error(`post ${ req.body.id } was not found.`)
  
  const post = allPosts[index]
  allPosts[index] = {
    ...post, ...req.body 
  }
  res.json(allPosts[index])
})

const SECRET = 'secret123'
const COOKIE = 'vue-3-post-site'

function authenticate (id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, { expiresIn: '1d' })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.post<{}, {}, IUser>('/users', (req, res) => {
  const user: IUser = {
    ...req.body,
    id: (Math.random() * 10000).toFixed(),
  }
  allUsers.push(user)
  authenticate(user.id, req, res)
  const {
    password, ...userWithoutPassword 
  } = user

  res.json(userWithoutPassword)
})

app.get('/user', (req, res) => {
  const token = req.cookies[COOKIE]
  if (!token) {
    res.status(401).send('Unauthorized').end()
    return
  }

  let result: { id: string } = { id: '' }
  try {
    result = jsonwebtoken.verify(token, SECRET) as { id: string }
  } catch (err) {
    res.status(404).end()
    return
  }
  const user = allUsers.find((u) => u.id === result.id)
  if (!user) {
    res.status(404).send('not found').end()
    return
  }
  res.json(user)
})

app.post('/user/logout', (req, res) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
  return
})

app.post('/user/login', (req, res) => {
  console.log(allUsers)
  const user = allUsers.find((u) => u.username === req.body.username)
  if (!user || user.password !== req.body.password) {
    res.status(401).send('Unauthorized').end()
    return
  } else {
    authenticate(user.id, req, res)
    const {
      password, ...userWithoutPassword 
    } = user
    res.json(userWithoutPassword)
  }
})

app.listen(8000, () => {
  console.log('listening on port 8000')
})