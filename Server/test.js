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
});

//get data from db then add to cell class

console.log("done setup, begin simulation");
//canvas
let height = 1000;
let wifth = 1000;

let st = Date.now();
let end = false;
let time;
let updateDb = 0;

var myfunc = setInterval(function() {

    console.log('Hello World at ' + 69 + ' seconds');
    console.log("plus");

    time = Date.now();
    console.log("fps: ", 1000 / (time - st));
    st = time;
    if (end) {
        clearInterval(myfunc);
    }
    
    for(let i=0; i<length(cells); i++) {
        cells[i].update();
    }

    updateDb++;  
    if (updateDb >=100) {
        updateDb = 0;
        //update value for position in dbch
        //delete everything
        con.query("DELETE FROM all_cells LIMIT 10000", function(err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

        let stmt = 'REPLACE all_cells (cell_id, x_pos, y_pos, speed, dir, body)  VALUES ?  ';
        let todos = [];

        for(let i=0; i<length(cells); i++) {
            todos.push(cells.get_dbval());
        }

        con.query(stmt, [todos], function(err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
            
    }

}, 2000); //for 20 fps use 40ms delay




class cell {
    constructor(id, x_pos, y_pos, speed, dir, body) {
        this.id = id;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.speed = speed;
        this.dir = dir;
        this.body = body;
    }

    check_border() {
        let hitbox = 1;
        //check x wall
        if (this.x_pos - hitbox < 0 || this.x_pos + hitbox > width) {
            //bounce
            this.dir = 2 * Math.PI - this.dir;
        }
        //check y wall
        if (this.y_pos - hitbox < 0 || this.y_pos + hitbox > height) {
            //bounce
            this.dir = 2 * Math.PI - this.dir;
        }
    }

    update() {
        this.x_pos += this.speed * Math.cos(this.dir);
        this.y_pos += this.speed * Math.sin(this.dir);
        this.check_border;
    }

    get_dbval() {
        //[id, x, y, speed, dir, JSON.stringify(body)]
        return([this.id, this.x_pos, this.y_pos, this.speed, this.dir, JSON.stringify(this.body)]);
    }



}