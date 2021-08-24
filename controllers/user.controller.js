const User = require('../models/users.model')
const bcrypt = require('bcrypt')



module.exports = class UserController {

    // CREATE NEW USER
    static async addUser(data) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const userData = {
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age,
            password: hashedPassword
        }
        const user = new User({...userData })
        const output = await user.save()
        if (output) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    // GET NEW USER
    static async getUser(data) {
        const user = User.findById(data)
        if (user) {
            return user
        } else {
            return { message: "user not found" }
        }
    }

    // GET ALL USER
    static async getAllUser() {
        const user = User.find()
        if (user) {
            return user
        } else {
            return { message: "users not found" }
        }
    }

    // Update USER
    static async updateUser(data, newData) {
        const user = User.updateOne(data, newData)
        if (user) {
            return user
        } else {
            return { message: "update not accepted" }
        }
    }

    // DELETE USER
    static async deleteUser(data) {
        const user = User.deleteOne(data)
        if (user) {
            return user
        } else {
            return { message: "user not delete" }
        }
    }


}