import mysql from 'mysql2/promise'

async function connect() {
  if (global.connetion && global.connection.state !== 'disconnected')
    return global.connection

  const connection = await mysql.createConnection('mysql://root:root@localhost:3306/ecommerce')
  console.log('db connected');
  return connection
}

async function createSession(data) {
  const conn = await connect();
  const sql = 'insert into session(ses_data) values ("?");'
  const values = [data]
  console.log(values);
  await conn.query(sql, values);
}

async function getSession(data) {
  const conn = await connect();
  const sql = conn.query('select ses_data from session where ses_customer = '+ data +';')
  return sql
}

export { connect, createSession, getSession }