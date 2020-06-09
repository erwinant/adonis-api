'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    inBounds(){
        return this.belongsToMany('App/Models/InBound')
    }
}

module.exports = Product
