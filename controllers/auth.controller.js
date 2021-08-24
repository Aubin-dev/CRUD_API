const Auth = require('../models/auth.model')
const bcrypt = require('bcrypt')

module.exports = class AuthController {

    static async addUser(data) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const authData = {
            email: data.email,
            password: hashedPassword
        }
        const auth = new Auth({...authData })
        const output = await auth.save()
        if (output) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    // LOGIN USER
    static async getUser(data) {
        const auth = await Auth.findOne({ email: data.email })
        if (!auth) {
            return { message: 'Nom d\'utilisateur ou mot de passe incorrect' }
        }
        const validate = await bcrypt.compare(data.password, auth.password)
        if (!validate) {
            return { message: 'Mot de passe incorrect' }
        }

        const { password, ...others } = auth._doc
        return others
    }
}