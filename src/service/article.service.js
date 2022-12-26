const Article = require("../model/article.model")

class ArticleService {
    // 创建文章
    createArticle = async ({ title, content, author }) => {
        const res = await Article.create({ title, content, author })
        return res.dataValues
    }
    // 文章列表
    getArticleList = async() => {
        const res = await Article.findAll()
        return res.dataValues
    }
}

module.exports = new ArticleService()