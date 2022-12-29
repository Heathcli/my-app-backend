const path = require('path')
const { success, global, article } = require("../constant/responseState")
const { 
    getArticleList, 
    createArticle, 
    getArticle, 
    modArticle,
    offlineArticle,
    onlineArticle 
} = require('../service/article.service')

class Article {
    // 获取全部文章
    getArticleList = async (ctx, next) => {
        await getArticleList().then((res) => {
            const articleList = res.map(item => {
                let { isDelete, ...articleItem } = item.dataValues
                return articleItem
            })
            ctx.body = success({ articleList })
        })
    }
    // 添加文章
    addArticle = async (ctx, next) => {

        const { title, content } = ctx.request.body
        const { user_name } = ctx.userInfo
        await createArticle({
            title,
            content,
            author: user_name
        }).then((res) => {
            ctx.body = success({ article: res })
        })
    }
    // 上传图片
    upload = async (ctx, next) => {
        const { image } = ctx.request.files
        if (image) {
            ctx.body = success({ url: 'http://' + ctx.headers.host + '/uploads/' + image.newFilename })
        } else {
            ctx.body = global.error()
        }
    }
    // 修改初始化
    modInit = async (ctx, next) => {
        const { id } = ctx.request.body
        await getArticle({
            id
        }).then((res) => {
            if (!res) {
                ctx.body = article.NotFindArticle()
            } else {
                ctx.body = success({ article: res })
            }
        })
    }
    // 修改
    mod = async (ctx, next) => {
        const { id, title, content } = ctx.request.body
        await modArticle({
            id,
            title,
            content
        }).then((res) => {
            if (!res) {
                ctx.body = article.NotFindArticle()
            } else {
                ctx.body = success({ article: res })
            }
        })
    }
    // 删除（下线）文章
    offline = async (ctx, next) => {
        const { id } = ctx.request.body
        await offlineArticle({
            id
        }).then((res) => {
            if (!res) {
                ctx.body = article.NotFindArticle()
            } else {
                ctx.body = success()
            }
        })
    }
    // 上线文章
    online = async (ctx, next) => {
        const { id } = ctx.request.body
        await onlineArticle({
            id
        }).then((res) => {
            if (!res) {
                ctx.body = article.NotFindArticle()
            } else {
                ctx.body = success()
            }
        })
    }
}

module.exports = new Article()