const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')



router.post('/user', async(req, res) => {
    const { success } = await UserController.addUser(req.body)
    if (success) {
        return res.status(200).json({ message: "utilisateur ajouté" })
    } else {
        return res.status(200).json({ message: "Quelque chose s'est mal passé. Veillez réessayer" })
    }
})

// GET USER INFO
router.get('/user/:id', async(req, res) => {
    const userId = req.params.id
    const user = await UserController.getUser({ _id: userId })
    if (user !== null) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
})

router.get('/user', async(req, res) => {

    const user = await UserController.getAllUser()
    if (user !== null) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
})

router.put('/user/:id', async(req, res) => {
    const userId = req.params.id
    const user = await UserController.updateUser({ _id: userId }, {...req.body, _id: userId })
    if (user !== null) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'User not delete' })
    }
})

router.delete('/user/:id', async(req, res) => {
    const userId = req.params.id
    const user = await UserController.deleteUser({ _id: userId })
    if (user !== null) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'User not delete' })
    }
})



// UPDATE USER
router.post('/user/update', async(req, res) => {
    const user = await UserController.updateUser(req.body)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(201).json({ message: "Oups... Quelque chose s'est mal passé, veillez rééssayer" })
    }
})

module.exports = router