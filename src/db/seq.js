const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('my_blog', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
})

try {
    sequelize.authenticate();
    console.log('数据库连接成功');
} catch (error) {
    console.error('数据库连接失败', error);
}


module.exports = sequelize