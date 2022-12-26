const Router = require('koa-router')
const { checkToken } = require('../middleware/global.middleware')
const { articleCheck } = require('../middleware/article.middleware')
const { articleList, addArticle ,upload } = require('../controller/article.controller')

const router = new Router({ prefix: '/article' })

router.post('/list', articleList)

router.post('/add',checkToken, articleCheck ,addArticle)

router.post('/upload',upload)

module.exports = router