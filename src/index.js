const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 5000

// Parse json to object
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Server Up! Happy Hacking')
})
