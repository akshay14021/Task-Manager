const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('../models/task')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannnot be "password"')
			}
		}
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number')
			}
		}
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
})

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
})

//Available on instance
userSchema.methods.generateAuthToken = async function() {
	const user = this
	const secret = process.env.SECRET || 'thisismynewcourse'
	const token = jwt.sign({ _id: user._id.toString() }, secret)

	// user.tokens = user.tokens.concat({ token })
	user.tokens = [...user.tokens, { token }]
	await user.save()
	return token
}

userSchema.methods.toJSON = function() {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

// Available on Model
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Unable to find user, please check your details')
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error(
			'Unable to login, please check your username or password'
		)
	}

	return user
}

// Hash the password
userSchema.pre('save', async function(next) {
	const user = this

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
	const user = this
	await Task.deleteMany({ owner: user._id })
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
