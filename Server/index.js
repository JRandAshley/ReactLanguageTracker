const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'langdb'
})

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencode({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM phonemes;"
    db.query(sqlSelect, (err, result) => {
    res.send(result);
    });
});

app.post("/api/getSpecific", (req, res) => {
    const id = req.body.id;
    const sqlSelect = "SELECT * FROM phonemes WHERE id = ?;"
    db.query(sqlSelect, id, (err, result) => {
        console.log(result)
    res.send(result);
    });
});

app.post("/api/delete", (req, res) => {
    const symbol = req.body.symbol;
    const sqlDelete = "DELETE FROM phonemes WHERE symbol = ?;"
    db.query(sqlDelete, symbol, (err, result) => {
        console.log(result)
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => {
    const symbol = req.body.symbol
    const easyType = req.body.easyType
    const type = req.body.type
    const notes = req.body.notes
    const sol = req.body.sol
    const poa = req.body.poa
    const moa = req.body.moa
    const height = req.body.height
    const backness = req.body.backness
    const rounding = req.body.rounding

    console.log(symbol)
    console.log(rounding)

    const sqlInsert = "INSERT INTO phonemes (symbol, easyType, type, notes, sol, poa, moa, height, backness, rounding) VALUES (?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [symbol, easyType, type, notes, sol, poa, moa, height, backness, rounding], (err, result) => {
    console.log(result)
    })
});

app.listen(3001, () => {
    console.log("running on port 3001")
});