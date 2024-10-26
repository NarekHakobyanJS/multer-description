class UsersServices {
    constructor(models){
        this.models = models
    }
    async getUsers(){
        const users = await this.models.users.find()
        return users
    }
    async getUser(id){
        const users = await this.models.users.findById(id)
        return users
    }
    async createUser(body, file){
        const doc = await this.models.users({...body, image : file?.filename})
        const user = await doc.save()
        return user
    }
    async removeUser(id){
        const deleteUser = await this.models.users.findByIdAndDelete(id)
        return deleteUser
    }
    async changeUser(id, name){
        const updateUser = await this.models.users.findByIdAndUpdate(id, {name : name})
        return updateUser
    }
}

module.exports = UsersServices