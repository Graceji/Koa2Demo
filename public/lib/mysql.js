const mysql = require('mysql');
const config = require('../../config/default');

let users =
  `create table if not exists users(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 pass VARCHAR(40) NOT NULL,
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
let query = (sql, values) => {
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
let createtable = (sql) => {
  return query(sql, []);
}

// 建表
createTable(users);

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into users(name,pass) values(?,?);"
  return query( _sql, value );
}

module.exports = {
  query,
  createTable,
  insertData
}