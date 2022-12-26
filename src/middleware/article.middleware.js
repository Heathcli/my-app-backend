const Article = require("../model/article.model");
const { artcle } = require('../constant/responseState')

const articleMiddleware = {
    articleCheck: async ( ctx, next ) => {
        const { title ,content } = ctx.request.body
        if(!title) {
            ctx.body = artcle.NoTitle()
            return
        } else if(title.length > 16) {
            ctx.body = artcle.TitleOverlength()
            return
        }
        if(!content) {
            ctx.body = artcle.NoContent()
            return 
        } else if (content.length > 5000) {
            ctx.body = artcle.ContentOverlength()
            return
        }
        await next()
    }
}

module.exports = articleMiddleware