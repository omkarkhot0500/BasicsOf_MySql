import express, { json } from "express";
import mysql from "mysql";
import cors from "cors"

const app = express();

const db = mysql.createConnection({
  // This is to connect node to mysql
  host: "localhost",
  user: "root",
  password: "omkarkhot2004",
  database: "test",
});

// This middleware is used bec -- express will not allow to send data server 
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  // `/` home page for backend
  res.json("This is backend");
});


app.get("/books", (req, res) => {
  // get route to display the content of the table
  const q = "SELECT * FROM books"; // Query

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.post("/books", (req, res) => {     // When we run this path then we get the data from path
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [

    //                                       -- postman (  basicmysql )

    // "title form backend",            // Uncomment these line to pass value directly      ( directly press get and post it will work bec we are passing data from here )
    // "desc from backend",
    // "cover pic from backend",

    req.body.title,                    // This way is used to send data from route           ( cannot directly press get and post it will work bec here we need to pass data from raw as json in  {"title":"form req way backend","desc": "form req way backend","cover": "form req way backend"} )
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created");
  });
});


app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.listen(8800, () => {
  // Port to run backend
  console.log("Connected to backend at port 8800");
});
