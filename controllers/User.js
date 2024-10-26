const bcryptjs = require('bcryptjs')

class UsersControllers {
    async getUsers(req, res){
        try {
            const users = await req.app.locals.services.users.getUsers()
            res.status(200).render('index', {users})
        } catch (error) {
            res.status(500).json({"msg" : "users not found"})
        }
    }
    async getUser(req, res){
        try {
            const {id} = req.params
            const user = await req.app.locals.services.users.getUser(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({"msg" : "user not found"})
        }
    }
    async createUser(req, res){
        try {
            // console.log('router', req.file);
            
            const {body, file} = req

            delete body.confirmPassword 
            const hashPassword = await bcryptjs.hash(body.password, 10)
            body.password = hashPassword
          
            const user = await req.app.locals.services.users.createUser(body, file)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({"msg" : "user not found"})
        }
    }
    async removeUser(req, res){
        try {
            const {id} = req.params
            const user = await req.app.locals.services.users.removeUser(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({"msg" : "user not found"})
        }
    }
    async changeUser(req, res){
        try {
            const {id} = req.params
            const {name} = req.body
            const user = await req.app.locals.services.users.changeUser(id, name)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({"msg" : "user not found"})
        }
    }
}

module.exports = UsersControllers