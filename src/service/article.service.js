const Article = require("../model/article.model")

class ArticleService {
    // 创建文章
    createArticle = async ({ title, content, author }) => {
        const res = await Article.create({ title, content, author })
        return res.dataValues
    }
    // 文章列表
    getArticleList = async () => {
        const res = await Article.findAll({ where: { isDelete: 0 } })
        if (!res) return false
        return res
    }
    // 文章详情
    getArticle = async ({ id }) => {
        const res = await Article.findOne({ where: { id,isDelete: 0 } })
        if (!res) return false
        return res.dataValues
    }
    // 修改文章
    modArticle = async ({ id, title, content }) => {
        const res = await Article.update({ title, content }, { where: { id, isDelete: 0 } })
        if (res[0] === 1) {
            return await this.getArticle({ id })
        }
        return false
    }
    offlineArticle = async({ id }) => {
        const res = await Article.update({ isDelete: 1 },{ where: { id } })
        if (res[0] === 1) {
            return true
        }
        return false
    }
    onlineArticle = async({ id }) => {
        const res = await Article.update({ isDelete: 0 },{ where: { id } })
        if (res[0] === 1) {
            return await this.getArticle({ id })
        }
        return false
    }
}

module.exports = new ArticleService()