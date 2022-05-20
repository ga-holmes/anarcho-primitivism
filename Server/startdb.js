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
    con.query("DELETE FROM all_cells LIMIT 1000", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });

    id = 0;
    x = 100;
    y = 100;
    speed = 1;
    dir = Math.PI * 7 / 4;
    let body = { "levels": [7, 60, 1140292, 5, 30, 5574912, 2, 20, 835259, 3, 10, 14893, 3, 10, 1149343] };

    //var sql = 'INSERT INTO all_cells (cell_id, x_pos, y_pos, speed, dir, body) VALUES (0, 1, 1, 2, 3.14, {})';

    let stmt = 'REPLACE all_cells (cell_id, x_pos, y_pos, speed, dir, body)  VALUES ?  ';
    let todos = [
        [id, x, y, speed, dir, JSON.stringify(body)],
        [1, 300, 400, 3, 4.4, '{"levels": [4, 40, 250634, 3, 30, 956842, 5, 10, 1139546]}']
    ];

    con.query(stmt, [todos], function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

});