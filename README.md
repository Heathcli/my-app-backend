# 接口文档

## 用户接口
        接口                    类型                是否必须            默认
    /user/register
        user_name               string              true
        password                string              true
        is_admin                string              false               0--不是管理员
    /user/login
        user_name               string              true
        password                string              true
    /user/mod-init
        无须字段，需携带token，检测是否管理员
    /user/mod
        
## 文章接口
    /article/list
    /article/add
    /article/upload