const Article = require("../model/article.model");
const { article,global } = require('../constant/responseState')

const articleMiddleware = {
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