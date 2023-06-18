const express = require('express');

const Pool = require('pg').Pool;
const app = express();
const cors = require('cors');
const PORT = 3000

const pool = new Pool({
  user: "room_status_db_user",
  password: "E859GVjs389UEy5pSgUqh7Gg0n33RjKQ",
  host: "dpg-ce8n5a6n6mposnkvtqh0-a",
  port: 5432,
  database: "room_status_db"
});

app.use(cors())
app.use(express.json());

app.get("/", async(req, res) => {
  res.json("hello")
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










