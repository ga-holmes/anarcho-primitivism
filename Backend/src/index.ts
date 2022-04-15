import express from 'express';
import mysql from 'mysql';

const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());

const pool = mysql.createPool({
	
	host:"IP",
	port:3306,
	user:"UN",
	password:"PW",
	database:"DB",
	insecureAuth: true
	
});


app.get('/', (_req, res) => {
	pool.query('select * from all_cells', [], (error, results, _fields) => {
		if(error){
			res.status(500).send(error);
			return;
		}
		res.send(results);
	});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/results', (_req, res) => {
    res.send("bruhhh");
})