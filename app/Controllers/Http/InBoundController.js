'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with inbounds
 */
const InBound = use('App/Models/InBound')
const Product = use('App/Models/Product')
class InBoundController {
  /**
   * Show a list of all inbounds.
   * GET inbounds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const inBound = await InBound.all();
    return inBound;
  }

  async create({ request, response }) {
    const payload = request.all()
    const objInsert = await InBound.create(payload);
    return objInsert
  }

  async createEx1({ request, response }) {
    const payloadInbound = request.except(['products'])
    const payloadProduct = request.only(['products']) //.collect(['sku', 'name','height','width','length','weight','qty'])

    const insInBound = await InBound.create(payloadInbound)
    const insProducts = await insInBound.products().createMany(payloadProduct.products)

    return insInBound
  }

  async createEx2({ request, response }) {
    const payloadInbound = request.except(['products'])
    const payloadProduct = request.only(['products']) //.collect(['sku', 'name','height','width','length','weight','qty'])

    const insInBound = await InBound.create(payloadInbound)
    const insProducts = await Product.createMany(payloadProduct.products)
    //insProducts = await insInBound.inBounds().where('_id', insInBound._id)
    //console.log(insProducts.toJSON())
    console.log(insInBound.toJSON())
    //await insInBound.products().attach([insProducts._id], null)
    return insInBound
  }

  async getUseUnwind({ request, response }) {
    
    const inbounds = await InBound.where({}).aggregate([
      {
        '$unwind': {
          'path': '$products'
        }
      }
    ])
    
    return response.send(inbounds)
  }

  async show({ params, request, response }) {
    const obj = await InBound.find(params.id)
    return obj
  }

  async show_criteria({ request, response }) {
    const obj = await InBound.where(request.all()).paginate(2, 10)
    return obj
  }

  async update({ params, request, response }) {
    const attr = request.all();
    const objUpdate = await InBound.find(params.id)
    if (!objUpdate) {
      return response.status(404).json({ data: "Data not found" })
    }
    objUpdate.merge(attr)
    await objUpdate.save()
    return objUpdate;
  }

}

module.exports = InBoundController
