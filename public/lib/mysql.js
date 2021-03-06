const mysql = require('mysql');
const config = require('../../config/default');

const users =
  `create table if not exists users(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 pass VARCHAR(40) NOT NULL,
 PRIMARY KEY ( id )
);`

let posts =
  `create table if not exists posts(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 title VARCHAR(40) NOT NULL,
 content  VARCHAR(500) NOT NULL,
 uid  VARCHAR(40) NOT NULL,
 moment  VARCHAR(40) NOT NULL,
 comments  VARCHAR(40) NOT NULL DEFAULT '0',
 pv  VARCHAR(40) NOT NULL DEFAULT '0',
 PRIMARY KEY ( id )
);`

// 建立数据库的连接池
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

// 创建函数query，通过返回promise的方式以便可以方便用.then()来获取数据库返回的数据
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) resolve(err);
      connection.query(sql, values, (err, rows) => {
        // 使用连接执行查询
        if (err) reject(err);
        resolve(rows);
        connection.release();
        //连接不再使用，返回到连接池
      })
    })
  })
}

// 建表方法
const createTable = (sql) => {
  return query(sql, []);
}

// 建表
createTable(users);
createTable(posts);

// 注册用户
const insertData = (value) => {
  let _sql = "insert into users(name,pass) values(?,?);"
  return query(_sql, value);
}

// 通过名字查找用户
const findDataByName = (name) => {
  const _sql = `
    SELECT * from users
      where name="${name}"
  `;
  return query(_sql);
}

// 发表文章
const insertPost = (content) => {
  console.log('content', content);
  let _sql = "insert into posts(name,title,content,uid,moment) values(?,?,?,?,?);"
  return query(_sql, content);
}

// 查找所有文章
const findAllPosts = () => {
  const _sql = "select * from posts";
  return query(_sql)
}

module.exports = {
  query,
  createTable,
  insertData,
  findDataByName,
  insertPost,
  findAllPosts,
}
