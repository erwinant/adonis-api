'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//auth
Route.group(()=>{
  Route.post('/user/register', 'UserController.register')
  Route.post('/user/login', 'UserController.login')
  Route.get('/user', 'UserController.index')
  Route.put('/user/:id', 'UserController.update')

  
  Route.get('/inbound', 'InBoundController.index')
  Route.post('/inbound', 'InBoundController.createEx2')
  Route.put('/inbound/:id', 'InBoundController.update')
  Route.post('/inbound/criteria', 'InBoundController.show_criteria')
  Route.get('/inbound/unwind', 'InBoundController.getUseUnwind')
}).prefix('api')