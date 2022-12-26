const User = require("../model/user.model");
const { register,login } = require('../constant/responseState')

const bcrypt = require('bcryptjs');
const userMiddleware = {

    // 注册密码加密
    encryption: async (ctx, next) => {
        const { password } = ctx.request.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        ctx.request.body.password = hashPassword

        await next()
    },
    // 注册字段格式校验
    registerCheck: async (ctx, next) => {
        const { user_name, password } = ctx.request.body
        if (!user_name || !password) {
            ctx.body = register.registerIllegal()
            return
        }
        const project = await User.findOne({ where: { user_name } });
        if (project) {
            ctx.body = register.registerRepeat()
            return
        }
        await next()
    },
    // 登录字段格式校验
    loginCheck: async (ctx, next) => {
        const { user_name, password } = ctx.request.body
        if (!user_name || !password) {
            ctx.body = login.loginIllegal()
            return
        }
        await next()
    }
}

module.exports = userMiddleware