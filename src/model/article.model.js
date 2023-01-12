const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Article = seq.define('article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        comment: '标题'
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        comment: '内容（html代码）'
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        comment: '作者id'
    },
    cover:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        comment: '封面图链接'
    },
    isOffline:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue:1, // 默认先进草稿箱
        comment: '已下线标示'
    },
    isDelete: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue:0,
        comment: '删除标示'
    }
})
// try{
//     Article.sync({force:true})
// } catch {
//     console.log(err);
// }
module.exports = Article