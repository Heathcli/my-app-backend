const Article = require("../model/article.model");
const { article,global } = require('../constant/responseState')

const articleMiddleware = {
    // 检查添加、修改文章时的参数
    articleCheck: async ( ctx, next ) => {
        const { title ,content } = ctx.request.body
        if(!title) {
            ctx.body = article.NoTitle()
            return
        } else if(title.length > 16) {
            ctx.body = article.TitleOverlength()
            return
        }
        if(!content) {
            ctx.body = article.NoContent()
            return 
        } else if (content.length > 5000) {
            ctx.body = article.ContentOverlength()
            return
        }
        await next()
    },
    // 检查修改、查找文章时的id参数
    articleIdCheck: async ( ctx, next ) => {
        const { id } = ctx.request.body
        if(!id) {
            ctx.body = global.MissParams()
            return
        }
        await next()
    }
}

module.exports = articleMiddleware