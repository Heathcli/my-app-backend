const { createUser, getUserInfo, userMod } = require('../service/user.service')
const { login, global, success } = require('../constant/responseState')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    // 注册
    register = async (ctx, next) => {
        const { user_name, password, is_admin = 0 } = ctx.request.body
        await createUser(user_name, password, is_admin).then((res) => {
            ctx.body = success({ user_name: res.user_name })
        }).catch(() => {
            ctx.body = global.error()
        })
    }
    // 登录
    login = async (ctx, next) => {
        const { user_name, password } = ctx.request.body
        await getUserInfo(user_name).then((res) => {
            // 用户不存在
            if (!res) {
                ctx.body = login.UserNotExist()
                return
            }
            if (bcrypt.compareSync(password, res.password)) {
                delete res.password
                ctx.cookies.set('token', jwt.sign(res, 'pLikejhwLikeyD1', { expiresIn: '1d' }))
                ctx.body = success({ userInfo: res })
            } else {
                ctx.body = login.passwordError(res)
            }
        }).catch((e) => {
            console.log(e);
            ctx.body = global.error()
        })
    }
    // 修改信息初始化
    modInit = async (ctx, next) => {
        const { userInfo } = ctx
        let userInit = {
            id: userInfo.id,
            userName: userInfo.user_name,
            password: '******'
        }
        ctx.body = success({ userInit })
    }
    // 修改
    mod = async (ctx, next) => {
        const { userInfo } = ctx
        const { id, user_name, password } = ctx.request.body
        if (userInfo.id == id) {
            await userMod({ id, user_name, password }).then((res) => {
                if (!res) {
                    ctx.body = login.UserNotExist()
                    return
                }
                delete res.password
                ctx.cookies.set('token', jwt.sign(res, 'pLikejhwLikeyD1', { expiresIn: '1d' }))
                ctx.body = success({ userInfo: res })
            }).catch((err) => {
                console.log(err);
                ctx.body = global.error()
            })
        } else {
            ctx.body = global.JsonWebTokenError()
        }
    }
}

module.exports = new UserController()