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