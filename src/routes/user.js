const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

//Routes
router.post('/users', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		res.status(400).send(error.message)
	}
})

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		)
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (error) {
		res.status(400).send(error.message)
	}
})

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token
		})
		await req.user.save()
		res.send('You have logged out')
	} catch (error) {
		res.status(500).send(error.message)
	}
})

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send('Logged out of all sessions')
	} catch (error) {
		res.status(500).send(error.message)
	}
})

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'password', 'email', 'age']
	const isValid = updates.every(update => allowedUpdates.includes(update))

	if (!isValid) {
		return res.status(400).send({ error: 'Invalid updates done' })
	}

	try {
		updates.forEach(update => {
			req.user[update] = req.body[update]
		})

		await req.user.save()
		res.send(req.user)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove()
		res.send(req.user)
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
