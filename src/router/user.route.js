const Router = require('koa-router')
const { register, login, modInit,mod } = require('../controller/user.controller')
const userMiddleware = require('../middleware/user.middleware')
const globalMiddleware = require('../middleware/global.middleware')
const { registerCheck, encryption, loginCheck } = userMiddleware
const { checkToken } = globalMiddleware

const router = new Router({ prefix: '/user' })

router.post('/register', registerCheck, encryption, register)

router.post('/login', loginCheck, login)

router.post('/mod-init', (ctx, next) => checkToken(ctx, next, { checkAdmin: true }), modInit)

router.post('/mod', checkToken,encryption, mod)


module.exports = router