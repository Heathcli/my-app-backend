const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const cors = require('koa2-cors')

const router = require('../router')
const globalMiddleware = require('../middleware/global.middleware')

const app = new Koa()

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(KoaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname,'../upload'),
        keepExtensions: true
    }
}))
app.use(globalMiddleware.catchError)
app.use(router.routes())


module.exports = app