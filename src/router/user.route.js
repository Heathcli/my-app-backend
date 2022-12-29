const Router = require('koa-router')
const { register, login, modInit,mod } = require('../controller/user.controller')
const userMiddleware = require('../middleware/user.middleware')
const globalMiddleware = require('../middleware/global.middleware')
const { registerCheck, encryption, loginCheck } = userMiddleware
const { checkToken } = globalMiddleware

const router = new Router({ prefix: '/user' })
// 注册接口
router.post('/register', registerCheck, encryption, register)
// 登陆接口
router.post('/login', loginCheck, login)
// 修改信息鉴权并回填
router.post('/mod-init', (ctx, next) => checkToken(ctx, next, { checkAdmin: true }), modInit)
// 修改接口
router.post('/mod', checkToken,encryption, mod)


module.exports = router