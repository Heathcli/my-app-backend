const Article = require("../model/article.model")

class ArticleService {
    // 创建文章
    createArticle = async (content) => {
        const res = await Article.create(content)
        return res.dataValues
    }
    // 文章列表
    getArticleList = async () => {
        const res = await Article.findAll({ where: { isDelete: 0, isOffline: 0 } })
        if (!res) return false
        return res
    }
    // 文章详情
    getArticle = async ({ id }) => {
        const res = await Article.findOne({ where: { id, isDelete: 0, isOffline: 0 } })
        if (!res) return false
        return res.dataValues
    }
    // 修改文章
    modArticle = async ({ id, title, content }) => {
        const res = await Article.update({ title, content }, { where: { id } })
        if (res[0] === 1) {
            return await this.getArticle({ id })
        }
        return false
    }
    offlineArticle = async ({ id }) => {
        const res = await Article.update({ isOffline: 1 }, { where: { id, isDelete: 0 } })
        if (res[0] === 1) {
            return true
        }
        return false
    }
    onlineArticle = async ({ id }) => {
        const res = await Article.update({ isOffline: 0 }, { where: { id, isDelete: 0 } })
        if (res[0] === 1) {
            return await this.getArticle({ id })
        }
        return false
    }
    deleteArticle = async ({ id }) => {
        const res = await Article.update({ isDelete: 1, isOffline: 1 }, { where: { id } })
        if (res[0] === 1) {
            return await this.getArticle({ id })
        }
        return false
    }
    recoveryArticle = async ({ id }) => {
        const res = await Article.update({ isDelete: 0 }, { where: { id } })
        if (res[0] === 1) {
            return await this.getArticle({ id })
        }
        return false
    }
}

module.exports = new ArticleService()