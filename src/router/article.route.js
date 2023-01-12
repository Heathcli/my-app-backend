const Router = require('koa-router')
const { checkToken,catchPramasError } = require('../middleware/global.middleware')
const { 
    articleCheck, 
    articleIdCheck
 } = require('../middleware/article.middleware')
const { 
    getArticleList, 
    addArticle, 
    upload, 
    modInit, 
    mod, 
    offline, 
    online,
    delArticle,
    recoverArticle
} = require('../controller/article.controller')

const router = new Router({ prefix: '/article' })
// 文章列表
router.post('/list', getArticleList)
// 添加文章
router.post('/add', checkToken, articleCheck, addArticle)
// 文章上传图片、上传封面
router.post('/upload', checkToken, upload)
// 修改回填
router.post('/mod-init', checkToken, articleIdCheck, catchPramasError, modInit)
// 修改文章
router.post('/mod', checkToken, articleCheck, articleIdCheck, catchPramasError, mod)
// 下线文章
router.post('/offline', checkToken, articleIdCheck, catchPramasError, offline)
// 发布文章
router.post('/online', checkToken, articleIdCheck, catchPramasError, online)
// 删除文章
router.post('/delete', checkToken, articleIdCheck, catchPramasError, delArticle)
// 恢复文章
router.post('/recovery', checkToken, articleIdCheck, catchPramasError, recoverArticle)

module.exports = router