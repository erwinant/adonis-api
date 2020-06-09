'use strict'

const User = use('App/Models/User')
class UserController {
    async index() {
        const users = await User.query().setHidden(['password']).fetch()
        return users
    }
    async login({ request, auth, response }) {
        const { userName, password } = request.all();
        const objAuth = await auth.attempt(userName, password)
        return response.status(200).json(objAuth)
    }
    async register({ request, response }) {
        const payload = request.all();
        const objInsert = await User.create(payload)
        return response.status(200).json(objInsert)
    }

    async update({params,request, response}){
        const attr = request.all();
        const objUpdate = await User.find(params.id)
        if(!objUpdate){
            return response.status(404).json({data:"Data not found"})
        }
        objUpdate.merge(attr)
        await objUpdate.save()
        return objUpdate;
    }
}

module.exports = UserController
