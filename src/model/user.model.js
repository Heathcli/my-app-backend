const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password:{
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: false,
        comment: '密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'管理员'
    }
})
// User.sync({force:true})
module.exports = User