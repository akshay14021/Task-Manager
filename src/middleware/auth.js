const jwt = require('jsonwebtoken')
const User = require('../models/user')

const secret = process.env.SECRET || 'thisismynewcourse'

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, secret)
		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token
		})

		if (!user) {
			throw new Error('Please Authenticate')
		}
		// Sending data in the req object to route callback
		req.token = token
		req.user = user
		next()
	} catch (error) {
		res.status(401).send({ error: 'Please Authenticate' })
	}
}

module.exports = auth
