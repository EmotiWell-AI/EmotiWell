const Pool = require('pg').Pool;


// const pool = new Pool({
//   user: "postgres",
//   password: "",
//   host: "localhost",
//   port: 5432,
//   database: "emotiwell"
// });

const pool = new Pool({
  user: "queryinfomation_user",
  password: "h2lIzk6bksDhUdRv3jE9L0o7nIPMctYn",
  host: "dpg-ci7823p8g3n3vm5u8s50-a",
  port: 5432,
  database: "queryinfomation"
});


module.exports = pool;



