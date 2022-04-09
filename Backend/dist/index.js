"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors = require('cors');
const app = (0, express_1.default)();
const port = 8000;
app.use(cors());
const pool = mysql_1.default.createPool({
    host: "IP",
    port: 3306,
    user: "UN",
    password: "PW",
    database: "DB",
    insecureAuth: true
});
app.get('/', (_req, res) => {
    pool.query('select * from anarcho_cell_colors', [], (error, results, _fields) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
app.get('/results', (_req, res) => {
    res.send("bruhhh");
});
//# sourceMappingURL=index.js.map