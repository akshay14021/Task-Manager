const mongoose = require('mongoose')

//Database Connection
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task-app-api',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
