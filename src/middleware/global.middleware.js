const { global } = require('../constant/responseState')
const jwt = require('jsonwebtoken')

const globalMiddleware = {
    // 全局捕获未知错误
    catchError: async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.body = global.error();
        }
    },
    // 检查token并把用户信息存在ctx里
    checkToken: async (ctx, next, parmas={} ) => {
        const { authorization } = ctx.request.header
        if(!authorization) {
            ctx.body = global.noLogin()
            return
        }
        const token = authorization.replace('Bearer ','')
        try {
            const userInfo = jwt.verify(token, 'pLikejhwLikeyD1')
            if(parmas.checkAdmin) {
                if(!userInfo.is_admin) {
                    ctx.body = global.noPermission()
                    return 
                }
            }
            ctx.userInfo = userInfo
            await next()
        } catch(err) {
            ctx.body = global.JsonWebTokenError()
        }
    },
    // 捕获所有操作数据库的参数报错
    catchPramasError: async(ctx, next) => {
        try {
            await next();
        } catch (error) {
            if(error.name === 'SequelizeDatabaseError') {
                ctx.body = global.ParamsError()
                return
            }
            ctx.body = global.error();
        }
    }
}

module.exports = globalMiddleware