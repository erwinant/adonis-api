'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InBound extends Model {
    products(){
        return this.belongsToMany('App/Models/Product').withTimestamps()
    }
}

module.exports = InBound
