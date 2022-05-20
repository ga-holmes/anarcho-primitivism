var mysql = require('mysql');

var con = mysql.createConnection({

    host: "IP",
    port: 3306,
    user: "UN",
    password: "PW",
    database: "DB",
    insecureAuth: true

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected")
    con.query("SELECT * FROM all_cells", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });

    id = 0;
    x = 100;
    y = 100;
    speed = 1;
    dir = Math.PI * 7 / 4;

    let body = { "levels": [7, 60, 0x116644, 5, 30, 0x551100, 2, 20, 0x11AA22, 3, 10, 0x334400, 3, 10, 0x330088] };

    //var sql = 'INSERT INTO all_cells (cell_id, x_pos, y_pos, speed, dir, body) VALUES (0, 1, 1, 2, 3.14, {})';


    let stmt = 'REPLACE all_cells (cell_id, x_pos, y_pos, speed, dir, body)  VALUES ?  ';
    let todos = [
        [id, x, y, speed, dir, '{ "levels": [7, 60, 1140292, 5, 30, 5574912, 2, 20, 835259, 3, 10, 14893, 3, 10, 1149343] }']
    ];

    //stmt = "DELETE FROM `all_cells` WHERE `cell_id` = 2";
    /*
        con.query(stmt, [todos], function(err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    */

});

console.log("done setup, begin simulation");

var myfunc = setInterval(function() {


    console.log('Hello World at ' + 69 + ' seconds');
    console.log("plus");

}, 2000);