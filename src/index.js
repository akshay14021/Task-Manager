const express = require('express')
const cors = require('cors')
const path = require('path')
require('./db/mongoose')
require('dotenv').config()
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 8000

// Parse json to object
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
	console.log('Server Up! Happy Hacking')
})
