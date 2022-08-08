import express from 'express'
import cors from 'cors'
import { today, thisWeek, thisMonth } from "../models/post"

const app = express()
app.use(cors())

app.get("/posts", (req, res) => {
  res.json([today, thisWeek, thisMonth])
})

app.listen(8000, () => {
  console.log("listening on port 8000")
})