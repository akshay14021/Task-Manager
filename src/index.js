const express = require('express')
const path = require('path')
const cors = require('cors')
require('./db/mongoose')
require('dotenv').config()
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 8000

// Parse json to object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'))
	app.get('/*', (req, res) => {
		res.sendFile(path.path(__dirname, 'client', 'build', 'index.html'))
	})
}

app.listen(port)
