const { success } = require("../constant/responseState")
const { getArticleList,createArticle } = require('../service/article.service')

class Article {

    articleList = async (ctx, next) => {
        await getArticleList().then((res) => {
            ctx.body = success({ articleList: res.articleList })
        })
    }
    addArticle = async (ctx, next) => {

        const { title ,content } = ctx.request.body
        const { user_name } = ctx.userInfo
        await createArticle({
            title,
            content,
            author:user_name
        }).then((res) => {
            ctx.body = success({ article: res })
        })
    }
    upload = async (ctx, next) => {
        const { file } = ctx.request.files
        if(file) {
            ctx.body = success({imgUrl:file})
        } else {
            ctx.body = error()
        }
    }

}

module.exports = new Article()