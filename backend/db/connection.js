
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
})


client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

