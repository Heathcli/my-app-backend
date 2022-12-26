const responseState = {
    success: (data) => {
        return {
            code: 0,
            data
        }
    },
    register: {
        registerRepeat: () => {
            return {
                code: 1,
                msg: '当前用户已存在'
            }
        },
        registerIllegal: () => {
            return {
                code: 2,
                msg: '用户名或密码不合法'
            }
        }
    },
    login: {
        passwordError: () => {
            return {
                code: 3,
                msg: '密码错误'
            }
        },
        loginIllegal: () => {
            return {
                code: 4,
                msg: '用户名或密码不能为空'
            }
        },
        UserNotExist: () => {
            return {
                code: 5,
                msg: '用户不存在'
            }
        }
    },
    artcle: {
        NoTitle: () => {
            return {
                code: 6,
                msg: '文章标题不能为空'
            }
        },
        TitleOverlength: () => {
            return {
                code: 7,
                msg: '文章标题过长，请删减'
            }
        },
        NoContent: () => {
            return {
                code: 8,
                msg: '文章内容不能为空'
            }
        },
        ContentOverlength: () => {
            return {
                code: 9,
                msg: '文章内容过长，请精简'
            }
        }
    },
    global: {
        error: () => {
            return {
                code: 99,
                msg: '系统异常，请稍后再试'
            }
        },
        JsonWebTokenError: () => {
            return {
                code:-1,
                msg:'登陆过期，请重新登录。'
            }
        },
        noLogin: () => {
            return {
                code: -2,
                msg:'用户没有登录，请登录'
            }
        },
        noPermission: () => {
            return {
                code: -99,
                msg:'没有权限访问！'
            }
        }

    }
}

module.exports = responseState