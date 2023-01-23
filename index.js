const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;
const mysql= require("mysql2");

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "alessio",
    database: "dbprova"
});

//fine inizializzazione
app.get('/utenti', (req,res)=>{
     db.query("SELECT * FROM utenti", (err, rows) => {
                if(err){
                    res.send('Query error: ' + err.sqlMessage);
                }else{
                    let arr={"result":""}
                    arr.result=rows
                    console.log(JSON.stringify(arr))
                    res.send(JSON.stringify(arr));
                }
            });
        }
);

app.listen(PORT, function() {
    console.log("Il server è in esecuzione sulla porta: " + PORT);
});

//evita che node si chiuda su un errore
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});