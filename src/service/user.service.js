const User = require("../model/user.model")
const { login } = require('../constant/responseState')

class UserService {
    // 创建用户
    createUser = async (user_name, password, is_admin = 0) => {
        const res = await User.create({ user_name, password, is_admin })
        return res.dataValues
    }
    // 获取用户信息
    getUserInfo = async (user_name) => {
        const res = await User.findOne({ where: { user_name: user_name } })
        // 用户不存在
        if (!res) {
            return false
        }
        return res.dataValues
    }
    // 修改
    userMod = async ({ id, user_name, password }) => {
        const uadateCount = await User.update({ user_name, password }, { where: { id } })
        if (uadateCount[0] === 1) {
            return await this.getUserInfo(user_name)
        }
        return false
    }
}

module.exports = new UserService()